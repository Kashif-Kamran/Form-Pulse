import { Body, Controller, Get, Post, Patch, Param, Query } from '@nestjs/common';
import { CreateFeedItemUseCase } from './usecases/create-feed-item.usecase';
import { UpdateFeedInventoryUseCase } from './usecases/update-feed-inventory.usecase';
import { CreateFeedItemDto } from './feed-ingentory.dtos';
import { ListFeedInventoryUseCase } from './usecases/list-feed-inventory.usecase';

@Controller('feed-inventory')
export class FeedInventoryController {
  constructor(
    private readonly createFeedItemUC: CreateFeedItemUseCase,
    private readonly updateFeedInventoryUC: UpdateFeedInventoryUseCase,
    private readonly listFeedInventoryUC: ListFeedInventoryUseCase,
  ) {}

  @Post()
  async createInventoryItem(@Body() createFeedItemDto: CreateFeedItemDto) {
    return this.createFeedItemUC.execute(createFeedItemDto);
  }

  @Get()
  async getInventoryList(@Query('q') searchQuery: string) {
    return this.listFeedInventoryUC.execute(searchQuery);
  }

  @Patch(':feedInventoryId')
  async updateInventoryItem(
    @Param('feedInventoryId') feedInventoryId: string,
    @Body() updateFeedItemDto: CreateFeedItemDto,
  ) {
    return this.updateFeedInventoryUC.execute(feedInventoryId, updateFeedItemDto);
  }
}
