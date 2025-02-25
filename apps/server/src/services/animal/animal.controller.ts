import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { CreateAnimalDto } from './dtos';
import { CreateAnimalUseCase } from './usecases/create-animal.usecase';
import { ListAnimalsUseCase } from './usecases/list-animals.usecase';

@Controller('animals')
export class AnimalController {
  constructor(
    private readonly createAnimalUseCase: CreateAnimalUseCase,
    private readonly listAnimalsUseCase: ListAnimalsUseCase,
  ) {}

  @Get()
  async getAllAnimals() {
    return this.listAnimalsUseCase.execute();
  }

  @Post()
  async createAnimal(@Body() createAnimalDto: CreateAnimalDto) {
    return this.createAnimalUseCase.execute(createAnimalDto);
  }
}
