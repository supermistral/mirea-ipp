from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class ProductBase(BaseModel):
    text: str
    quantity: int = Field(1, gt=0)
    completed: bool


class ProductCreate(ProductBase):
    quantity: Optional[int] = Field(1, gt=0)
    completed: Optional[bool]


class ProductUpdate(ProductBase):
    created_date: datetime


class ProductInDBBase(ProductBase):
    id: int
    created_date: datetime


class Product(ProductInDBBase):
    pass
