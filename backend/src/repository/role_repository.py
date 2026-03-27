from src.repository.crud_repository import CrudRepository
from src.model.role import Role
from src.schema.role_schemas import UpdateRoleRequest

class RoleRepository(CrudRepository[Role, UpdateRoleRequest]):
    def __init__(self):
        super().__init__(Role)