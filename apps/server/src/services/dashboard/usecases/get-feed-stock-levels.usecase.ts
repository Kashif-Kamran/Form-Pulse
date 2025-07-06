import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FeedStockLevelsResponse } from '@repo/shared';
import { FeedInventoryModel } from 'src/database/models/feed-inventory.model';

@Injectable()
export class GetFeedStockLevelsUseCase {
  private readonly logger = new Logger(GetFeedStockLevelsUseCase.name);

  constructor(
    @InjectModel('FeedInventory')
    private readonly feedInventoryModel: FeedInventoryModel,
  ) {}

  async execute(): Promise<FeedStockLevelsResponse> {
    this.logger.log('Fetching feed stock levels');

    const feedInventory = await this.feedInventoryModel.find().sort({ name: 1 });

    const data = feedInventory.map(feed => {
      const totalStock = feed.remainingStock + feed.usedStock;
      const percentage = totalStock > 0 ? Math.round((feed.remainingStock / totalStock) * 100) : 0;
      
      let status: 'good' | 'low' | 'critical';
      if (percentage >= 70) {
        status = 'good';
      } else if (percentage >= 30) {
        status = 'low';
      } else {
        status = 'critical';
      }

      return {
        feedId: feed._id.toString(),
        feedName: feed.name,
        remainingStock: feed.remainingStock,
        totalStock,
        usedStock: feed.usedStock,
        percentage,
        status,
      };
    });

    // Sort by percentage (lowest first to show critical items first)
    data.sort((a, b) => a.percentage - b.percentage);

    return {
      success: true,
      data: {
        data,
        total: data.length,
      },
    };
  }
}
