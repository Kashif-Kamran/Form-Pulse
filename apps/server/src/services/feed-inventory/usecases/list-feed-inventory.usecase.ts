import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FeedInventoryListResponse, IFeedInventory } from '@repo/shared';
import {
  FeedInventoryDocument,
  FeedInventoryModel,
} from 'src/database/models/feed-inventory.model';

@Injectable()
export class ListFeedInventoryUseCase {
  constructor(
    @InjectModel('FeedInventory')
    private readonly feedInventoryModel: FeedInventoryModel,
  ) {}
  async execute(searchQuery?: string): Promise<FeedInventoryListResponse> {
    let feedItems: FeedInventoryDocument[] = [];

    // Base query to exclude soft deleted items
    const baseQuery = { isDeleted: { $ne: true } };

    if (!searchQuery) {
      feedItems = await this.feedInventoryModel.find(baseQuery);
    } else {
      const regex = new RegExp(`^${searchQuery}`, 'i');
      feedItems = await this.feedInventoryModel
        .find({
          ...baseQuery,
          $or: [{ name: { $regex: regex } }],
        })
        .exec();
    }

    const results: IFeedInventory[] = feedItems.map((item) => item.toObject());

    return { results, count: results.length };
  }
}
