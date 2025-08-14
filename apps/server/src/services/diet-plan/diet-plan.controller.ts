import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateDietPlanDto } from './diet-plan.dto';
import { CreateAnimalDietPlanUseCase } from './usecases/create-animal-diet-plan.usecase';
import { GetAnimalDietPlanUseCase } from './usecases/get-animal-diet-plan.usecase';
import { GetAllDietPlans } from './usecases/get-all-diet-plans.usecase';
import { GetDietPlanByIdUseCase } from './usecases/get-diet-plan-by-id.usecase';
import { UpdateDietPlanUseCase } from './usecases/update-diet-plan.usecase';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RolesAllowed } from '../auth/decorators/roles-allowed.decorator';
import { RoleType } from '@repo/shared';
import { Request } from 'express';

/// Controller # 1
@Controller('animals/:animalId/diet-plan')
export class AnimalDietPlanController {
  constructor(
    private readonly createAnimalDietPlanUC: CreateAnimalDietPlanUseCase,
    private readonly getAnimalDietPlanUC: GetAnimalDietPlanUseCase,
  ) {}

  @Post()
  @UseGuards(RolesGuard)
  @RolesAllowed(RoleType.SuperAdmin, RoleType.Admin, RoleType.Nutritionist)
  async createDietPlan(
    @Param('animalId')
    animalId: string,
    @Body() createDietPlanDto: CreateDietPlanDto,
  ) {
    return await this.createAnimalDietPlanUC.execute(
      animalId,
      createDietPlanDto,
    );
  }

  @Get()
  async getAnimalDietPlan(@Param('animalId') animalId: string) {
    return await this.getAnimalDietPlanUC.execute(animalId);
  }
}

// Controller # 2
@Controller('/diet-plan')
export class DietPlanController {
  constructor(
    private readonly getAllDietPlansUC: GetAllDietPlans,
    private readonly getDietPlanByIdUC: GetDietPlanByIdUseCase,
    private readonly updateDietPlanUC: UpdateDietPlanUseCase,
  ) {}

  @Get()
  async getAllDietPlans(@Req() request: Request) {
    const user = request.user!;
    return this.getAllDietPlansUC.execute(user);
  }

  @Get(':dietPlanId')
  async getDietPlanById(@Param('dietPlanId') dietPlanId: string) {
    console.log('Diet Plan Id :', dietPlanId);
    return await this.getDietPlanByIdUC.execute(dietPlanId);
  }

  @Patch(':dietPlanId')
  @UseGuards(RolesGuard)
  @RolesAllowed(RoleType.SuperAdmin, RoleType.Admin, RoleType.Nutritionist)
  async updateDietPlan(
    @Param('dietPlanId') dietPlanId: string,
    @Body() updateDietPlanDto: CreateDietPlanDto,
  ) {
    return await this.updateDietPlanUC.execute(dietPlanId, updateDietPlanDto);
  }
}
