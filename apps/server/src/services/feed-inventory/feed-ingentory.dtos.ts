import { CreateNewFeedItemReq } from '@repo/shared';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  Max,
} from 'class-validator';

export class CreateFeedItemDto implements CreateNewFeedItemReq {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  totalQuentity: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  totalPrice: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  protein: number; // percentage

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  carbs: number; // percentage

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  fats: number; // percentage

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  fiber: number; // percentage

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  calories: number; // kcal/kg

  @IsOptional()
  @IsString()
  description?: string;
}
