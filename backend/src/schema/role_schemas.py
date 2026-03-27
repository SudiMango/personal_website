from uuid import UUID
from pydantic import BaseModel
from typing import List, Optional

class RoleBase(BaseModel):
    role_title: str
    date_range: str
    description: str
    sort_order: int = 0
    tags: List[str] = []

"""
Request
"""

class CreateRoleRequest(RoleBase):
    pass

class UpdateRoleRequest(BaseModel):
    role_title: Optional[str] = None
    date_range: Optional[str] = None
    description: Optional[str] = None
    sort_order: Optional[int] = None
    tags: List[str] = []

"""
Response
"""

class RoleResponse(RoleBase):
    role_id: UUID
    experience_id: UUID

    class Config:
        from_attributes = True