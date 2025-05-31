import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateVaccineDto } from './vaccine.dto';
import { CreateVaccineUseCase } from './usecase/create-vaccine.usecase';
import {
  GetVaccinationListQueryDto,
  GetVaccinationListUseCase,
} from './usecase/get-vaccination-list.usecase';

@Controller('/vaccine')
export class VaccineController {
  constructor(
    private readonly createVaccineUC: CreateVaccineUseCase,
    private readonly getVaccinationListUC: GetVaccinationListUseCase,
  ) {}
  @Post('/')
  async createVaccine(@Body() createVaccineDto: CreateVaccineDto) {
    return this.createVaccineUC.execute(createVaccineDto);
  }

  @Get('/list')
  async getVaccinationList(@Query() queryDto: GetVaccinationListQueryDto) {
    return this.getVaccinationListUC.execute(queryDto);
  }
}
