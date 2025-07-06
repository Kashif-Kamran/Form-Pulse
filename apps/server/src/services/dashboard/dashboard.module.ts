import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { DashboardController } from './dashboard.controller';
import { GetSpeciesDistributionUseCase } from './usecases/get-species-distribution.usecase';
import { GetAgeDistributionUseCase } from './usecases/get-age-distribution.usecase';
import { GetVaccinationStatusUseCase } from './usecases/get-vaccination-status.usecase';
import { GetTopVaccinesUseCase } from './usecases/get-top-vaccines.usecase';
import { GetHealthAlertsUseCase } from './usecases/get-health-alerts.usecase';
import { GetFeedStockLevelsUseCase } from './usecases/get-feed-stock-levels.usecase';
import { GetFeedUsageUseCase } from './usecases/get-feed-usage.usecase';
import { GetDietPlansStatusUseCase } from './usecases/get-diet-plans-status.usecase';
import { GetUserRolesUseCase } from './usecases/get-user-roles.usecase';
import { GetVerificationStatusUseCase } from './usecases/get-verification-status.usecase';
import { GetActivityUseCase } from './usecases/get-activity.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [DashboardController],
  providers: [
    GetSpeciesDistributionUseCase, 
    GetAgeDistributionUseCase,
    GetVaccinationStatusUseCase,
    GetTopVaccinesUseCase,
    GetHealthAlertsUseCase,
    GetFeedStockLevelsUseCase,
    GetFeedUsageUseCase,
    GetDietPlansStatusUseCase,
    GetUserRolesUseCase,
    GetVerificationStatusUseCase,
    GetActivityUseCase,
  ],
})
export class DashboardModule {}
