import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FeedInventoryModel } from 'src/database/models/feed-inventory.model';

@Injectable()
export class DeleteFeedInventoryUseCase {
  constructor(
    @InjectModel('FeedInventory')
    private readonly feedInventoryModel: FeedInventoryModel,
  ) {}

  async execute(feedInventoryId: string): Promise<{ message: string }> {
    const feedInventory =
      await this.feedInventoryModel.findById(feedInventoryId);

    if (!feedInventory) {
      throw new NotFoundException('Feed inventory item not found');
    }

    if (feedInventory.isDeleted) {
      throw new NotFoundException('Feed inventory item is already deleted');
    }

    // Soft delete - mark as deleted
    await this.feedInventoryModel.findByIdAndUpdate(
      feedInventoryId,
      {
        isDeleted: true,
        deletedAt: new Date(),
      },
      { new: true },
    );

    return {
      message: 'Feed inventory item deleted successfully',
    };
  }
}
