from uuid import UUID
from sqlalchemy.orm import Session
from typing import List, Optional
from src.model.role import Role
from src.schema.role_schemas import RoleResponse, UpdateRoleRequest

class RoleRepository:
    def create(self, db: Session, entry: Role) -> RoleResponse:
        db.add(entry)
        db.commit()
        db.refresh(entry)
        return entry
    
    def get_all(self, db: Session, experience_id: UUID) -> List[RoleResponse]:
        return db.query(Role).filter(Role.experience_id == experience_id).all()

    def get_one(self, db: Session, role_id: UUID) -> Optional[RoleResponse]:
        return db.query(Role).filter(Role.role_id == role_id).first()

    def update(self, db: Session, role: Role, request: UpdateRoleRequest) -> RoleResponse:
        update_data = request.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(role, key, value)

        db.commit()
        db.refresh(role)
        return role

    def delete(self, db: Session, entry: Role) -> None:
        db.delete(entry)
        db.commit()