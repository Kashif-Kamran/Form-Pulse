import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnimalDietPlanPublic, IAnimal, IUser } from '@repo/shared';
import { DietPlanModel } from 'src/database/models/diet-plan.model';

@Injectable()
export class GetDietPlanByIdUseCase {
  constructor(
    @InjectModel('DietPlan') private readonly dietPlanModel: DietPlanModel,
  ) {}

  async execute(dietPlanId: string): Promise<AnimalDietPlanPublic> {
    const dietPlan = await this.dietPlanModel
      .findById(dietPlanId)
      .populate(['animal', 'careTaker', 'recipes.feed']);

    if (!dietPlan) {
      throw new NotFoundException('Diet plan not found');
    }

    const transformedDietPlan = {
      ...dietPlan.toObject(),
      id: dietPlan._id.toString(),
      animal: dietPlan.animal as unknown as IAnimal,
      careTaker: dietPlan.careTaker as unknown as IUser,
    } as any as AnimalDietPlanPublic;

    return transformedDietPlan;
  }
}
