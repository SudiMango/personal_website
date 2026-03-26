from uuid import UUID
from sqlalchemy.orm import Session
from typing import List, Optional
from src.schema.experience_schemas import ExperienceResponse, UpdateExperienceRequest
from src.model.experience import Experience

class ExperienceRepository:
    def create(self, db: Session, entry: Experience) -> ExperienceResponse:
        db.add(entry)
        db.commit()
        db.refresh(entry)
        return entry
    
    def get_all(self, db: Session) -> List[ExperienceResponse]:
        return db.query(Experience).all()

    def get_one(self, db: Session, experience_id: UUID) -> Optional[ExperienceResponse]:
        return db.query(Experience).filter(Experience.experience_id == experience_id).first()

    def update(self, db: Session, experience: Experience, request: UpdateExperienceRequest) -> ExperienceResponse:
        update_data = request.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(experience, key, value)

        db.commit()
        db.refresh(experience)
        return experience

    def delete(self, db: Session, entry: Experience) -> None:
        db.delete(entry)
        db.commit()