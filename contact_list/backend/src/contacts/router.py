from typing import Any

from fastapi import APIRouter, Depends, HTTPException

from .services import ContactService
from .dependencies import get_contact_service
from .schemas import Contact, ContactCreate, ContactUpdate


router = APIRouter()


@router.get('/', response_model=list[Contact])
async def read_contacts(
    service: ContactService = Depends(get_contact_service),
    offset: int = 0,
    limit: int = 100
) -> Any:
    result = await service.list(offset=offset, limit=limit)
    return result


@router.post('/', response_model=Contact, status_code=201)
async def update_contact(
    contact_create: ContactCreate,
    service: ContactService = Depends(get_contact_service)
) -> Any:
    return await service.create(contact_create)


@router.get('/{id}', response_model=Contact)
async def read_contact(
    id: int,
    service: ContactService = Depends(get_contact_service)
) -> Any:
    item = await service.get(id)
    if item is None:
        raise HTTPException(status_code=404, detail="Contact not found")
    return item


@router.put('/{id}', response_model=Contact)
async def update_contact(
    id: int,
    contact_in: ContactUpdate,
    service: ContactService = Depends(get_contact_service)
) -> Any:
    item = await service.update(id, contact_in)
    if item is None:
        raise HTTPException(status_code=404, detail="Contact not found")
    return item


@router.delete('/{id}', status_code=204)
async def delete_contact(
    id: int,
    service: ContactService = Depends(get_contact_service)
) -> None:
    await service.delete(id)
