from src.services import CRUDBase
from .models import Contact
from .schemas import ContactCreate, ContactUpdate


class ContactService(CRUDBase[Contact, ContactCreate, ContactUpdate]):
    pass
