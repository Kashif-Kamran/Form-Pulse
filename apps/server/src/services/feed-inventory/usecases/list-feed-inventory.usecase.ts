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
  async execute(): Promise<FeedInventoryListResponse> {
    const feedItems: FeedInventoryDocument[] =
      await this.feedInventoryModel.find();
    const results: IFeedInventory[] = feedItems.map((item) => item.toObject());

    return { results, count: results.length };
  }
}
