import { Module } from '@nestjs/common';
import { DietPlanController } from './diet-plan.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CreateAnimalDietPlanUseCase } from './usecases/create-animal-diet-plan.usecase';
import { GetAnimalDietPlanUseCase } from './usecases/get-animal-diet-plan.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [DietPlanController],
  providers: [CreateAnimalDietPlanUseCase, GetAnimalDietPlanUseCase],
})
export class DietPlanModule {}
