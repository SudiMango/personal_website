from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from src.schema.role_schemas import CreateRoleRequest, RoleResponse, UpdateRoleRequest
from ..db import get_db
from ..service.role_service import RoleService

router = APIRouter(prefix="/role")
service = RoleService()

@router.post("/{experience_id}", status_code=status.HTTP_201_CREATED, response_model=RoleResponse)
def create(experience_id: UUID, request: CreateRoleRequest, db: Session = Depends(get_db)):
    """
    Create new role

    API URL: POST /role/{experience_id}

    Args:
        experience_id: uuid of experience
        request: CreateRoleRequest
        db: database session

    Returns:
        RoleResponse: (HTTP 201)

    Raises:
        404: experience not found
        422: error in request body
    """

    return service.create(db, experience_id, request)

@router.get("/{experience_id}/all", status_code=status.HTTP_200_OK, response_model=List[RoleResponse])
def get_all(experience_id: UUID, db: Session = Depends(get_db)):
    """
    Get all roles for an experience

    API URL: GET /role/{experience_id}/all

    Args:
        experience_id: uuid of experience
        db: database session

    Returns:
        List[RoleResponse]: (HTTP 200)

    Raises:
        404: experience not found
    """

    return service.get_all(db, experience_id)

@router.get("/{role_id}", status_code=status.HTTP_200_OK, response_model=RoleResponse)
def get_one(role_id: UUID, db: Session = Depends(get_db)):
    """
    Get one role

    API URL: GET /role/{role_id}

    Args:
        role_id: uuid of role
        db: database session

    Returns:
        RoleResponse: (HTTP 200)

    Raises:
        404: role not found
        422: error in uuid format
    """

    return service.get_one(db, role_id)

@router.patch("/{role_id}", status_code=status.HTTP_200_OK, response_model=RoleResponse)
def update(role_id: UUID, request: UpdateRoleRequest, db: Session = Depends(get_db)):
    """
    Update a role

    API URL: PATCH /role/{role_id}

    Args:
        role_id: uuid of role
        request: UpdateRoleRequest
        db: database session

    Returns:
        RoleResponse: (HTTP 200)

    Raises:
        404: role not found
        422: error in uuid format / request body
    """

    return service.update(db, role_id, request)

@router.delete("/{role_id}", status_code=status.HTTP_200_OK)
def delete(role_id: UUID, db: Session = Depends(get_db)):
    """
    Delete a role

    API URL: DEL /role/{role_id}

    Args:
        role_id: uuid of role
        db: database session

    Returns:
        None: (HTTP 200)

    Raises:
        404: role not found
    """

    return service.delete(db, role_id)
