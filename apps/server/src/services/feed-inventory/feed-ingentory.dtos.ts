import { CreateNewFeedItemReq } from '@repo/shared';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

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
}
