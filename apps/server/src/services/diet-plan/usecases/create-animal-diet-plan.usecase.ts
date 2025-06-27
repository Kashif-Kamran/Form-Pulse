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
import { CreateAnimalDietPlanResponse, RoleType } from '@repo/shared';
import * as moment from 'moment';

type ProcessedRecipe = {
  feed: string;
  perTimeQuantity: number;
  quantity: number;
};

@Injectable()
export class CreateAnimalDietPlanUseCase {
  constructor(
    @InjectModel('DietPlan') private readonly dietPlanModel: DietPlanModel,
    @InjectModel('Animal') private readonly animalModel: AnimalModel,
    @InjectModel('FeedInventory')
    private readonly feedInventoryModel: FeedInventoryModel,
    @InjectModel('User')
    private readonly userModel: UserModel,
  ) {}
  async execute(
    animalId: string,
    createDietPlanDto: CreateDietPlanDto,
  ): Promise<CreateAnimalDietPlanResponse> {
    // 1. Check if animal exists
    const animal = await this.animalModel.findOne({ _id: animalId });
    if (!animal) throw new NotFoundException('Animal not found');

    const careTaker = await this.userModel.findOne({
      _id: createDietPlanDto.careTaker,
      role: RoleType.CareTaker,
    });

    if (!careTaker) throw new NotFoundException('Care Taker Not Found');

    // 2. Fetch and validate feed items
    const feedIds = createDietPlanDto.recipes.map((recipe) => recipe.feed);
    const feedItems = await this.feedInventoryModel.find({
      _id: { $in: feedIds },
    });

    if (feedItems.length !== feedIds.length) {
      throw new BadRequestException(
        'Some feed items are not available in the inventory',
      );
    }

    const totalNumberOfDays =
      moment(createDietPlanDto.endTime)
        .endOf('day')
        .diff(moment(createDietPlanDto.startTime).startOf('day'), 'days') + 1;

    const processedRecipes: ProcessedRecipe[] = createDietPlanDto.recipes.map(
      (recipe) => {
        const quantity = Number(
          (
            recipe.perTimeQuantity *
            createDietPlanDto.noOfTimesPerDay *
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

    // 5. Validate feed stock
    for (const recipe of processedRecipes) {
      const feedItem = feedItems.find(
        (item) => item._id.toString() === recipe.feed,
      );
      if (!feedItem) continue;

      if (recipe.quantity > feedItem.remainingStock) {
        throw new BadRequestException(
          `Requested quantity (${recipe.quantity}) for feed item ${recipe.feed} exceeds available stock (${feedItem.remainingStock})`,
        );
      }
    }

    // 6. Update feed inventory
    const bulkOperations = processedRecipes.map((recipe) => ({
      updateOne: {
        filter: { _id: recipe.feed },
        update: {
          $inc: {
            remainingStock: -recipe.quantity,
            usedStock: recipe.quantity,
          },
        },
      },
    }));

    await this.feedInventoryModel.bulkWrite(bulkOperations);

    // 7. Save the diet plan
    const creationResponse = await this.dietPlanModel.create({
      startTime: createDietPlanDto.startTime,
      endTime: createDietPlanDto.endTime,
      noOfTimesPerDay: createDietPlanDto.noOfTimesPerDay,
      careTaker: careTaker._id,
      animal: animal._id,
      recipes: processedRecipes,
    });
    return creationResponse;
  }
}
