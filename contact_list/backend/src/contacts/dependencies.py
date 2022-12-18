from typing import AsyncGenerator

from src.db.session import get_session
from .models import Contact
from .services import ContactService


async def get_contact_service() -> AsyncGenerator[ContactService, None]:
    async with get_session() as session:
        yield ContactService(session, Contact)
