import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HealthRecordListResponse } from '@repo/shared';
import { PipelineStage, Types } from 'mongoose';
import { AnimalHealthRecordModel } from 'src/database/models/animal-health-record.model';

@Injectable()
export class GetAnimalHealthRecordsList {
  private readonly logger = new Logger(GetAnimalHealthRecordsList.name);

  constructor(
    @InjectModel('AnimalHealthRecord')
    private readonly animalHealthRecordModel: AnimalHealthRecordModel,
  ) {}

  async execute(animalId?: string): Promise<HealthRecordListResponse> {
    this.logger.log(
      `Fetching health records for animal: ${animalId || 'all animals'}`,
    );

    const matchStage = animalId
      ? {
          $match: {
            animal: new Types.ObjectId(animalId),
            isDeleted: { $ne: true },
          },
        }
      : { $match: { isDeleted: { $ne: true } } };

    const pipeline: PipelineStage[] = [
      matchStage,
      {
        $lookup: {
          from: 'animals',
          localField: 'animal',
          foreignField: '_id',
          as: 'animal',
        },
      },
      {
        $lookup: {
          from: 'vaccines',
          localField: 'vaccine',
          foreignField: '_id',
          as: 'vaccine',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'veterinarian',
          foreignField: '_id',
          as: 'veterinarian',
        },
      },
      // Unwind populated arrays
      { $unwind: '$animal' },
      { $unwind: '$vaccine' },
      { $unwind: '$veterinarian' },
      // Unwind schedule array to create one document per schedule
      { $unwind: '$schedule' },
      // Project final structure
      {
        $project: {
          id: '$schedule._id',
          healthRecordId: '$_id',
          animal: '$animal',
          vaccine: '$vaccine',
          administeredDate: '$schedule.administeredDate',
          dueDate: '$schedule.dateTime',
          veterinarian: '$veterinarian',
          status: '$schedule.status',
          quantity: '$schedule.quantity',
          // Add sorting fields
          statusPriority: {
            $cond: {
              if: { $eq: ['$schedule.status', 'PENDING'] },
              then: 0,
              else: 1,
            },
          },
        },
      },
      {
        $sort: {
          statusPriority: 1,
          dueDate: 1,
        },
      },
      {
        $project: {
          statusPriority: 0,
        },
      },
    ];

    const results = await this.animalHealthRecordModel.aggregate(pipeline);

    this.logger.log(`Query results for animal ${animalId}:`, {
      count: results.length,
      recordIds: results
        .map((r) => r.healthRecordId?.toString())
        .filter(Boolean),
    });

    return {
      count: results.length,
      results: results.map((result) => ({
        ...result,
        id: result.id.toString(),
        healthRecordId: result.healthRecordId.toString(),
      })),
    };
  }
}
