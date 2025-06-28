import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { CreateAnimalDietPlanUseCase } from '../diet-plan/usecases/create-animal-diet-plan.usecase';
import {
  CreateAnimalHealthRecordDto,
  CreateAnimalHealthRecordUseCase,
} from './usecase/create-animal-health-record.usecase';
import { GetAnimalListUseCase } from './usecase/get-animal-health-list.usecase';
import { GetAnimalHealthRecordsList } from './usecase/get-animal-health-records.usecase';
import {
  UpdateHealthRecordStatusUseCase,
  UpdateStatusDto,
} from './usecase/update-health-record-status.usecase';
import { GetHealthRecordByIdUseCase } from './usecase/get-health-record-by-id.usecase';
import { UpdateHealthRecordUseCase } from './usecase/update-health-record.usecase';
import { MongooseIdValidationPipe } from 'src/common/interceptors/pipes/is-mongoose-object-id.pipe';
import { Request } from 'express';

@Controller('animal-health-record')
export class AnimalHealthRecordController {
  constructor(
    private readonly createAnimalHealthRecordUC: CreateAnimalHealthRecordUseCase,
    private readonly getAnimalHealthList: GetAnimalListUseCase,
    private readonly getHealthRecordsByAnimal: GetAnimalHealthRecordsList,
    private readonly updateHealthRecordStatusUC: UpdateHealthRecordStatusUseCase,
    private readonly getHealthRecordByIdUC: GetHealthRecordByIdUseCase,
    private readonly updateHealthRecordUC: UpdateHealthRecordUseCase,
  ) {}

  @Post()
  async createRecord(@Body() dto: CreateAnimalHealthRecordDto) {
    return this.createAnimalHealthRecordUC.execute(dto);
  }

  @Get()
  async getAllRecords() {
    return this.getAnimalHealthList.execute();
  }

  @Get('animal/:animalId')
  async getAllRecordsByAnimal(@Param('animalId') animalId: string) {
    return this.getHealthRecordsByAnimal.execute(animalId);
  }

  @Get('record/:recordId')
  async getHealthRecordById(@Param('recordId', MongooseIdValidationPipe) recordId: string) {
    return this.getHealthRecordByIdUC.execute(recordId);
  }

  @Patch(':recordId')
  async updateHealthRecord(
    @Param('recordId', MongooseIdValidationPipe) recordId: string,
    @Body() dto: CreateAnimalHealthRecordDto,
  ) {
    return this.updateHealthRecordUC.execute(recordId, dto);
  }

  @Patch(':recordId/schedule/:scheduleId')
  async updateHealthRecordStatus(
    @Param('recordId', MongooseIdValidationPipe) recordId: string,
    @Param('scheduleId', MongooseIdValidationPipe) scheduleId: string,
    @Body() updateStatusDto: UpdateStatusDto,
    @Req() request: Request,
  ) {
    const loggedInUser = request.user!;
    return this.updateHealthRecordStatusUC.execute(
      recordId,
      scheduleId,
      updateStatusDto,
      loggedInUser,
    );
  }
}
