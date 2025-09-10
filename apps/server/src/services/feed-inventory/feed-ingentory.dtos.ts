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

  @IsOptional()
  @IsString()
  description?: string;
}
