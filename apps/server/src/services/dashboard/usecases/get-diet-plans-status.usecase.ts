import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DietPlansStatusResponse } from '@repo/shared';
import { PipelineStage } from 'mongoose';
import { AnimalModel } from 'src/database/models/animal.model';
import { DietPlanModel } from 'src/database/models/diet-plan.model';

@Injectable()
export class GetDietPlansStatusUseCase {
  private readonly logger = new Logger(GetDietPlansStatusUseCase.name);

  constructor(
    @InjectModel('Animal')
    private readonly animalModel: AnimalModel,
    @InjectModel('DietPlan')
    private readonly dietPlanModel: DietPlanModel,
  ) {}

  async execute(): Promise<DietPlansStatusResponse> {
    this.logger.log('Fetching diet plans status');

    // Get total number of animals
    const totalAnimals = await this.animalModel.countDocuments();

    // Get animals with active diet plans
    const currentDate = new Date();
    const animalsWithDietPlans = await this.dietPlanModel.distinct('animal', {
      startTime: { $lte: currentDate },
      endTime: { $gte: currentDate },
    });

    const withDietPlan = animalsWithDietPlans.length;
    const withoutDietPlan = totalAnimals - withDietPlan;

    const data = [
      {
        status: 'with_diet_plan' as const,
        count: withDietPlan,
        percentage: totalAnimals > 0 ? Math.round((withDietPlan / totalAnimals) * 100) : 0,
      },
      {
        status: 'without_diet_plan' as const,
        count: withoutDietPlan,
        percentage: totalAnimals > 0 ? Math.round((withoutDietPlan / totalAnimals) * 100) : 0,
      },
    ];

    const compliance = totalAnimals > 0 ? Math.round((withDietPlan / totalAnimals) * 100) : 0;

    return {
      success: true,
      data: {
        data,
        total: totalAnimals,
        compliance,
      },
    };
  }
}
