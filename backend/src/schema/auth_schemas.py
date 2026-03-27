from pydantic import BaseModel

"""
Request
"""

class LoginRequest(BaseModel):
    username: str
    password: str