import { Controller, Get } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { GetSpeciesDistributionUseCase } from './usecases/get-species-distribution.usecase';
import { GetAgeDistributionUseCase } from './usecases/get-age-distribution.usecase';
import { GetVaccinationStatusUseCase } from './usecases/get-vaccination-status.usecase';
import { GetTopVaccinesUseCase } from './usecases/get-top-vaccines.usecase';
import { GetHealthAlertsUseCase } from './usecases/get-health-alerts.usecase';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly getSpeciesDistributionUseCase: GetSpeciesDistributionUseCase,
    private readonly getAgeDistributionUseCase: GetAgeDistributionUseCase,
    private readonly getVaccinationStatusUseCase: GetVaccinationStatusUseCase,
    private readonly getTopVaccinesUseCase: GetTopVaccinesUseCase,
    private readonly getHealthAlertsUseCase: GetHealthAlertsUseCase,
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
}
