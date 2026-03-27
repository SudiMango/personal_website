from uuid import UUID
from typing import List
from src.repository.crud_repository import CrudRepository
from src.model.role import Role
from src.schema.role_schemas import UpdateRoleRequest
from sqlalchemy.orm import Session

class RoleRepository(CrudRepository[Role, UpdateRoleRequest]):
    def __init__(self):
        super().__init__(Role)

    def get_all(self, db: Session, experience_id: UUID) -> List[Role]:
        return db.query(self.model).filter(self.model.experience_id == experience_id).order_by(self.model.sort_order.asc()).all()