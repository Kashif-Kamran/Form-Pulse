import { Module } from '@nestjs/common';
import {
  AnimalDietPlanController,
  DietPlanController,
} from './diet-plan.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CreateAnimalDietPlanUseCase } from './usecases/create-animal-diet-plan.usecase';
import { GetAnimalDietPlanUseCase } from './usecases/get-animal-diet-plan.usecase';
import { GetAllDietPlans } from './usecases/get-all-diet-plans.usecase';
import { GetDietPlanByIdUseCase } from './usecases/get-diet-plan-by-id.usecase';
import { UpdateDietPlanUseCase } from './usecases/update-diet-plan.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [DietPlanController, AnimalDietPlanController],
  providers: [
    CreateAnimalDietPlanUseCase,
    GetAnimalDietPlanUseCase,
    GetAllDietPlans,
    GetDietPlanByIdUseCase,
    UpdateDietPlanUseCase,
  ],
})
export class DietPlanModule {}
