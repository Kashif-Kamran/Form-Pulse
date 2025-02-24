import { AnimalDocument } from 'src/database/models/animal.model';
import { AnimalResponse } from '@repo/shared';

function mapDocumentToResponse(doc: AnimalDocument): AnimalResponse {
  return {
    _id: doc._id,
    id: doc._id,
    name: doc.name,
    activityLevel: doc.activityLevel,
    age: doc.age,
    breed: doc.breed,
    healthStatus: doc.healthStatus,
    specialDietRequirement: doc.specialDietRequirement,
    species: doc.species,
    weight: doc.weight,
  };
}

export { mapDocumentToResponse };
