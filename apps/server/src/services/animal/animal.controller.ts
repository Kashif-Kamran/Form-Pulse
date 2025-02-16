import { Body, Controller, Post } from '@nestjs/common';
import { CreateAnimalRequestDto } from './dtos';
import { CreateAnimalUseCase } from './usecases/create-animal.usecase';

@Controller('animals')
export class AnimalController {
  constructor(private readonly createAnimalUseCase: CreateAnimalUseCase) {}

  @Post()
  async createAnimal(@Body() createAnimalDto: CreateAnimalRequestDto) {
    return this.createAnimalUseCase.execute(createAnimalDto);
  }
}
