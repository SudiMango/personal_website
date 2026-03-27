import time
from fastapi import Response
from src.config import ADMIN_COOKIE_MAX_AGE, ADMIN_COOKIE_NAME, ADMIN_PASSWORD_HASH, ADMIN_USERNAME, IS_PROD
from src.schema.auth_schemas import LoginRequest
from fastapi import HTTPException, status, Response
from ..utils import hash_string
from dotenv import load_dotenv

load_dotenv()

class AuthService():

    def login(self, request: LoginRequest, response: Response) -> None:
        if request.username != ADMIN_USERNAME:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials."
            )
    
        if hash_string(request.password) != ADMIN_PASSWORD_HASH:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials."
            )
        
        self._create_session_cookie(response)

    def logout(self, response: Response) -> None:
        response.delete_cookie(ADMIN_COOKIE_NAME)

    
    def _create_session_cookie(self, response: Response):
        expires = int(time.time()) + ADMIN_COOKIE_MAX_AGE
        session_data = f"{ADMIN_USERNAME}:{expires}"
        
        signature = hash_string(session_data)
        signed_session = f"{session_data}:{signature}"
        
        response.set_cookie(
            key=ADMIN_COOKIE_NAME,
            value=signed_session,
            httponly=True,
            max_age=ADMIN_COOKIE_MAX_AGE,
            samesite="lax",
            secure=IS_PROD,
        )