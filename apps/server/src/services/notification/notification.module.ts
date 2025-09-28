import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CreateNotificationUseCase } from './usecases/create-notification.usecase';
import { GetNotificationsUseCase } from './usecases/get-notifications.usecase';
import { GetNotificationByIdUseCase } from './usecases/get-notification-by-id.usecase';
import { UpdateNotificationStatusUseCase } from './usecases/update-notification-status.usecase';
import { MarkAsReadUseCase } from './usecases/mark-as-read.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [
    CreateNotificationUseCase,
    GetNotificationsUseCase,
    GetNotificationByIdUseCase,
    UpdateNotificationStatusUseCase,
    MarkAsReadUseCase,
  ],
  exports: [
    CreateNotificationUseCase,
    GetNotificationsUseCase,
    GetNotificationByIdUseCase,
    UpdateNotificationStatusUseCase,
    MarkAsReadUseCase,
  ],
})
export class NotificationModule {}
