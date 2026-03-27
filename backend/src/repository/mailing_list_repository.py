from uuid import UUID
from sqlalchemy.orm import Session
from typing import Optional
from pydantic import BaseModel
from src.repository.crud_repository import CrudRepository
from src.model.mailing_list import MailingList


class MailingListRepository(CrudRepository[MailingList, BaseModel]):
    def __init__(self):
        super().__init__(MailingList)

    def find_by_email(self, db: Session, email: str) -> Optional[MailingList]:
        return db.query(self.model).filter(self.model.email == email).first()

    def find_by_id_and_email(self, db: Session, id: UUID, email: str) -> Optional[MailingList]:
        return db.query(self.model).filter(self.model.mailing_list_id == id, self.model.email == email).first()