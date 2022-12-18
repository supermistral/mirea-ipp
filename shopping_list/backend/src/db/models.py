from datetime import datetime

import sqlalchemy as sa
from sqlalchemy.orm import validates

from .base import Base


class Product(Base):
    __tablename__ = 'products'

    id: int = sa.Column(sa.Integer, primary_key=True, index=True)
    text: str = sa.Column(sa.String(127), nullable=False)
    quantity: int = sa.Column(sa.Integer, default=1, nullable=False)
    created_date = sa.Column(sa.DateTime(timezone=True), default=datetime.now, nullable=False)
    completed: bool = sa.Column(sa.Boolean, default=False, nullable=False)

    @validates('quantity')
    def validate_quantity(self, key: str, value: int) -> int:
        if value < 0:
            raise ValueError("Quantity must be a positive number")
        return value
