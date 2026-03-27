from sqlalchemy import Column, ForeignKey, String, text, Integer
from .base import Base
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from sqlalchemy.orm import relationship

class Role(Base):
    __tablename__ = "role"

    role_id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))
    experience_id = Column(UUID(as_uuid=True), ForeignKey("experience.experience_id"), nullable=False)
    
    role_title = Column(String, nullable=False)
    date_range = Column(String, nullable=False)
    description = Column(String, nullable=False)
    sort_order = Column(Integer, server_default="0", nullable=False)
    
    tags = Column(ARRAY(String), server_default='{}')

    experience = relationship("Experience", back_populates="roles")