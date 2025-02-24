import { CreateFeedInventoryItem } from '@repo/shared';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFeedItemDto implements CreateFeedInventoryItem {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  availableQuantity: number;

  @IsNumber()
  @IsNotEmpty()
  unitPrice: number;
}
