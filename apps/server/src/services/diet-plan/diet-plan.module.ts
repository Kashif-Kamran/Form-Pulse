import { Module } from '@nestjs/common';
import {
  AnimalDietPlanController,
  DietPlanController,
} from './diet-plan.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CreateAnimalDietPlanUseCase } from './usecases/create-animal-diet-plan.usecase';
import { GetAnimalDietPlanUseCase } from './usecases/get-animal-diet-plan.usecase';
import { GetAllDietPlans } from './usecases/get-all-diet-plans.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [DietPlanController, AnimalDietPlanController],
  providers: [
    CreateAnimalDietPlanUseCase,
    GetAnimalDietPlanUseCase,
    GetAllDietPlans,
  ],
})
export class DietPlanModule {}
