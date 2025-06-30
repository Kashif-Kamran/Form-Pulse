import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HealthAlertsResponse } from '@repo/shared';
import { VaccineStatuses } from '@repo/shared/dist/cjs/types/enum.types';
import { PipelineStage } from 'mongoose';
import { AnimalHealthRecordModel } from 'src/database/models/animal-health-record.model';
import { AnimalModel } from 'src/database/models/animal.model';

@Injectable()
export class GetHealthAlertsUseCase {
  private readonly logger = new Logger(GetHealthAlertsUseCase.name);

  constructor(
    @InjectModel('AnimalHealthRecord')
    private readonly animalHealthRecordModel: AnimalHealthRecordModel,
    @InjectModel('Animal')
    private readonly animalModel: AnimalModel,
  ) {}

  async execute(): Promise<HealthAlertsResponse> {
    this.logger.log('Fetching health alerts');

    const alerts = [];
    const now = new Date();

    // Check for overdue vaccines
    const overduePipeline: PipelineStage[] = [
      {
        $unwind: '$schedule',
      },
      {
        $match: {
          'schedule.status': { $ne: VaccineStatuses.COMPLETED },
          'schedule.dateTime': { $lt: now },
        },
      },
      {
        $count: 'overdueCount',
      },
    ];

    const overdueResult =
      await this.animalHealthRecordModel.aggregate(overduePipeline);
    const overdueCount =
      overdueResult.length > 0 ? overdueResult[0].overdueCount : 0;

    if (overdueCount > 0) {
      alerts.push({
        type: 'overdue_vaccines' as const,
        count: overdueCount,
        severity: 'high' as const,
        message: `${overdueCount} Overdue Vaccines`,
        description: 'Requires immediate attention',
      });
    }

    // Check for animals without health records
    const totalAnimals = await this.animalModel.countDocuments();
    const animalsWithRecords =
      await this.animalHealthRecordModel.distinct('animal');
    const missingRecords = totalAnimals - animalsWithRecords.length;

    if (missingRecords > 0) {
      alerts.push({
        type: 'missing_records' as const,
        count: missingRecords,
        severity: 'medium' as const,
        message: `${missingRecords} Missing Records`,
        description: 'New animals without health data',
      });
    }

    // Check for upcoming vaccines (within next 7 days)
    const upcomingDate = new Date();
    upcomingDate.setDate(upcomingDate.getDate() + 7);

    const upcomingPipeline: PipelineStage[] = [
      {
        $unwind: '$schedule',
      },
      {
        $match: {
          'schedule.status': { $ne: 'completed' },
          'schedule.dateTime': {
            $gte: now,
            $lte: upcomingDate,
          },
        },
      },
      {
        $count: 'upcomingCount',
      },
    ];

    const upcomingResult =
      await this.animalHealthRecordModel.aggregate(upcomingPipeline);
    const upcomingCount =
      upcomingResult.length > 0 ? upcomingResult[0].upcomingCount : 0;

    if (upcomingCount > 0) {
      alerts.push({
        type: 'upcoming_schedules' as const,
        count: upcomingCount,
        severity: 'low' as const,
        message: `${upcomingCount} Upcoming Vaccines`,
        description: 'Scheduled within next 7 days',
      });
    }

    return {
      success: true,
      data: {
        data: alerts,
        total: alerts.length,
      },
    };
  }
}
