import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateDietPlanDto } from './diet-plan.dto';
import { CreateAnimalDietPlanUseCase } from './usecases/create-animal-diet-plan.usecase';
import { GetAnimalDietPlanUseCase } from './usecases/get-animal-diet-plan.usecase';
import { GetAllDietPlans } from './usecases/get-all-diet-plans.usecase';

@Controller('animals/:animalId/diet-plan')
export class AnimalDietPlanController {
  constructor(
    private readonly createAnimalDietPlanUC: CreateAnimalDietPlanUseCase,
    private readonly getAnimalDietPlanUC: GetAnimalDietPlanUseCase,
  ) {}

  @Post()
  async createDietPlan(
    @Param('animalId') animalId: string,
    @Body() createDietPlanDto: CreateDietPlanDto,
  ) {
    return await this.createAnimalDietPlanUC.execute(
      animalId,
      createDietPlanDto,
    );
  }

  @Get()
  async getAnimalDietPlan(@Param('animalId') animalId: string) {
    return await this.getAnimalDietPlanUC.execute(animalId);
  }
}

@Controller('/diet-plan')
export class DietPlanController {
  constructor(private readonly getAllDietPlansUC: GetAllDietPlans) {}
  @Get()
  async getAllDietPlans() {
    return this.getAllDietPlansUC.execute();
  }
}
