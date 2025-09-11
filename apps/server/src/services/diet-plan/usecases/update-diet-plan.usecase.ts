import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnimalModel, UserModel } from 'src/database';
import { DietPlanModel } from 'src/database/models/diet-plan.model';
import { FeedInventoryModel } from 'src/database/models/feed-inventory.model';
import { CreateDietPlanDto } from '../diet-plan.dto';
import { AnimalDietPlanPublic, RoleType } from '@repo/shared';
import * as moment from 'moment';

type ProcessedRecipe = {
  feed: string;
  perTimeQuantity: number;
  quantity: number;
};

@Injectable()
export class UpdateDietPlanUseCase {
  constructor(
    @InjectModel('DietPlan') private readonly dietPlanModel: DietPlanModel,
    @InjectModel('Animal') private readonly animalModel: AnimalModel,
    @InjectModel('FeedInventory')
    private readonly feedInventoryModel: FeedInventoryModel,
    @InjectModel('User')
    private readonly userModel: UserModel,
  ) {}

  async execute(
    dietPlanId: string,
    updateDietPlanDto: CreateDietPlanDto,
  ): Promise<AnimalDietPlanPublic> {
    // 1. Check if diet plan exists
    const existingDietPlan = await this.dietPlanModel.findById(dietPlanId);
    if (!existingDietPlan) {
      throw new NotFoundException('Diet plan not found');
    }

    // 2. Validate caretaker exists
    const careTaker = await this.userModel.findOne({
      _id: updateDietPlanDto.careTaker,
      role: RoleType.CareTaker,
    });

    if (!careTaker) {
      throw new NotFoundException('Care Taker Not Found');
    }

    // 3. Fetch and validate feed items
    const feedIds = updateDietPlanDto.recipes.map((recipe) => recipe.feed);
    const feedItems = await this.feedInventoryModel.find({
      _id: { $in: feedIds },
      isDeleted: { $ne: true }, // Exclude deleted items
    });

    if (feedItems.length !== feedIds.length) {
      throw new BadRequestException(
        'Some feed items are not available in the inventory or have been deleted',
      );
    }

    // 4. Calculate total quantities
    const totalNumberOfDays =
      moment(updateDietPlanDto.endTime)
        .endOf('day')
        .diff(moment(updateDietPlanDto.startTime).startOf('day'), 'days') + 1;

    const processedRecipes: ProcessedRecipe[] = updateDietPlanDto.recipes.map(
      (recipe) => {
        const quantity = Number(
          (
            recipe.perTimeQuantity *
            updateDietPlanDto.noOfTimesPerDay *
            totalNumberOfDays
          ).toFixed(2),
        );

        return {
          feed: recipe.feed,
          perTimeQuantity: recipe.perTimeQuantity,
          quantity,
        };
      },
    );

    // 5. Validate feed stock (considering current usage)
    for (const recipe of processedRecipes) {
      const feedItem = feedItems.find(
        (item) => item._id.toString() === recipe.feed,
      );
      if (!feedItem) continue;

      // Find current usage for this feed in the existing diet plan
      const currentRecipe = existingDietPlan.recipes.find(
        (r) => r.feed.toString() === recipe.feed,
      );
      const currentUsage = currentRecipe ? currentRecipe.quantity : 0;

      // Check if new quantity exceeds available stock + current usage
      const availableStock = feedItem.remainingStock + currentUsage;
      if (recipe.quantity > availableStock) {
        throw new BadRequestException(
          `Requested quantity (${recipe.quantity}) for feed item ${recipe.feed} exceeds available stock (${availableStock})`,
        );
      }
    }

    // 6. Restore previous stock usage and apply new usage
    const bulkOperations = [];

    // First, restore the old quantities
    for (const oldRecipe of existingDietPlan.recipes) {
      bulkOperations.push({
        updateOne: {
          filter: { _id: oldRecipe.feed, isDeleted: { $ne: true } },
          update: {
            $inc: {
              remainingStock: oldRecipe.quantity,
              usedStock: -oldRecipe.quantity,
            },
          },
        },
      });
    }

    // Then, apply the new quantities
    for (const newRecipe of processedRecipes) {
      bulkOperations.push({
        updateOne: {
          filter: { _id: newRecipe.feed, isDeleted: { $ne: true } },
          update: {
            $inc: {
              remainingStock: -newRecipe.quantity,
              usedStock: newRecipe.quantity,
            },
          },
        },
      });
    }

    await this.feedInventoryModel.bulkWrite(bulkOperations);

    // 7. Update the diet plan
    const updatedDietPlan = await this.dietPlanModel
      .findByIdAndUpdate(
        dietPlanId,
        {
          startTime: updateDietPlanDto.startTime,
          endTime: updateDietPlanDto.endTime,
          noOfTimesPerDay: updateDietPlanDto.noOfTimesPerDay,
          careTaker: careTaker._id,
          recipes: processedRecipes,
        },
        { new: true },
      )
      .populate(['animal', 'careTaker', 'recipes.feed']);

    const transformedDietPlan = {
      ...updatedDietPlan.toObject(),
      id: updatedDietPlan._id.toString(),
    } as any as AnimalDietPlanPublic;

    return transformedDietPlan;
  }
}
