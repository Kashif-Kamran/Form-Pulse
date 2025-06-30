import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CreateFeedItemUseCase } from './usecases/create-feed-item.usecase';
import { UpdateFeedInventoryUseCase } from './usecases/update-feed-inventory.usecase';
import { FeedInventoryController } from './feed-inventory.controller';
import { ListFeedInventoryUseCase } from './usecases/list-feed-inventory.usecase';

@Module({
  imports: [DatabaseModule],
  providers: [
    CreateFeedItemUseCase,
    UpdateFeedInventoryUseCase,
    ListFeedInventoryUseCase,
  ],
  controllers: [FeedInventoryController],
})
export class FeedInventoryModule {}
