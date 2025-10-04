import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NotificationModel } from 'src/database/models/notification.model';
import { NotificationStatuses } from '@repo/shared';

@Injectable()
export class UnreadNotificationCountUseCase {
  constructor(
    @InjectModel('Notification')
    private readonly notificationModel: NotificationModel,
  ) {}

  async execute(userId: string): Promise<{ unreadCount: number }> {
    try {
      // Count notifications that are unread for the specific user
      const unreadCount = await this.notificationModel.countDocuments({
        recipient: userId,
        readAt: { $exists: false }, // Not read yet
        status: {
          $in: [
            NotificationStatuses.PENDING,
            NotificationStatuses.ACCEPTED,
            NotificationStatuses.IN_PROGRESS,
          ],
        },
      });

      return { unreadCount };
    } catch (error) {
      console.error('Error counting unread notifications:', error);
      throw new Error('Failed to get unread notification count');
    }
  }
}
