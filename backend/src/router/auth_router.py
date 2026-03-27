from fastapi import APIRouter, Response, status
from src.schema.auth_schemas import LoginRequest
from src.service.auth_service import AuthService

router = APIRouter(prefix="/auth")
service = AuthService()

@router.post("/login", status_code=status.HTTP_200_OK)
def login(request: LoginRequest, response: Response):
    """
    Login for admin

    API URL: POST /auth/login

    Args:
        request: LoginRequest
        response: Http Response

    Returns:
        None: 200

    Raises:
        401: invalid credentials
        422: error in request body
    """
        
    return service.login(request, response)

@router.post("/logout", status_code=status.HTTP_200_OK)
def logout(response: Response):
    """
    Logs out the admin

    API URL: POST /auth/logout

    Args:
        response: Http Response

    Returns:
        None: 200

    Raises:
        None
    """

    return service.logout(response)
