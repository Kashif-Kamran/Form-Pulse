import { InjectModel } from '@nestjs/mongoose';
import { CreateAnimalDto } from '../dtos';
import { AnimalModel } from 'src/database';

export class CreateAnimalUseCase {
  constructor(
    @InjectModel('Animal') private readonly animalModel: AnimalModel,
  ) {}

  async execute(createAnimalDto: CreateAnimalDto) {
    const animalDocument = new this.animalModel(createAnimalDto);
    return await animalDocument.save();
  }
}
