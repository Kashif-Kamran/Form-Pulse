import { Module } from '@nestjs/common';
import { AnimalController } from './animal.controller';
import { CreateAnimalUseCase } from './usecases/create-animal.usecase';
import { DatabaseModule } from 'src/database/database.module';
import { ListAnimalsUseCase } from './usecases/list-animals.usecase';
import { GETAnimalByIdUsecase } from './usecases/get-animal-by-id.usecase';
import { DeleteAnimalByIdUseCase } from './usecases/delete-animal-by-id.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [AnimalController],
  providers: [
    CreateAnimalUseCase,
    ListAnimalsUseCase,
    GETAnimalByIdUsecase,
    DeleteAnimalByIdUseCase,
  ],
})
export class AnimalModule {}
