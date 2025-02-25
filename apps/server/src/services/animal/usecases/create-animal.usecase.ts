import { InjectModel } from '@nestjs/mongoose';
import { CreateAnimalDto } from '../dtos';
import { AnimalModel } from 'src/database';
import { AnimalPublic } from '@repo/shared';
import { mapDocumentToResponse } from '../mappers/document-to-response.mapper';
import { AnimalDocument } from 'src/database/models/animal.model';
export class CreateAnimalUseCase {
  constructor(
    @InjectModel('Animal') private readonly animalModel: AnimalModel,
  ) {}

  async execute(createAnimalDto: CreateAnimalDto): Promise<AnimalPublic> {
    const animalDocument = new this.animalModel(createAnimalDto);
    const creationResponse: AnimalDocument = await animalDocument.save();
    return mapDocumentToResponse(creationResponse);
  }
}
