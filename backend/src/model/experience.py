from sqlalchemy import Column, String, text, Integer
from .base import Base
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

class Experience(Base):
    __tablename__ = "experience"

    experience_id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))
    company= Column(String, nullable=False)
    sort_order = Column(Integer, server_default="0", nullable=False)

    roles = relationship("Role", back_populates="experience", cascade="all, delete-orphan", order_by="Role.sort_order.asc()")