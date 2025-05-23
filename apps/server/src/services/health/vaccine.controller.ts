import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateVaccineDto } from './vaccine.dto';
import { CreateVaccineUseCase } from './usecase/create-vaccine.usecase';
import { GetVaccinationListUseCase } from './usecase/get-vaccination-list.usecase';
import { VaccineTypes } from '@repo/shared/dist/cjs/types/enum.types';

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

  @Get('/')
  async getVaccinationList() {
    return this.getVaccinationListUC.execute();
  }

  @Get('/')
  async getVaccinationListByType(@Param() type: VaccineTypes) {}
}
