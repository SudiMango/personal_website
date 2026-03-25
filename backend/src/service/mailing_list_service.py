from uuid import UUID
from sqlalchemy.orm import Session
from src.model.mailing_list import MailingList
from ..repository.mailing_list_repository import MailingListRepository
from .email_service import EmailService


class MailingListService:
    def __init__(self):
        self.repo = MailingListRepository()

    def enroll(self, db: Session, email: str) -> None:
        existing = self.repo.find_by_email(db, email)
        
        if not existing:
            entry = MailingList(email=email)
            new = self.repo.create(db, entry)
            self._send_enrollment_email(email, new.mailing_list_id)

    def unenroll(self, db: Session, enroll_id: UUID, email: str) -> None:
        existing = self.repo.find_by_id_and_email(db, enroll_id, email)
        
        if existing:
            self.repo.delete(db, existing)
            self._send_unenrollment_email(email)
    

    def _send_enrollment_email(self, recipient: str, enrollment_id: str) -> None:
        unsubscribe_link = f"https://sudicodes.xyz/mailing/unsubscribe?enrollid={enrollment_id}&email={recipient}"
        subject = "You're on the list! 🎉"
        body = f"""
        Hi there!

        Thanks so much for joining my mailing list. I'm thrilled to have you here!

        From now on, you'll be the first to hear about my new projects, updates, and any other random stuff I find too good not to share. My goal is to keep these emails high-value and low-noise.

        Best,
        Sudi

        ---
        Want to unsubscribe? Visit: {unsubscribe_link}
        """
        
        EmailService.send_email(recipient, subject, body)

    def _send_unenrollment_email(self, recipient: str) -> None:
        subject = "You've been unsubscribed :("
        body = """
        Hi there,

        This email confirms that you've been successfully removed from my mailing list. You won't receive any more automated updates from me.

        I'm sorry to see you go, but I totally get it, inboxes get crowded! If you ever want to come back, the door is always open at sudicodes.xyz.

        Wishing you all the best,
        Sudi
        """
        
        EmailService.send_email(recipient, subject, body)