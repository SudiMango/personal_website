from sqlalchemy import Column, String, text
from .base import Base
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

class Experience(Base):
    __tablename__ = "experience"

    experience_id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))
    company= Column(String, nullable=False)

    roles = relationship("Role", back_populates="experience", cascade="all, delete-orphan")