import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ActivityResponse } from '@repo/shared';
import { AnimalModel } from 'src/database/models/animal.model';
import { AnimalHealthRecordModel } from 'src/database/models/animal-health-record.model';
import { FeedInventoryModel } from 'src/database/models/feed-inventory.model';
import { UserModel } from 'src/database/models/user.model';

@Injectable()
export class GetActivityUseCase {
  private readonly logger = new Logger(GetActivityUseCase.name);

  constructor(
    @InjectModel('Animal')
    private readonly animalModel: AnimalModel,
    @InjectModel('AnimalHealthRecord')
    private readonly animalHealthRecordModel: AnimalHealthRecordModel,
    @InjectModel('FeedInventory')
    private readonly feedInventoryModel: FeedInventoryModel,
    @InjectModel('User')
    private readonly userModel: UserModel,
  ) {}

  async execute(): Promise<ActivityResponse> {
    this.logger.log('Fetching activity data');

    const now = new Date();

    // Calculate date ranges
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Animals added in last 30 days
    const animalsAdded = await this.animalModel.countDocuments({
      createdAt: { $gte: last30Days },
    });

    // Vaccinations given in last 7 days
    const vaccinationsGiven = await this.animalHealthRecordModel.aggregate([
      {
        $unwind: '$schedule',
      },
      {
        $match: {
          'schedule.administeredDate': { $gte: last7Days },
          'schedule.status': 'Completed',
        },
      },
      {
        $count: 'totalVaccinations',
      },
    ]);

    const vaccinationCount =
      vaccinationsGiven.length > 0 ? vaccinationsGiven[0].totalVaccinations : 0;

    // Feed orders/additions in last 7 days (new feed inventory items)
    const feedOrders = await this.feedInventoryModel.countDocuments({
      createdAt: { $gte: last7Days },
      isDeleted: { $ne: true }, // Exclude soft deleted items
    });

    // Active users in last 24 hours (users who have logged in recently)
    // Note: This would require tracking last login time in user model
    // For now, we'll use recently created users as a proxy
    const activeUsers = await this.userModel.countDocuments({
      createdAt: { $gte: last24Hours },
    });

    const data = [
      {
        type: 'animals_added' as const,
        count: animalsAdded,
        period: '30d' as const,
        label: 'Animals Added (30d)',
      },
      {
        type: 'vaccinations_given' as const,
        count: vaccinationCount,
        period: '7d' as const,
        label: 'Vaccinations (7d)',
      },
      {
        type: 'feed_orders' as const,
        count: feedOrders,
        period: '7d' as const,
        label: 'Feed Orders (7d)',
      },
      {
        type: 'active_users' as const,
        count: activeUsers,
        period: '24h' as const,
        label: 'New Users (24h)',
      },
    ];

    return {
      success: true,
      data: {
        data,
        total: data.length,
      },
    };
  }
}
