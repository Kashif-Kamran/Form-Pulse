import { Module } from '@nestjs/common';
import { AnimalController } from './animal.controller';
import { CreateAnimalUseCase } from './usecases/create-animal.usecase';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AnimalController],
  providers: [CreateAnimalUseCase],
})
export class AnimalModule {}
