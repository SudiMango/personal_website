from uuid import UUID
from sqlalchemy.orm import Session
from typing import List, Optional
from src.repository.crud_repository import CrudRepository
from src.model.role import Role
from src.schema.role_schemas import RoleResponse, UpdateRoleRequest

class RoleRepository(CrudRepository[Role, UpdateRoleRequest]):
    def __init__(self):
        super().__init__(Role)