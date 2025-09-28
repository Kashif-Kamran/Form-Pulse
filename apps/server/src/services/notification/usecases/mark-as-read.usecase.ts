import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  NotificationModel,
  NotificationDocument,
} from 'src/database/models/notification.model';
import { IUser, NotificationPublic } from '@repo/shared';
import { mapDocumentToResponse } from '../mappers/notification-response.mapper';

@Injectable()
export class MarkAsReadUseCase {
  constructor(
    @InjectModel('Notification')
    private readonly notificationModel: NotificationModel,
  ) {}

  async execute(
    notificationId: string,
    user: IUser,
  ): Promise<Omit<NotificationPublic, 'sender' | 'recipient' | 'animal'>> {
    // Find the notification
    const notification = await this.notificationModel
      .findOne({ _id: notificationId, isDeleted: { $ne: true } })
      .exec();

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    // Verify the user is the recipient
    if (notification.recipient.toString() !== user._id.toString()) {
      throw new BadRequestException(
        'You can only mark your own notifications as read',
      );
    }

    // Mark as read if not already read
    if (!notification.readAt) {
      notification.readAt = new Date();
      await notification.save();
    }

    return mapDocumentToResponse(notification);
  }
}
