from datetime import date
from typing import Optional

from pydantic import BaseModel


class ContactBase(BaseModel):
    name: Optional[str] = None
    birthday: Optional[date] = None
    phone: Optional[str] = None
    company: Optional[str] = None
    address: Optional[str] = None


class ContactCreate(ContactBase):
    name: str
    phone: str


class ContactUpdate(ContactBase):
    pass


class ContactInDBBase(ContactBase):
    id: int
    name: str
    phone: str

    class Config:
        orm_mode = True


class Contact(ContactInDBBase):
    pass
