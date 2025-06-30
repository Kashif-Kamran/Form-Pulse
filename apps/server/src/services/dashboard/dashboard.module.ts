import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { DashboardController } from './dashboard.controller';
import { GetSpeciesDistributionUseCase } from './usecases/get-species-distribution.usecase';
import { GetAgeDistributionUseCase } from './usecases/get-age-distribution.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [DashboardController],
  providers: [GetSpeciesDistributionUseCase, GetAgeDistributionUseCase],
})
export class DashboardModule {}
