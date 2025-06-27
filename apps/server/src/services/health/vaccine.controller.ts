import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateVaccineDto, PopulateVaccineDto } from './vaccine.dto';
import { CreateVaccineUseCase } from './usecase/create-vaccine.usecase';
import {
  GetVaccinationListQueryDto,
  GetVaccinationListUseCase,
} from './usecase/get-vaccination-list.usecase';
import { Public } from '../auth/decorators/public.decorator';
import { PopulateVaccines } from './usecase/populate-vaccines.usecase';

@Controller('/vaccine')
export class VaccineController {
  constructor(
    private readonly createVaccineUC: CreateVaccineUseCase,
    private readonly getVaccinationListUC: GetVaccinationListUseCase,
    private readonly populateVaccine: PopulateVaccines,
  ) {}
  @Post('/')
  async createVaccine(@Body() createVaccineDto: CreateVaccineDto) {
    return this.createVaccineUC.execute(createVaccineDto);
  }

  @Get('/list')
  async getVaccinationList(@Query() queryDto: GetVaccinationListQueryDto) {
    return this.getVaccinationListUC.execute(queryDto);
  }

  @Post('/populate')
  @Public()
  async populateVaccines(@Body() dto: PopulateVaccineDto) {
    return this.populateVaccine.execute(dto);
  }
}
