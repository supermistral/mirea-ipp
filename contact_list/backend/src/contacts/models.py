from datetime import date

import sqlalchemy as sa

from src.db.base import Base


class Contact(Base):
    __tablename__ = 'contacts'

    id: int = sa.Column(sa.Integer, primary_key=True, index=True)
    name: str = sa.Column(sa.String(127), nullable=False)
    birthday: date = sa.Column(sa.Date)
    phone: str = sa.Column(sa.String(15), nullable=False)
    company: str = sa.Column(sa.String(127))
    address: str = sa.Column(sa.String(255))
