import { Controller, Get } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { GetSpeciesDistributionUseCase } from './usecases/get-species-distribution.usecase';
import { GetAgeDistributionUseCase } from './usecases/get-age-distribution.usecase';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly getSpeciesDistributionUseCase: GetSpeciesDistributionUseCase,
    private readonly getAgeDistributionUseCase: GetAgeDistributionUseCase,
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
}
