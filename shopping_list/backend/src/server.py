import asyncio
from concurrent.futures import ThreadPoolExecutor

import grpc

from grpc_classes import products_pb2, products_pb2_grpc
from db import get_product_service, ProductCreateSchema, ProductUpdateSchema
from utils import product_list_to_protobuf, protobuf_to_dict, product_to_protobuf


class ProductListService(products_pb2_grpc.ProductListServiceServicer):
    async def GetAll(self, request, context):
        response = products_pb2.ProductList()
        service = await get_product_service()
        product_list = await service.list()
        response.products.extend(product_list_to_protobuf(product_list))
        return response

    async def Get(self, request, context):
        service = await get_product_service()
        product = await service.get(request.id)

        if product is None:
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details('Product not found')
            return products_pb2.ProductList()

        response = product_to_protobuf(product)
        return response

    async def Add(self, request, context):
        service = await get_product_service()
        request_dict = protobuf_to_dict(request)
        product = await service.create(ProductCreateSchema(**request_dict))
        response = product_to_protobuf(product)
        return response

    async def Update(self, request, context):
        service = await get_product_service()
        request_dict = protobuf_to_dict(request)
        request_dict['completed'] = request.completed
        product = await service.update(request.id, ProductUpdateSchema(**request_dict))

        if product is None:
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details('Product not found')
            return products_pb2.Product()

        response = product_to_protobuf(product)
        return response

    async def Delete(self, request, context):
        service = await get_product_service()
        
        count = await service.delete(request.id)

        if count == 0:
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details('Product not found')
            return products_pb2.Empty()

        return products_pb2.Empty()


async def serve():
    server = grpc.aio.server(ThreadPoolExecutor(max_workers=4))

    products_pb2_grpc.add_ProductListServiceServicer_to_server(ProductListService(), server)

    server.add_insecure_port('[::]:50051')
    await server.start()
    await server.wait_for_termination()


if __name__ == '__main__':
    asyncio.run(serve())
