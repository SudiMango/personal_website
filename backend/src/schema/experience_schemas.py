from uuid import UUID
from pydantic import BaseModel
from typing import List, Optional
from src.schema.role_schemas import RoleResponse

class ExperienceBase(BaseModel):
    company: str

"""
Request
"""

class CreateExperienceRequest(ExperienceBase):
    pass

class UpdateExperienceRequest(BaseModel):
    company: Optional[str] = None

"""
Response
"""

class ExperienceResponse(ExperienceBase):
    experience_id: UUID
    roles: List[RoleResponse]

    class Config:
        from_attributes = True