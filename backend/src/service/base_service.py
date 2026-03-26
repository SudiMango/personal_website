from uuid import UUID
from uuid import UUID
from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.repository.crud_repository import CrudRepository

class BaseService:
    def get_or_404(self, db: Session, repo: CrudRepository, id: UUID, entity_name: str):
        obj = repo.get_one(db, id)
        if not obj:
            raise HTTPException(status_code=404, detail=f"{entity_name} not found")
        return obj