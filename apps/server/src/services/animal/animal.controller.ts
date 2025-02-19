import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { CreateAnimalRequestDto } from './dtos';
import { CreateAnimalUseCase } from './usecases/create-animal.usecase';

@Controller('animals')
export class AnimalController {
  constructor(private readonly createAnimalUseCase: CreateAnimalUseCase) {}

  @Get()
  async getAllAnimals() {
    // return this.getAllAnimalsUseCase.execute();
  }

  @Post()
  async createAnimal(@Body() createAnimalDto: CreateAnimalRequestDto) {
    return this.createAnimalUseCase.execute(createAnimalDto);
  }

  @Get(':id')
  async getAnimalById() {
    // return this.getAnimalByIdUseCase.execute();
  }

  @Put(':id')
  async updateAnimal() {
    // return this.updateAnimalUseCase.execute();
  }
}
