import { Injectable } from '@nestjs/common';
import { CreateFeedItemDto } from '../feed-ingentory.dtos';
import { InjectModel } from '@nestjs/mongoose';
import {
  FeedInventoryDocument,
  FeedInventoryModel,
} from 'src/database/models/feed-inventory.model';
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
    const newItem: FeedInventoryDocument = await this.feedInventoryModel.create(
      {
        name: createFeedItemDto.name,
        description: createFeedItemDto.description,
        remainingStock: createFeedItemDto.totalQuentity,
        usedStock: 0,
        totalPrice: createFeedItemDto.totalPrice,
        nutritionInfo: {
          calories: createFeedItemDto.calories,
          carbs: createFeedItemDto.carbs,
          fats: createFeedItemDto.fats,
          fiber: createFeedItemDto.fiber,
          protein: createFeedItemDto.protein,
        },
      },
    );
    return newItem.toObject();
  }
}
