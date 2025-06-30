import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { DashboardController } from './dashboard.controller';
import { GetSpeciesDistributionUseCase } from './usecases/get-species-distribution.usecase';
import { GetAgeDistributionUseCase } from './usecases/get-age-distribution.usecase';
import { GetVaccinationStatusUseCase } from './usecases/get-vaccination-status.usecase';
import { GetTopVaccinesUseCase } from './usecases/get-top-vaccines.usecase';
import { GetHealthAlertsUseCase } from './usecases/get-health-alerts.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [DashboardController],
  providers: [
    GetSpeciesDistributionUseCase, 
    GetAgeDistributionUseCase,
    GetVaccinationStatusUseCase,
    GetTopVaccinesUseCase,
    GetHealthAlertsUseCase,
  ],
})
export class DashboardModule {}
