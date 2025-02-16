import { IsNotEmpty, IsNumber, Length } from 'class-validator';
import { IAnimal } from 'src/domain';

export class CreateAnimalRequestDto implements Partial<Omit<IAnimal, '_id'>> {
  @IsNotEmpty()
  @Length(3, 30)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  breed: string;

  @IsNotEmpty()
  healthStatus: string;

  @IsNotEmpty()
  medicalHistory: string;

  @IsNumber()
  weight?: number;

  @Length(3, 12)
  activityLevel: string;

  @Length(5, 100)
  specialDietRequirement: string;

  @Length(3, 10)
  species: string;
}
