import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateAnimalDietPlanUseCase } from '../diet-plan/usecases/create-animal-diet-plan.usecase';
import {
  CreateAnimalHealthRecordDto,
  CreateAnimalHealthRecordUseCase,
} from './usecase/create-animal-health-record.usecase';
import { GetAnimalListUseCase } from './usecase/get-animal-health-list.usecase';

@Controller('animal-health-record')
export class AnimalHealthRecordController {
  constructor(
    private readonly createAnimalHealthRecordUC: CreateAnimalHealthRecordUseCase,
    private readonly getAnimalHealthList: GetAnimalListUseCase,
  ) {}

  @Post()
  async createRecord(@Body() dto: CreateAnimalHealthRecordDto) {
    return this.createAnimalHealthRecordUC.execute(dto);
  }

  @Get()
  async getAllRecords() {
    return this.getAnimalHealthList.execute();
  }
}
