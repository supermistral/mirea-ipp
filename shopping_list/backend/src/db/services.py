from typing import Any, List, Optional

from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession

from .session import get_session
from .models import Product
from .schemas import ProductCreate, ProductUpdate


class ProductService:
    def __init__(self, db_session: AsyncSession):
        self.db_session = db_session

    async def get(self, id: Any) -> Optional[Product]:
        result = await self.db_session.execute(
            select(Product).where(Product.id == id)
        )
        return result.scalar()

    async def list(self) -> List[Product]:
        result = await self.db_session.execute(
            select(Product).order_by(Product.created_date.desc())
        )
        return result.scalars().all()

    async def create(self, create_schema: ProductCreate) -> Product:
        product = Product(**create_schema.dict(exclude_unset=True))

        self.db_session.add(product)
        await self.db_session.commit()

        return product

    async def update(self, id: Any, update_schema: ProductUpdate) -> Optional[Product]:
        product = await self.get(id)

        if product is None:
            return None

        for key, value in update_schema.dict().items():
            setattr(product, key, value)

        await self.db_session.commit()

        return product

    async def delete(self, id: Any) -> int:
        result = await self.db_session.execute(
            delete(Product).where(Product.id == id)
        )
        await self.db_session.commit()

        return result


async def get_product_service() -> ProductService:
    async with get_session() as session:
        return ProductService(session)
