from uuid import UUID
from pydantic import BaseModel, EmailStr

class EnrollInMailingListRequest(BaseModel):
    email: EmailStr

class UnenrollInMailingListRequest(BaseModel):
    enroll_id: UUID
    email: EmailStr