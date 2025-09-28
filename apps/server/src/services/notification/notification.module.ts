import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CreateNotificationUseCase } from './usecases/create-notification.usecase';
import { GetNotificationsUseCase } from './usecases/get-notifications.usecase';
import { UpdateNotificationStatusUseCase } from './usecases/update-notification-status.usecase';
import { MarkAsReadUseCase } from './usecases/mark-as-read.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [
    CreateNotificationUseCase,
    GetNotificationsUseCase,
    UpdateNotificationStatusUseCase,
    MarkAsReadUseCase,
  ],
  exports: [
    CreateNotificationUseCase,
    GetNotificationsUseCase,
    UpdateNotificationStatusUseCase,
    MarkAsReadUseCase,
  ],
})
export class NotificationModule {}
