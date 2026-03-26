import os
from fastapi import Header, HTTPException, status
from typing import Optional

ADMIN_TOKEN = os.getenv("ADMIN_TOKEN")

def verify_admin(authorization: Optional[str] = Header(None)):
    if not ADMIN_TOKEN:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Server is not properly configured for admin access."
        )

    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or malformed Authorization header."
        )

    token = authorization.split(" ")[1]
    if token != ADMIN_TOKEN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid admin token."
        )

    return True
