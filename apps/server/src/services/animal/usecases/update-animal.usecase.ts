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

  async execute(animalId: string, updateAnimalDto: CreateAnimalDto): Promise<AnimalResponse> {
    const existingAnimal = await this.animalModel.findById(animalId);
    
    if (!existingAnimal) {
      throw new NotFoundException('Animal not found');
    }

    const updatedAnimal = await this.animalModel.findByIdAndUpdate(
      animalId,
      updateAnimalDto,
      { new: true }
    );

    return mapDocumentToResponse(updatedAnimal!);
  }
}
