import { Body, Controller, Post } from '@nestjs/common';
import { CreateAnimalDietPlanUseCase } from '../diet-plan/usecases/create-animal-diet-plan.usecase';
import {
  CreateAnimalHealthRecordDto,
  CreateAnimalHealthRecordUseCase,
} from './usecase/create-animal-health-record.usecase';

@Controller('animal-health-record')
export class AnimalHealthRecordController {
  constructor(
    private readonly createAnimalHealthRecordUC: CreateAnimalHealthRecordUseCase,
  ) {}

  @Post()
  async createRecord(@Body() dto: CreateAnimalHealthRecordDto) {
    return this.createAnimalHealthRecordUC.execute(dto);
  }
}
