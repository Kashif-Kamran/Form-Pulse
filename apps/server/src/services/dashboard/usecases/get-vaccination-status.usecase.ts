import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { VaccinationStatusResponse } from '@repo/shared';
import { VaccineStatuses } from '@repo/shared/dist/cjs/types/enum.types';
import { PipelineStage } from 'mongoose';
import {
  AnimalHealthRecordModel,
  Schedule,
} from 'src/database/models/animal-health-record.model';

@Injectable()
export class GetVaccinationStatusUseCase {
  private readonly logger = new Logger(GetVaccinationStatusUseCase.name);

  constructor(
    @InjectModel('AnimalHealthRecord')
    private readonly animalHealthRecordModel: AnimalHealthRecordModel,
  ) {}

  async execute(): Promise<VaccinationStatusResponse> {
    this.logger.log('Fetching vaccination status distribution');

    const pipeline: PipelineStage[] = [
      {
        $unwind: '$schedule',
      },
      {
        $addFields: {
          status: {
            $cond: {
              if: { $eq: ['$schedule.status', VaccineStatuses.COMPLETED] },
              then: 'completed',
              else: {
                $cond: {
                  if: { $lt: ['$schedule.dateTime', new Date()] },
                  then: 'overdue',
                  else: 'pending',
                },
              },
            },
          },
        },
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          statuses: {
            $push: {
              status: '$_id',
              count: '$count',
            },
          },
          total: { $sum: '$count' },
        },
      },
    ];

    const results = await this.animalHealthRecordModel.aggregate(pipeline);

    if (!results.length) {
      return {
        success: true,
        data: {
          data: [
            { status: 'completed', count: 0, percentage: 0 },
            { status: 'pending', count: 0, percentage: 0 },
            { status: 'overdue', count: 0, percentage: 0 },
          ],
          total: 0,
        },
      };
    }

    const { statuses, total } = results[0];

    // Ensure all statuses are represented
    const statusMap = new Map(statuses.map((s) => [s.status, s.count]));
    const data = ['completed', 'pending', 'overdue'].map((status) => {
      const count = Number(statusMap.get(status) || 0);
      return {
        status: status as 'completed' | 'pending' | 'overdue',
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0,
      };
    });

    return {
      success: true,
      data: {
        data,
        total,
      },
    };
  }
}
