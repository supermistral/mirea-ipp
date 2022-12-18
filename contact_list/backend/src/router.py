from fastapi import APIRouter

from .contacts.router import router as contacts_router


api_router = APIRouter()

api_router.include_router(contacts_router, prefix='/contacts', tags=['contacts'])
