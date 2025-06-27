import {
  IsNotEmpty,
  IsDate,
  IsArray,
  ValidateNested,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDietPlanReq } from '@repo/shared';

class RecipeDto {
  @IsNotEmpty()
  feed: string;

  @IsNumber()
  @Min(0.1)
  @IsNotEmpty()
  perTimeQuantity: number;
}

export class CreateDietPlanDto implements CreateDietPlanReq {
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  startTime: Date;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  endTime: Date;

  @IsNumber()
  @Min(0.1)
  @IsNotEmpty()
  noOfTimesPerDay: number;

  @IsNotEmpty()
  careTaker: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RecipeDto)
  recipes: RecipeDto[];
}
