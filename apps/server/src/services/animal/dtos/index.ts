import { CreateAnimalReq } from '@repo/shared';
import { IsNotEmpty, IsNumber, Length } from 'class-validator';

export class CreateAnimalDto implements CreateAnimalReq {
  @IsNotEmpty()
  @Length(3, 30)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  breed: string;

  @IsNumber()
  weight: number;

  @Length(3, 10)
  species: string;
}
