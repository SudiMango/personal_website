from typing import List
from uuid import UUID
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from src.model.role import Role
from src.repository.experience_repository import ExperienceRepository
from src.repository.role_repository import RoleRepository
from src.schema.role_schemas import CreateRoleRequest, RoleResponse, UpdateRoleRequest

class RoleService:
    def __init__(self):
        self.repo = RoleRepository()
        self.experience_repo = ExperienceRepository()

    def create(self, db: Session, experience_id: UUID, request: CreateRoleRequest) -> RoleResponse:
        experience = self.experience_repo.get_one(db, experience_id)
        if not experience:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Experience with id {experience_id} not found"
            )
        
        entry = Role(**request.model_dump(), experience_id=experience_id)
        return self.repo.create(db, entry)

    def get_all(self, db: Session, experience_id: UUID) -> List[RoleResponse]:
        experience = self.experience_repo.get_one(db, experience_id)
        if not experience:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Experience with id {experience_id} not found"
            )
        return self.repo.get_all(db, experience_id)

    def get_one(self, db: Session, role_id: UUID) -> RoleResponse:
        entry = self.repo.get_one(db, role_id)
        if not entry:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Role with id {role_id} not found"
            )
        return entry

    def update(self, db: Session, role_id: UUID, request: UpdateRoleRequest) -> RoleResponse:
        entry = self.repo.get_one(db, role_id)
        if not entry:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Role with id {role_id} not found"
            )
        return self.repo.update(db, entry, request)

    def delete(self, db: Session, role_id: UUID) -> None:
        entry = self.repo.get_one(db, role_id)
        if not entry:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Role with id {role_id} not found"
            )
        self.repo.delete(db, entry)
