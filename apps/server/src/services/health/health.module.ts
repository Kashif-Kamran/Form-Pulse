import { Module } from '@nestjs/common';
import { VaccineController } from './vaccine.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CreateVaccineUseCase } from './usecase/create-vaccine.usecase';
import { GetVaccinationListUseCase } from './usecase/get-vaccination-list.usecase';
import { CreateAnimalHealthRecordUseCase } from './usecase/create-animal-health-record.usecase';
import { AnimalHealthRecordController } from './health-record.controller';
import { GetAnimalListUseCase } from './usecase/get-animal-health-list.usecase';
import { GetAnimalHealthRecordsList } from './usecase/get-animal-health-records.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [VaccineController, AnimalHealthRecordController],

  providers: [
    CreateVaccineUseCase,
    GetVaccinationListUseCase,
    CreateAnimalHealthRecordUseCase,
    GetAnimalListUseCase,
    GetAnimalHealthRecordsList,
  ],
})
export class HealthModule {}
