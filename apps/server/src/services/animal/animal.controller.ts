import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateAnimalDto } from './dtos';
import { CreateAnimalUseCase } from './usecases/create-animal.usecase';
import { ListAnimalsUseCase } from './usecases/list-animals.usecase';
import { GETAnimalByIdUsecase } from './usecases/get-animal-by-id.usecase';
import { DeleteAnimalByIdUseCase } from './usecases/delete-animal-by-id.usecase';

@Controller('animals')
export class AnimalController {
  constructor(
    private readonly createAnimalUseCase: CreateAnimalUseCase,
    private readonly listAnimalsUseCase: ListAnimalsUseCase,
    private readonly getAnimalByIdUseCase: GETAnimalByIdUsecase,
    private readonly deleteAnimalByIdUseCase: DeleteAnimalByIdUseCase,
  ) {}

  @Get()
  async getAllAnimals(@Query('q') queryString?: string) {
    return this.listAnimalsUseCase.execute(queryString);
  }

  @Post()
  async createAnimal(@Body() createAnimalDto: CreateAnimalDto) {
    return this.createAnimalUseCase.execute(createAnimalDto);
  }

  @Get(':animalId')
  async getAnimalById(@Param('animalId') animalId: string) {
    return this.getAnimalByIdUseCase.execute(animalId);
  }
  @Delete(':animalId')
  async deleteAnimalById(@Param('animalId') animalId: string) {
    console.log('❌ Delete Animal');
    return this.deleteAnimalByIdUseCase.execute(animalId);
  }
}
