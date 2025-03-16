import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnimalDeleteResponse } from '@repo/shared';
import mongoose from 'mongoose';
import { AnimalModel } from 'src/database';
import { DietPlanModel } from 'src/database/models/diet-plan.model';

@Injectable()
export class DeleteAnimalByIdUseCase {
  constructor(
    @InjectModel('Animal') private readonly animalModel: AnimalModel,
    @InjectModel('DietPlan') private readonly dietPlanModel: DietPlanModel,
  ) {}
  async execute(animalId: string): Promise<AnimalDeleteResponse> {
    // Delete Diet Plans
    await this.dietPlanModel.deleteMany({
      animal: new mongoose.Types.ObjectId(animalId),
    });

    // Delete Animal
    await this.animalModel.deleteOne({
      _id: new mongoose.Types.ObjectId(animalId),
    });
  }
}
