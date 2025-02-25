import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnimalModel } from 'src/database';
import { DietPlanModel } from 'src/database/models/diet-plan.model';
import { FeedInventoryModel } from 'src/database/models/feed-inventory.model';
import { CreateDietPlanDto } from '../diet-plan.dto';
import {
  AnimalDietPlanResponse,
  CreateAnimalDietPlanResponse,
} from '@repo/shared';

@Injectable()
export class CreateAnimalDietPlanUseCase {
  constructor(
    @InjectModel('DietPlan') private readonly dietPlanModel: DietPlanModel,
    @InjectModel('Animal') private readonly animalModel: AnimalModel,
    @InjectModel('FeedInventory')
    private readonly feedInventoryModel: FeedInventoryModel,
  ) {}
  async execute(
    animalId: string,
    createDietPlanDto: CreateDietPlanDto,
  ): Promise<CreateAnimalDietPlanResponse> {
    const animal = await await this.animalModel.findOne({ _id: animalId });
    if (!animal) throw new NotFoundException('Animal not found');
    const feedIds = createDietPlanDto.recipes.map((recepie) => recepie.feed);
    const feedItems = await this.feedInventoryModel.find({
      _id: { $in: feedIds },
    });
    if (feedItems.length !== feedIds.length) {
      throw new BadRequestException(
        'Some feed items are not available in the inventory',
      );
    }
    for (const recipe of createDietPlanDto.recipes) {
      const feedItem = feedItems.find(
        (item) => item._id.toString() === recipe.feed,
      );
      if (recipe.quantity > feedItem.availableQuantity) {
        throw new BadRequestException(
          `Requested quantity for feed item ${recipe.feed} exceeds available quantity`,
        );
      }
    }

    const bulkOperations = createDietPlanDto.recipes.map((recipe) => ({
      updateOne: {
        filter: { _id: recipe.feed },
        update: { $inc: { availableQuantity: -recipe.quantity } },
      },
    }));

    await this.feedInventoryModel.bulkWrite(bulkOperations);
    const creationResponse = await this.dietPlanModel.create({
      ...createDietPlanDto,
      animal: animal._id,
    });

    return creationResponse;
  }
}
