import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnimalDeleteResponse } from '@repo/shared';
import mongoose from 'mongoose';
import {
  AnimalModel,
  AnimalHealthRecordModel,
  DietPlanModel,
} from 'src/database';

@Injectable()
export class DeleteAnimalByIdUseCase {
  constructor(
    @InjectModel('Animal') private readonly animalModel: AnimalModel,
    @InjectModel('DietPlan') private readonly dietPlanModel: DietPlanModel,
    @InjectModel('AnimalHealthRecord')
    private readonly animalHealthRecordModel: AnimalHealthRecordModel,
  ) {}

  async execute(animalId: string): Promise<AnimalDeleteResponse> {
    const objectId = new mongoose.Types.ObjectId(animalId);

    // Check if animal exists and is not already deleted
    const animal = await this.animalModel.findOne({
      _id: objectId,
      isDeleted: { $ne: true },
    });

    if (!animal) {
      throw new NotFoundException('Animal not found or already deleted');
    }

    const deletedAt = new Date();

    // Use MongoDB session for transaction
    const session = await mongoose.startSession();

    try {
      await session.withTransaction(async () => {
        // Soft delete the animal
        await this.animalModel.updateOne(
          { _id: objectId },
          {
            $set: {
              isDeleted: true,
              deletedAt: deletedAt,
            },
          },
          { session },
        );

        // Soft delete all related diet plans
        await this.dietPlanModel.updateMany(
          {
            animal: objectId,
            isDeleted: { $ne: true },
          },
          {
            $set: {
              isDeleted: true,
              deletedAt: deletedAt,
            },
          },
          { session },
        );

        // Soft delete all related animal health records
        await this.animalHealthRecordModel.updateMany(
          {
            animal: animalId,
            isDeleted: { $ne: true },
          },
          {
            $set: {
              isDeleted: true,
              deletedAt: deletedAt,
            },
          },
          { session },
        );
      });

      return {
        message: 'Animal and related records successfully deleted',
        deletedAt: deletedAt.toISOString(),
        animalId: animalId,
      };
    } catch (error) {
      throw new Error(
        `Failed to delete animal and related records: ${error.message}`,
      );
    } finally {
      await session.endSession();
    }
  }
}
