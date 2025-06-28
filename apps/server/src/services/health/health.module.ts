import { Module } from '@nestjs/common';
import { VaccineController } from './vaccine.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CreateVaccineUseCase } from './usecase/create-vaccine.usecase';
import { GetVaccinationListUseCase } from './usecase/get-vaccination-list.usecase';
import { CreateAnimalHealthRecordUseCase } from './usecase/create-animal-health-record.usecase';
import { AnimalHealthRecordController } from './health-record.controller';
import { GetAnimalListUseCase } from './usecase/get-animal-health-list.usecase';
import { GetAnimalHealthRecordsList } from './usecase/get-animal-health-records.usecase';
import { PopulateVaccines } from './usecase/populate-vaccines.usecase';
import { UpdateHealthRecordStatusUseCase } from './usecase/update-health-record-status.usecase';
import { GetHealthRecordByIdUseCase } from './usecase/get-health-record-by-id.usecase';
import { UpdateHealthRecordUseCase } from './usecase/update-health-record.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [VaccineController, AnimalHealthRecordController],

  providers: [
    CreateVaccineUseCase,
    GetVaccinationListUseCase,
    CreateAnimalHealthRecordUseCase,
    GetAnimalListUseCase,
    GetAnimalHealthRecordsList,
    PopulateVaccines,
    UpdateHealthRecordStatusUseCase,
    GetHealthRecordByIdUseCase,
    UpdateHealthRecordUseCase,
  ],
})
export class HealthModule {}
