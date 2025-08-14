import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateAnimalDto } from './dtos';
import { CreateAnimalUseCase } from './usecases/create-animal.usecase';
import { ListAnimalsUseCase } from './usecases/list-animals.usecase';
import { GETAnimalByIdUsecase } from './usecases/get-animal-by-id.usecase';
import { DeleteAnimalByIdUseCase } from './usecases/delete-animal-by-id.usecase';
import { UpdateAnimalUseCase } from './usecases/update-animal.usecase';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RolesAllowed } from '../auth/decorators/roles-allowed.decorator';
import { RoleType } from '@repo/shared';

@Controller('animals')
export class AnimalController {
  constructor(
    private readonly createAnimalUseCase: CreateAnimalUseCase,
    private readonly listAnimalsUseCase: ListAnimalsUseCase,
    private readonly getAnimalByIdUseCase: GETAnimalByIdUsecase,
    private readonly deleteAnimalByIdUseCase: DeleteAnimalByIdUseCase,
    private readonly updateAnimalUseCase: UpdateAnimalUseCase,
  ) {}

  @Get()
  async getAllAnimals(@Query('q') queryString?: string) {
    return this.listAnimalsUseCase.execute(queryString);
  }

  @Post()
  @UseGuards(RolesGuard)
  @RolesAllowed(RoleType.SuperAdmin, RoleType.Admin, RoleType.CareTaker)
  async createAnimal(@Body() createAnimalDto: CreateAnimalDto) {
    return this.createAnimalUseCase.execute(createAnimalDto);
  }

  @Get(':animalId')
  async getAnimalById(@Param('animalId') animalId: string) {
    return this.getAnimalByIdUseCase.execute(animalId);
  }

  @Put(':animalId')
  @UseGuards(RolesGuard)
  @RolesAllowed(RoleType.SuperAdmin, RoleType.Admin, RoleType.CareTaker)
  async updateAnimal(
    @Param('animalId') animalId: string,
    @Body() updateAnimalDto: CreateAnimalDto,
  ) {
    return this.updateAnimalUseCase.execute(animalId, updateAnimalDto);
  }

  @Delete(':animalId')
  @UseGuards(RolesGuard)
  @RolesAllowed(RoleType.SuperAdmin, RoleType.Admin)
  async deleteAnimalById(@Param('animalId') animalId: string) {
    console.log('🗑️ Soft Delete Animal and Related Records');
    return this.deleteAnimalByIdUseCase.execute(animalId);
  }
}
