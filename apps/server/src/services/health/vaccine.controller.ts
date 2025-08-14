import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateVaccineDto, PopulateVaccineDto } from './vaccine.dto';
import { CreateVaccineUseCase } from './usecase/create-vaccine.usecase';
import {
  GetVaccinationListQueryDto,
  GetVaccinationListUseCase,
} from './usecase/get-vaccination-list.usecase';
import { Public } from '../auth/decorators/public.decorator';
import { PopulateVaccines } from './usecase/populate-vaccines.usecase';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RolesAllowed } from '../auth/decorators/roles-allowed.decorator';
import { RoleType } from '@repo/shared';

@Controller('/vaccine')
export class VaccineController {
  constructor(
    private readonly createVaccineUC: CreateVaccineUseCase,
    private readonly getVaccinationListUC: GetVaccinationListUseCase,
    private readonly populateVaccine: PopulateVaccines,
  ) {}
  @Post('/')
  @UseGuards(RolesGuard)
  @RolesAllowed(RoleType.SuperAdmin, RoleType.Admin, RoleType.Veterinarian)
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
