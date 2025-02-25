import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateFeedItemUseCase } from './usecases/create-feed-item.usecase';
import { CreateFeedItemDto } from './feed-ingentory.dtos';
import { ListFeedInventoryUseCase } from './usecases/list-feed-inventory.usecase';

@Controller('feed-inventory')
export class FeedInventoryController {
  constructor(
    private readonly createFeedItemUC: CreateFeedItemUseCase,
    private readonly listFeedInventoryUC: ListFeedInventoryUseCase,
  ) {}

  @Post()
  async createInventoryItem(@Body() createFeedItemDto: CreateFeedItemDto) {
    return this.createFeedItemUC.execute(createFeedItemDto);
  }

  @Get()
  async getInventoryList() {
    return this.listFeedInventoryUC.execute();
  }
}
