from uuid import UUID
from sqlalchemy.orm import Session
from typing import Optional
from src.model.mailing_list import MailingList


class MailingListRepository:
    def create(self, db: Session, entry: MailingList) -> MailingList:
        db.add(entry)
        db.commit()
        db.refresh(entry)
        return entry

    def delete(self, db: Session, entry: MailingList) -> None:
        db.delete(entry)
        db.commit()

    def find_by_email(self, db: Session, email: str) -> Optional[MailingList]:
        return db.query(MailingList).filter(MailingList.email == email).first()

    def find_by_id_and_email(self, db: Session, id: UUID, email: str) -> Optional[MailingList]:
        return db.query(MailingList).filter(MailingList.mailing_list_id == id, MailingList.email == email).first()