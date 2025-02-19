import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnimalModel } from 'src/database';
import { IAnimal } from 'src/domain';

@Injectable()
export class GETAnimalByIdUsecase {
  constructor(
    @InjectModel('Animal') private readonly animalModel: AnimalModel,
  ) {}

  async execute(id: string): Promise<IAnimal> {
    const animal = await this.animalModel.findById(id);

    if (!animal) {
      throw new Error('Animal not found');
    }

    return animal;
  }
}
