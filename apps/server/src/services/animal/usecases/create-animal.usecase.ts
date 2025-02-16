import { InjectModel } from '@nestjs/mongoose';
import { CreateAnimalRequestDto } from '../dtos';
import { AnimalModel } from 'src/database';

export class CreateAnimalUseCase {
  constructor(
    @InjectModel('Animal') private readonly animalModel: AnimalModel,
  ) {}

  async execute(createAnimalDto: CreateAnimalRequestDto) {
    const animalDocument = new this.animalModel(createAnimalDto);
    await animalDocument.save();
  }
}
