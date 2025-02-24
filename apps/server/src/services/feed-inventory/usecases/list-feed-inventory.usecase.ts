import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FeedInventoryListResponse, FeedInventoryPublic } from '@repo/shared';
import { FeedInventoryModel } from 'src/database/models/feed-inventory.model';

@Injectable()
export class ListFeedInventoryUseCase {
  constructor(
    @InjectModel('FeedInventory')
    private readonly feedInventoryModel: FeedInventoryModel,
  ) {}
  async execute(): Promise<FeedInventoryListResponse> {
    const feedItems = await this.feedInventoryModel.find();
    const results: FeedInventoryPublic[] = feedItems.map((item) => ({
      id: item.id,
      name: item.name,
      unitPrice: item.unitPrice,
      availableQuantity: item.availableQuantity,
    }));

    return { results, count: results.length };
  }
}
