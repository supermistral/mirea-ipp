from typing import Any, Generic, Optional, Type, TypeVar

from pydantic import BaseModel
from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession

from src.db.base import Base


ModelType = TypeVar("ModelType", bound=Base)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


class CRUDBase(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    def __init__(self, db: AsyncSession, model: Type[ModelType]):
        self.db = db
        self.model = model

    async def get(self, id: Any) -> Optional[ModelType]:
        result = await self.db.execute(
            select(self.model).filter(self.model.id == id)
        )
        return result.scalar()
    
    async def list(self, offset: int = 0, limit: int = 100) -> list[ModelType]:
        result = await self.db.execute(
            select(self.model).offset(offset).limit(limit)
        )
        return result.scalars().all()

    async def create(self, create_schema: CreateSchemaType) -> ModelType:
        model = self.model(**create_schema.dict(exclude_unset=True))
        
        self.db.add(model)
        await self.db.commit()

        return model

    async def update(self, id: Any, update_schema: UpdateSchemaType) -> Optional[ModelType]:
        model = await self.get(id)

        if model is None:
            return None

        for k, v in update_schema.dict(exclude_unset=True).items():
            setattr(model, k, v)
        
        await self.db.commit()

        return model

    async def delete(self, id: Any) -> ModelType:
        await self.db.execute(
            delete(self.model).where(self.model.id == id)
        )
        await self.db.commit()
