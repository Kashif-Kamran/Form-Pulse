import { AnimalDocument } from 'src/database/models/animal.model';
import { AnimalPublic } from '@repo/shared';

function mapDocumentToResponse(doc: AnimalDocument): AnimalPublic {
  return {
    _id: doc._id,
    id: doc.id,
    name: doc.name,
    age: doc.age,
    breed: doc.breed,
    species: doc.species,
    weight: doc.weight,
  };
}

export { mapDocumentToResponse };
