import os
import hashlib
import hmac
import time
from fastapi import Request, HTTPException, status
from dotenv import load_dotenv
from src.config import ADMIN_COOKIE_NAME, ADMIN_SECRET_KEY, ADMIN_USERNAME

load_dotenv()

def hash_string(string: str) -> str:
    return hmac.new(
        ADMIN_SECRET_KEY.encode(),
        string.encode(),
        hashlib.sha256
    ).hexdigest()

def verify_admin(request: Request) -> bool:
    signed_session = request.cookies.get(ADMIN_COOKIE_NAME)
    if not signed_session:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated."
        )
    
    try:
        session_data, signature = signed_session.rsplit(":", 1)
        
        expected_signature = hash_string(session_data)
        
        if not hmac.compare_digest(signature, expected_signature):
            raise ValueError("Invalid signature")
            
        user, expires = session_data.split(":")
        
        if int(expires) < time.time():
            raise ValueError("Session expired")
            
        if user != ADMIN_USERNAME:
            raise ValueError("Invalid user")
            
    except (ValueError, IndexError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired session."
        )
        
    return True
