from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from src.schema.experience_schemas import CreateExperienceRequest, ExperienceResponse, UpdateExperienceRequest
from ..db import get_db
from ..service.experience_service import ExperienceService
from ..auth import verify_admin

router = APIRouter(prefix="/experience")
service = ExperienceService()

@router.post("", status_code=status.HTTP_201_CREATED, response_model=ExperienceResponse, dependencies=[Depends(verify_admin)])
def create(request: CreateExperienceRequest, db: Session = Depends(get_db)):
    """
    Create new experience

    API URL: POST /experience

    Args:
        request: CreateExperienceRequest
        db: database session

    Returns:
        ExperienceResponse: (HTTP 201)

    Raises:
        422: error in request body
    """

    return service.create(db, request)

@router.get("/all", status_code=status.HTTP_200_OK, response_model=List[ExperienceResponse])
def get_all(db: Session = Depends(get_db)):
    """
    Get all experiences

    API URL: GET /experience/all

    Args:
        db: database session

    Returns:
        List[ExperienceResponse]: (HTTP 200)

    Raises:
        None
    """

    return service.get_all(db)

@router.get("/{experience_id}", status_code=status.HTTP_200_OK, response_model=ExperienceResponse)
def get_one(experience_id: UUID, db: Session = Depends(get_db)):
    """
    Get one experience

    API URL: GET /experience/{experience_id}

    Args:
        experience_id: uuid of experience
        db: database session

    Returns:
        ExperienceResponse: (HTTP 200)

    Raises:
        404: experience not found
        422: error in uuid format
    """

    return service.get_one(db, experience_id)

@router.patch("/{experience_id}", status_code=status.HTTP_200_OK, response_model=ExperienceResponse, dependencies=[Depends(verify_admin)])
def update(experience_id: UUID, request: UpdateExperienceRequest, db: Session = Depends(get_db)):
    """
    Update an experience

    API URL: PATCH /experience/{experience_id}

    Args:
        experience_id: uuid of experience
        request: UpdateExperienceRequest
        db: database session

    Returns:
        ExperienceResponse: (HTTP 200)

    Raises:
        404: experience not found
        422: error in uuid format / request body
    """

    return service.update(db, experience_id, request)

@router.delete("/{experience_id}", status_code=status.HTTP_200_OK, dependencies=[Depends(verify_admin)])
def delete(experience_id: UUID, db: Session = Depends(get_db)):
    """
    Delete an experience

    API URL: DEL /experience/{experience_id}

    Args:
        experience_id: uuid of experience
        db: database session

    Returns:
        None: (HTTP 200)

    Raises:
        404: experience not found
    """

    return service.delete(db, experience_id)
