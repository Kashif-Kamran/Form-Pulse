import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnimalModel } from 'src/database';
import { GetAnimalResponse } from '@repo/shared';
import { AnimalDocument } from 'src/database/models/animal.model';

@Injectable()
export class GETAnimalByIdUsecase {
  constructor(
    @InjectModel('Animal') private readonly animalModel: AnimalModel,
  ) {}

  async execute(id: string): Promise<GetAnimalResponse> {
    const animal: AnimalDocument = await this.animalModel.findById(id);

    if (!animal) {
      throw new Error('Animal not found');
    }

    const { _id, createdAt, updatedAt, ...animalPayload } = animal;
    return animal.toObject();
  }
}
