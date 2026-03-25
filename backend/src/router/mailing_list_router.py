from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from ..db import get_db
from ..schema.mailing_list_schemas import EnrollInMailingListRequest, UnenrollInMailingListRequest
from ..service.mailing_list_service import MailingListService

router = APIRouter(prefix="/mailinglist")
service = MailingListService()


@router.post("/enroll", status_code=status.HTTP_204_NO_CONTENT)
def enroll(request: EnrollInMailingListRequest, db: Session = Depends(get_db)):
    """
    Enroll a user in the mailing list

    API URL: POST /mailinglist/enroll

    Args:
        request: EnrollInMailingListRequest
        db: database session

    Returns:
        None: (HTTP 204)

    Raises:
        422: error in request body
    """

    return service.enroll(db, request.email)


@router.delete("/unenroll", status_code=status.HTTP_200_OK)
def unenroll(request: UnenrollInMailingListRequest, db: Session = Depends(get_db)):
    """
    Remove a user from the mailing list

    API URL: DEL /mailinglist/unenroll

    Args:
        request: UnenrollInMailingListRequest
        db: database session

    Returns:
        None: (HTTP 200)

    Raises:
        422: error in request body
    """

    return service.unenroll(db, request.enroll_id, request.email)