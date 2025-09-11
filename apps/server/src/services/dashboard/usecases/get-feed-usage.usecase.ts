import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FeedUsageResponse } from '@repo/shared';
import { FeedInventoryModel } from 'src/database/models/feed-inventory.model';

@Injectable()
export class GetFeedUsageUseCase {
  private readonly logger = new Logger(GetFeedUsageUseCase.name);

  constructor(
    @InjectModel('FeedInventory')
    private readonly feedInventoryModel: FeedInventoryModel,
  ) {}

  async execute(): Promise<FeedUsageResponse> {
    this.logger.log('Fetching feed usage data');

    const feedInventory = await this.feedInventoryModel
      .find({
        usedStock: { $gt: 0 }, // Only feeds that have been used
        isDeleted: { $ne: true }, // Exclude soft deleted items
      })
      .sort({ usedStock: -1 }); // Sort by most used

    const data = feedInventory.map((feed) => {
      const totalConsumption = feed.usedStock;

      return {
        feedId: feed._id.toString(),
        feedName: feed.name,
        usedStock: feed.usedStock,
        totalConsumption,
      };
    });

    // Take top 10 most used feeds
    const topUsedFeeds = data.slice(0, 10);

    return {
      success: true,
      data: {
        data: topUsedFeeds,
        total: topUsedFeeds.length,
      },
    };
  }
}
