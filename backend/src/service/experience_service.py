from typing import List
from uuid import UUID
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from src.model.experience import Experience
from src.repository.experience_repository import ExperienceRepository
from src.schema.experience_schemas import CreateExperienceRequest, ExperienceResponse, UpdateExperienceRequest

class ExperienceService:
    def __init__(self):
        self.repo = ExperienceRepository()

    def create(self, db: Session, request: CreateExperienceRequest) -> ExperienceResponse:
        entry = Experience(**request.model_dump())
        return self.repo.create(db, entry)

    def get_all(self, db: Session) -> List[ExperienceResponse]:
        return self.repo.get_all(db)

    def get_one(self, db: Session, experience_id: UUID) -> ExperienceResponse:
        entry = self.repo.get_one(db, experience_id)
        if not entry:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Experience with id {experience_id} not found"
            )
        return entry

    def update(self, db: Session, experience_id: UUID, request: UpdateExperienceRequest) -> ExperienceResponse:
        entry = self.repo.get_one(db, experience_id)
        if not entry:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Experience with id {experience_id} not found"
            )
        return self.repo.update(db, entry, request)

    def delete(self, db: Session, experience_id: UUID) -> None:
        entry = self.repo.get_one(db, experience_id)
        if not entry:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Experience with id {experience_id} not found"
            )
        self.repo.delete(db, entry)
