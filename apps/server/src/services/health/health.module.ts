import { Module } from '@nestjs/common';
import { VaccineController } from './vaccine.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CreateVaccineUseCase } from './usecase/create-vaccine.usecase';
import { GetVaccinationListUseCase } from './usecase/get-vaccination-list.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [VaccineController],
  providers: [CreateVaccineUseCase, GetVaccinationListUseCase],
})
export class HealthModule {}
