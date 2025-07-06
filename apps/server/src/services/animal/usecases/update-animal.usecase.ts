import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnimalModel } from 'src/database';
import { AnimalResponse } from '@repo/shared';
import { CreateAnimalDto } from '../dtos';
import { mapDocumentToResponse } from '../mappers/document-to-response.mapper';

@Injectable()
export class UpdateAnimalUseCase {
  constructor(
    @InjectModel('Animal') private readonly animalModel: AnimalModel,
  ) {}

  async execute(
    animalId: string,
    updateAnimalDto: CreateAnimalDto,
  ): Promise<AnimalResponse> {
    const existingAnimal = await this.animalModel.findOne({
      _id: animalId,
      isDeleted: { $ne: true },
    });

    if (!existingAnimal) {
      throw new NotFoundException('Animal not found or has been deleted');
    }

    const updatedAnimal = await this.animalModel.findOneAndUpdate(
      { _id: animalId, isDeleted: { $ne: true } },
      updateAnimalDto,
      { new: true },
    );

    return mapDocumentToResponse(updatedAnimal!);
  }
}
