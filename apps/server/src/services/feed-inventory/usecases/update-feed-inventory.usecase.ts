import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FeedInventoryModel } from 'src/database/models/feed-inventory.model';
import { CreateNewFeedItemReq, IFeedInventory } from '@repo/shared';

@Injectable()
export class UpdateFeedInventoryUseCase {
  constructor(
    @InjectModel('FeedInventory')
    private readonly feedInventoryModel: FeedInventoryModel,
  ) {}

  async execute(
    feedInventoryId: string,
    updateData: CreateNewFeedItemReq,
  ): Promise<IFeedInventory> {
    const feedInventory = await this.feedInventoryModel.findById(feedInventoryId);

    if (!feedInventory) {
      throw new NotFoundException('Feed inventory item not found');
    }

    // Update the feed inventory item
    const updatedFeedInventory = await this.feedInventoryModel.findByIdAndUpdate(
      feedInventoryId,
      {
        name: updateData.name,
        totalPrice: updateData.totalPrice,
        description: updateData.description,
        // Calculate the total quantity and update remaining stock
        // Keep the used stock the same, adjust the remaining stock
        $inc: {
          remainingStock: updateData.totalQuentity - (feedInventory.remainingStock + feedInventory.usedStock),
        },
        nutritionInfo: {
          protein: updateData.protein,
          carbs: updateData.carbs,
          fats: updateData.fats,
          fiber: updateData.fiber,
          calories: updateData.calories,
        },
      },
      { new: true },
    );

    return {
      ...updatedFeedInventory.toObject(),
      id: updatedFeedInventory._id.toString(),
    } as IFeedInventory;
  }
}
