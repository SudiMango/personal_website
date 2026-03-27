from typing import List
from src.repository.crud_repository import CrudRepository
from src.schema.experience_schemas import UpdateExperienceRequest
from src.model.experience import Experience
from sqlalchemy.orm import Session

class ExperienceRepository(CrudRepository[Experience, UpdateExperienceRequest]):
    def __init__(self):
        super().__init__(Experience)

    def get_all(self, db: Session) -> List[Experience]:
        return db.query(self.model).order_by(self.model.sort_order.asc()).all()