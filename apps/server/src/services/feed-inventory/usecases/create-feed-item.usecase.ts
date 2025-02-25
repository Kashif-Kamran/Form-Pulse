import { Injectable } from '@nestjs/common';
import { CreateFeedItemDto } from '../feed-ingentory.dtos';
import { InjectModel } from '@nestjs/mongoose';
import { FeedInventoryModel } from 'src/database/models/feed-inventory.model';
import { FeedItemResponse } from '@repo/shared';

@Injectable()
export class CreateFeedItemUseCase {
  constructor(
    @InjectModel('FeedInventory')
    private readonly feedInventoryModel: FeedInventoryModel,
  ) {}
  async execute(
    createFeedItemDto: CreateFeedItemDto,
  ): Promise<FeedItemResponse> {
    const newItem = await this.feedInventoryModel.create(createFeedItemDto);
    return {
      availableQuantity: newItem.availableQuantity,
      id: newItem.id,
      name: newItem.name,
      unitPrice: newItem.unitPrice,
    };
  }
}
