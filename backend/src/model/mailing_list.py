from sqlalchemy import Column, String, DateTime, text
from .base import Base
from sqlalchemy.dialects.postgresql import UUID

class MailingList(Base):
    __tablename__ = "mailing_list"

    mailing_list_id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))
    email = Column(String, nullable=False, unique=True)
    created_at = Column(DateTime(timezone=True), server_default=text("now()"))