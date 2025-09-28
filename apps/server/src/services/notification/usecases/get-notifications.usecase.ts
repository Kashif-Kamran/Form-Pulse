import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NotificationModel } from 'src/database/models/notification.model';
import { GetNotificationsQueryDto } from '../dtos';
import {
  NotificationPublic,
  NotificationDualListResponse,
  IUser,
} from '@repo/shared';
import { mapLeanNotificationToResponse } from '../mappers/notification-with-relations.mapper';

@Injectable()
export class GetNotificationsUseCase {
  constructor(
    @InjectModel('Notification')
    private readonly notificationModel: NotificationModel,
  ) {}

  async execute(
    user: IUser,
    query: GetNotificationsQueryDto,
  ): Promise<NotificationDualListResponse> {
    const {
      status,
      type,
      priority,
      isRead,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = query;

    console.log('User : ', user);

    // Calculate date 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Base filter for common conditions
    const baseFilter: any = {
      isDeleted: { $ne: true },
      createdAt: { $gte: sevenDaysAgo }, // Only last 7 days
    };

    if (status) {
      baseFilter.status = status;
    }

    if (type) {
      baseFilter.type = type;
    }

    if (priority) {
      baseFilter.priority = priority;
    }

    if (isRead !== undefined) {
      baseFilter.readAt = isRead ? { $ne: null } : null;
    }

    // Build sort
    const sort: any = {};
    if (sortBy === 'dueDateTime') {
      sort['taskDetails.dueDateTime'] = sortOrder === 'asc' ? 1 : -1;
    } else if (sortBy === 'priority') {
      // Sort by priority: Urgent > High > Medium > Low
      sort.priority = sortOrder === 'asc' ? 1 : -1;
    } else {
      sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    }

    // Execute parallel queries for received and sent notifications
    const [receivedNotifications, sentNotifications] = await Promise.all([
      // Notifications received by me
      this.notificationModel
        .find({ ...baseFilter, recipient: user._id })
        .populate('sender', 'id name email role isVerified createdAt updatedAt')
        .populate(
          'recipient',
          'id name email role isVerified createdAt updatedAt',
        )
        .populate('animal', 'id name species breed age weight')
        .sort(sort)
        .lean()
        .exec(),

      // Notifications sent by me
      this.notificationModel
        .find({ ...baseFilter, sender: user._id })
        .populate('sender', 'id name email role isVerified createdAt updatedAt')
        .populate(
          'recipient',
          'id name email role isVerified createdAt updatedAt',
        )
        .populate('animal', 'id name species breed age weight')
        .sort(sort)
        .lean()
        .exec(),
    ]);

    // Helper function to map notifications using existing mapper
    const mapNotifications = (notifications: any[]): NotificationPublic[] => {
      return notifications.map((notification: any) =>
        mapLeanNotificationToResponse(notification),
      );
    };

    const receivedResults = mapNotifications(receivedNotifications);
    const sentResults = mapNotifications(sentNotifications);

    return {
      received: receivedResults,
      sent: sentResults,
      counts: {
        received: receivedResults.length,
        sent: sentResults.length,
        total: receivedResults.length + sentResults.length,
      },
    };
  }
}
