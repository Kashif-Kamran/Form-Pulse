import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
  Request,
  HttpCode,
} from '@nestjs/common';
import {
  CreateNotificationDto,
  UpdateNotificationStatusDto,
  GetNotificationsQueryDto,
} from './dtos';
import { CreateNotificationUseCase } from './usecases/create-notification.usecase';
import { GetNotificationsUseCase } from './usecases/get-notifications.usecase';
import { GetNotificationByIdUseCase } from './usecases/get-notification-by-id.usecase';
import { UpdateNotificationStatusUseCase } from './usecases/update-notification-status.usecase';
import { MarkAsReadUseCase } from './usecases/mark-as-read.usecase';
import { IUser } from '@repo/shared';

@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly createNotificationUseCase: CreateNotificationUseCase,
    private readonly getNotificationsUseCase: GetNotificationsUseCase,
    private readonly getNotificationByIdUseCase: GetNotificationByIdUseCase,
    private readonly updateNotificationStatusUseCase: UpdateNotificationStatusUseCase,
    private readonly markAsReadUseCase: MarkAsReadUseCase,
  ) {}

  @Get()
  async getNotifications(
    @Request() request: any,
    @Query() query: GetNotificationsQueryDto,
  ) {
    const user = request.user;
    return this.getNotificationsUseCase.execute(user, query);
  }

  @Get(':id')
  @HttpCode(200)
  async getNotificationById(
    @Param('id') notificationId: string,
    @Request() request: any,
  ) {
    const user = request.user;
    return this.getNotificationByIdUseCase.execute(notificationId, user);
  }

  @Post()
  @HttpCode(201)
  async createNotification(
    @Request() request: any,
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
    const sender = request.user;
    return this.createNotificationUseCase.execute(
      sender,
      createNotificationDto,
    );
  }

  @Patch(':id/status')
  @HttpCode(200)
  async updateNotificationStatus(
    @Param('id') notificationId: string,
    @Request() request: any,
    @Body() updateStatusDto: UpdateNotificationStatusDto,
  ) {
    const user = request.user;
    console.log('User: ', user);
    return this.updateNotificationStatusUseCase.execute(
      notificationId,
      user,
      updateStatusDto,
    );
  }

  @Patch(':id/read')
  @HttpCode(200)
  async markAsRead(
    @Param('id') notificationId: string,
    @Request() request: any,
  ) {
    const user: IUser = request.user;
    return this.markAsReadUseCase.execute(notificationId, user);
  }
}
