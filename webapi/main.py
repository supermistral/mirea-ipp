import zipfile, io, tarfile, sys, re, platform, asyncio, aiohttp

from typing import Optional, Dict, List
from aiohttp import StreamReader


class Parser:
    """Base class representing parser algorithms"""

    def __init__(self):
        self.archive_supported = {'whl': ('.whl', Parser.handle_whl, self.parse_whl),
                                  'gzip': ('.tar.gz', Parser.handle_gzip, self.parse_gzip_zip),
                                  'zip': ('.zip', Parser.handle_zip, self.parse_gzip_zip)}
        self.package_extra  = {'sys_platform': sys.platform,
                              'python_version': sys.version,
                              'platform_python_implementation': platform.python_implementation()}
        self.base_api_url   = "https://pypi.org/pypi/{}/json"
        self.requirements   = {}    # result
        self.user_extra     = []    # extra packages: <package>[<extra>]

        self._session = None

    async def run(self, package: str) -> None:
        self._session = aiohttp.ClientSession()

        try:
            await self.parse_archive(self.parse_user_package(package))
        except Exception as e:
            print("[ERROR] ", e)

        await self._session.close()
        self._session = None

    async def get_json(self, package: str) -> Optional[Dict[str, str]]:
        async with self._session.get(self.base_api_url.format(package)) as response:
            json = await response.json()
            return json

    def parse_user_package(self, package_str: str) -> str:
        if '[' in package_str and ']' in package_str:
            package, extra = package_str.split('[')
            self.user_extra = [e for e in extra.rstrip(']').split(',')]
        else:
            package = package_str
        
        return package

    def parse_requires_archive(self, content: StreamReader, mode: str = "whl") -> Optional[List[str]]:
        target_content = self.archive_supported[mode][1](content)

        if target_content is None:
            return None

        requires = self.archive_supported[mode][2](target_content)
        return requires

    async def get_requires_by_url(self, url: str, mode: str = "whl") -> Optional[List[str]]:
        print("[Download] " + url)

        async with self._session.get(url) as response:
            content = await response.content.read()

            if response.ok:
                return self.parse_requires_archive(content, mode)

            return None

    async def parse_archive(self, current_package: str) -> None:
        json = await self.get_json(current_package)

        if json is None:
            return

        print("\n[Parsing] " + current_package)

        url_list        = json['urls'][::-1]
        url_whl_list    = list(filter(
                            lambda x: x["url"].endswith(self.archive_supported['whl'][0]), 
                            url_list))
        requires        = None

        # Парсинг единственного whl 
        if len(url_whl_list) == 1:
            requires = await self.get_requires_by_url(url_whl_list[0]["url"], 'whl')

        # whl не один или парсинг whl не дал результата - попытка в gzip (или zip)
        if requires is None:
            for url_data in url_list:
                archive_url = url_data["url"]
                if archive_url.endswith(self.archive_supported['gzip'][0]):
                    requires = await self.get_requires_by_url(archive_url, 'gzip')
                    break
                elif archive_url.endswith(self.archive_supported['zip'][0]):
                    requires = await self.get_requires_by_url(archive_url, 'zip')
                    break

        # gzip/zip не дали результатов - попытка в какой-нибудь whl 
        if requires is None:
            for url in url_whl_list:
                requires = await self.get_requires_by_url(url['url'], 'whl')
                if requires is not None:
                    break

        # Ничего не найдено
        if requires is None:
            raise ValueError("Archive not found")

        self.requirements[current_package] = requires

        for req_package in requires:
            try:
                await self.parse_archive(req_package)
            except Exception as e:
                print("[ERROR] ", e)

    @staticmethod
    def handle_gzip(content: StreamReader) -> Optional[str]:
        with tarfile.open(fileobj=io.BytesIO(content), mode="r:gz") as tar:
            for member in tar.getmembers():
                if member.name.endswith('requires.txt'):
                    f = tar.extractfile(member)
                    if f is not None:
                        print("[Requires.txt] Found -> " + member.name)
                        return str(f.read(), 'utf-8')
        return None

    @staticmethod
    def handle_zip(content: StreamReader) -> Optional[str]:
        z = zipfile.ZipFile(io.BytesIO(content))
        for zip_name in z.namelist():
            if zip_name.endswith('requires.txt'):
                print("[Requires.txt] Found -> " + zip_name)
                return str(z.read(zip_name), 'utf-8')
        return None

    @staticmethod
    def handle_whl(content: StreamReader) -> Optional[str]:
        z = zipfile.ZipFile(io.BytesIO(content))
        for zip_name in z.namelist():
            if zip_name.endswith("METADATA"):
                print("[Metadata] Found -> " + zip_name)
                return str(z.read(zip_name), 'utf-8')
        return None

    def parse_gzip_zip(self, content: str) -> List[str]:
        res_full_requires = []
        cond_result = True

        for req_row in content.split("\n"):
            if req_row:
                if req_row.startswith("[") and req_row.endswith("]"):
                    args = req_row.lstrip("[").rstrip("]").split(":")
                    key, cond = args if len(args) == 2 else [args, '']

                    if cond:
                        context = {'cond_result': cond_result, **self.package_extra}
                        exec("cond_result=" + cond, None, context)
                        cond_result = context['cond_result'] and key in self.user_extra \
                                        if (key and self.user_extra) \
                                        else context['cond_result']
                    else:
                        cond_result = key in self.user_extra if self.user_extra else False
                elif cond_result:
                    res_full_requires.append(req_row)

        res_requires = [re.match(r'[\w|-]+', req).group(0) for req in res_full_requires]
        return res_requires

    def parse_whl(self, content: str) -> List[str]:
        res_requires = []

        req_pattern = r"Requires-Dist\:\s*(\S+)(.+;\s*(\S.+))?"
        matches = re.findall(req_pattern, content)

        for match in matches:
            key, cond = match[0], match[2] if len(match) == 3 else [match[0], '']
            cond_result = True

            # 'cond' contains string representing bool expression, i.e. extra == 'dev'
            if cond:
                cond_result = False
                context = {'cond_result': cond_result, 'extra': '', **self.package_extra}
                if self.user_extra:
                    for extra in self.user_extra:
                        context['extra'] = extra
                        exec("cond_result=" + cond, None, context)
                        if context['cond_result']:
                            break
                else:
                    exec("cond_result=" + cond, None, context)

                cond_result = context['cond_result']

            if cond_result:
                res_requires.append(key)

        return res_requires

    def get_graphviz_code(self) -> str:
        code = ""

        for req_key in self.requirements:
            for package in self.requirements[req_key]:
                code += f'"{req_key}" -> "{package}"\n'

        return "digraph G {\n" + code + "}"


if  __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Package name expected. Type 'python <module name> <package name>'")
        exit()

    parser = Parser()
    package = sys.argv[1]

    asyncio.run(parser.run(package))

    print("\n\n", parser.get_graphviz_code())
