import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateAnimalDietPlanUseCase } from '../diet-plan/usecases/create-animal-diet-plan.usecase';
import {
  CreateAnimalHealthRecordDto,
  CreateAnimalHealthRecordUseCase,
} from './usecase/create-animal-health-record.usecase';
import { GetAnimalListUseCase } from './usecase/get-animal-health-list.usecase';
import { GetAnimalHealthRecordsList } from './usecase/get-animal-health-records.usecase';

@Controller('animal-health-record')
export class AnimalHealthRecordController {
  constructor(
    private readonly createAnimalHealthRecordUC: CreateAnimalHealthRecordUseCase,
    private readonly getAnimalHealthList: GetAnimalListUseCase,
    private readonly getHealthRecordsByAnimal: GetAnimalHealthRecordsList,
  ) {}

  @Post()
  async createRecord(@Body() dto: CreateAnimalHealthRecordDto) {
    return this.createAnimalHealthRecordUC.execute(dto);
  }

  @Get()
  async getAllRecords() {
    return this.getAnimalHealthList.execute();
  }

  @Get(':animalId')
  async getAllRecordsByAnimal(@Param('animalId') animalId: string) {
    return this.getHealthRecordsByAnimal.execute(animalId);
  }
}
