import { Controller, Get } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
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

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly getSpeciesDistributionUseCase: GetSpeciesDistributionUseCase,
    private readonly getAgeDistributionUseCase: GetAgeDistributionUseCase,
    private readonly getVaccinationStatusUseCase: GetVaccinationStatusUseCase,
    private readonly getTopVaccinesUseCase: GetTopVaccinesUseCase,
    private readonly getHealthAlertsUseCase: GetHealthAlertsUseCase,
    private readonly getFeedStockLevelsUseCase: GetFeedStockLevelsUseCase,
    private readonly getFeedUsageUseCase: GetFeedUsageUseCase,
    private readonly getDietPlansStatusUseCase: GetDietPlansStatusUseCase,
    private readonly getUserRolesUseCase: GetUserRolesUseCase,
    private readonly getVerificationStatusUseCase: GetVerificationStatusUseCase,
    private readonly getActivityUseCase: GetActivityUseCase,
  ) {}

  @Public()
  @Get('species-distribution')
  async getSpeciesDistribution() {
    return this.getSpeciesDistributionUseCase.execute();
  }

  @Public()
  @Get('age-distribution')
  async getAgeDistribution() {
    return this.getAgeDistributionUseCase.execute();
  }

  @Public()
  @Get('vaccination-status')
  async getVaccinationStatus() {
    return this.getVaccinationStatusUseCase.execute();
  }

  @Public()
  @Get('top-vaccines')
  async getTopVaccines() {
    return this.getTopVaccinesUseCase.execute();
  }

  @Public()
  @Get('health-alerts')
  async getHealthAlerts() {
    return this.getHealthAlertsUseCase.execute();
  }

  @Public()
  @Get('feed-stock-levels')
  async getFeedStockLevels() {
    return this.getFeedStockLevelsUseCase.execute();
  }

  @Public()
  @Get('feed-usage')
  async getFeedUsage() {
    return this.getFeedUsageUseCase.execute();
  }

  @Public()
  @Get('diet-plans-status')
  async getDietPlansStatus() {
    return this.getDietPlansStatusUseCase.execute();
  }

  @Public()
  @Get('user-roles')
  async getUserRoles() {
    return this.getUserRolesUseCase.execute();
  }

  @Public()
  @Get('verification-status')
  async getVerificationStatus() {
    return this.getVerificationStatusUseCase.execute();
  }

  @Public()
  @Get('activity')
  async getActivity() {
    return this.getActivityUseCase.execute();
  }
}
