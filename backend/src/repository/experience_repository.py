from src.repository.crud_repository import CrudRepository
from src.schema.experience_schemas import UpdateExperienceRequest
from src.model.experience import Experience

class ExperienceRepository(CrudRepository[Experience, UpdateExperienceRequest]):
    def __init__(self):
        super().__init__(Experience)