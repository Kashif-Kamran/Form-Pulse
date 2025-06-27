import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  AnimalDietPlanListResponse,
  IAnimal,
  IUser,
  RoleType,
} from '@repo/shared';
import { DietPlanModel } from 'src/database/models/diet-plan.model';

@Injectable()
export class GetAllDietPlans {
  constructor(
    @InjectModel('DietPlan') private readonly dietPlanModel: DietPlanModel,
  ) {}

  async execute(_user: IUser): Promise<AnimalDietPlanListResponse> {
    const animalDietPlans = await this.dietPlanModel
      .find()
      .populate(['animal']);
    const transformedDietPlans = animalDietPlans.map((dietPlan) => ({
      ...dietPlan.toObject(),
      id: dietPlan._id.toString(),
      animal: dietPlan.animal as unknown as IAnimal,
    })) as any as AnimalDietPlanListResponse['results'];

    return {
      count: transformedDietPlans.length,
      results: transformedDietPlans,
    };
  }
}
