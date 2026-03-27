from typing import List
from uuid import UUID
from sqlalchemy.orm import Session
from src.model.experience import Experience
from src.repository.experience_repository import ExperienceRepository
from src.schema.experience_schemas import CreateExperienceRequest, ExperienceResponse, UpdateExperienceRequest
from .base_service import BaseService

class ExperienceService(BaseService):
    def __init__(self):
        self.repo = ExperienceRepository()

    def create(self, db: Session, request: CreateExperienceRequest) -> ExperienceResponse:
        entry = Experience(**request.model_dump())
        return self.repo.create(db, entry)

    def get_all(self, db: Session) -> List[ExperienceResponse]:
        return self.repo.get_all(db)

    def get_one(self, db: Session, experience_id: UUID) -> ExperienceResponse:
        return self.get_or_404(db, self.repo, experience_id, "Experience")

    def update(self, db: Session, experience_id: UUID, request: UpdateExperienceRequest) -> ExperienceResponse:
        entry = self.get_or_404(db, self.repo, experience_id, "Experience")
        return self.repo.update(db, entry, request)

    def delete(self, db: Session, experience_id: UUID) -> None:
        entry = self.get_or_404(db, self.repo, experience_id, "Experience")
        self.repo.delete(db, entry)