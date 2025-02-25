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
  quantity: number;
}

export class CreateDietPlanDto implements CreateDietPlanReq {
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  startTime: Date;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  duration: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RecipeDto)
  recipes: RecipeDto[];
}
