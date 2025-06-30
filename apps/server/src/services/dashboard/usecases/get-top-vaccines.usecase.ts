import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TopVaccinesResponse } from '@repo/shared';
import { PipelineStage } from 'mongoose';
import { AnimalHealthRecordModel } from 'src/database/models/animal-health-record.model';

@Injectable()
export class GetTopVaccinesUseCase {
  private readonly logger = new Logger(GetTopVaccinesUseCase.name);

  constructor(
    @InjectModel('AnimalHealthRecord')
    private readonly animalHealthRecordModel: AnimalHealthRecordModel,
  ) {}

  async execute(): Promise<TopVaccinesResponse> {
    this.logger.log('Fetching top vaccines');

    const pipeline: PipelineStage[] = [
      {
        $lookup: {
          from: 'vaccines',
          localField: 'vaccine',
          foreignField: '_id',
          as: 'vaccineInfo',
        },
      },
      {
        $unwind: '$vaccineInfo',
      },
      {
        $unwind: '$schedule',
      },
      {
        $group: {
          _id: {
            vaccineId: '$vaccine',
            vaccineName: '$vaccineInfo.name',
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          vaccineId: '$_id.vaccineId',
          vaccineName: '$_id.vaccineName',
          count: 1,
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 10,
      },
    ];

    const vaccines = await this.animalHealthRecordModel.aggregate(pipeline);
    
    const data = vaccines.map(vaccine => ({
      vaccineId: vaccine.vaccineId.toString(),
      vaccineName: vaccine.vaccineName,
      count: Number(vaccine.count),
    }));

    // Calculate total count
    const totalCount = data.reduce((sum, vaccine) => sum + vaccine.count, 0);

    return {
      success: true,
      data: {
        data,
        total: totalCount,
      },
    };
  }
}
