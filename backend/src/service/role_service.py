from typing import List
from uuid import UUID
from sqlalchemy.orm import Session
from src.model.role import Role
from src.repository.experience_repository import ExperienceRepository
from src.repository.role_repository import RoleRepository
from src.schema.role_schemas import CreateRoleRequest, RoleResponse, UpdateRoleRequest
from .base_service import BaseService

class RoleService(BaseService):
    def __init__(self):
        self.repo = RoleRepository()
        self.experience_repo = ExperienceRepository()

    def create(self, db: Session, experience_id: UUID, request: CreateRoleRequest) -> RoleResponse:
        self.get_or_404(db, self.experience_repo, experience_id, "Experience")
        
        entry = Role(**request.model_dump(), experience_id=experience_id)
        return self.repo.create(db, entry)

    def get_all(self, db: Session, experience_id: UUID) -> List[RoleResponse]:
        self.get_or_404(db, self.experience_repo, experience_id, "Experience")
        return self.repo.get_all(db, experience_id)

    def get_one(self, db: Session, role_id: UUID) -> RoleResponse:
        return self.get_or_404(db, self.repo, role_id, "Role")

    def update(self, db: Session, role_id: UUID, request: UpdateRoleRequest) -> RoleResponse:
        entry = self.get_or_404(db, self.repo, role_id, "Role")
        return self.repo.update(db, entry, request)

    def delete(self, db: Session, role_id: UUID) -> None:
        entry = self.get_or_404(db, self.repo, role_id, "Role")
        self.repo.delete(db, entry)