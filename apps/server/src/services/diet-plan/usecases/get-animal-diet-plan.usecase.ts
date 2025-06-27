import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  AnimalDietPlanListResponse,
  IAnimal,
  IUser,
  RoleType,
} from '@repo/shared';
import { Types } from 'mongoose';
import { DietPlanModel } from 'src/database/models/diet-plan.model';

@Injectable()
export class GetAnimalDietPlanUseCase {
  constructor(
    @InjectModel('DietPlan') private readonly dietPlanModel: DietPlanModel,
  ) {}

  async execute(animalId: string): Promise<AnimalDietPlanListResponse> {
    const animalDietPlans = await this.dietPlanModel
      .find({ animal: new Types.ObjectId(animalId) })
      .populate(['animal', 'careTaker', 'recipes.feed']);

    const transformedDietPlans = animalDietPlans.map((dietPlan) => ({
      ...dietPlan.toObject(),
      id: dietPlan._id.toString(),
      animal: dietPlan.animal as unknown as IAnimal,
      careTaker: dietPlan.careTaker,
    })) as any as AnimalDietPlanListResponse['results'];

    return {
      count: transformedDietPlans.length,
      results: transformedDietPlans,
    };
  }
}
