import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Notification,
  NotificationModel,
} from '../../../database/models/notification.model';
import { IUser, NotificationPublic } from '@repo/shared';
import { mapLeanNotificationToResponse } from '../mappers/notification-with-relations.mapper';

@Injectable()
export class GetNotificationByIdUseCase {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: NotificationModel,
  ) {}

  async execute(
    notificationId: string,
    user: IUser,
  ): Promise<NotificationPublic> {
    const notification = await this.notificationModel
      .findOne({
        _id: notificationId,
        isDeleted: { $ne: true },
      })
      .populate('sender', 'id name email role isVerified createdAt updatedAt')
      .populate(
        'recipient',
        'id name email role isVerified createdAt updatedAt',
      )
      .populate(
        'animal',
        'id name species breed age weight isDeleted deletedAt',
      )
      .lean()
      .exec();

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    // Check if user is authorized to view this notification
    // Note: When using lean(), populated fields are objects, not strings
    if (
      (notification.sender as any)._id.toString() !== user._id.toString() &&
      (notification.recipient as any)._id.toString() !== user._id.toString()
    ) {
      throw new ForbiddenException(
        'You are not authorized to view this notification',
      );
    }

    // Use the new mapper for lean objects with populated relations
    return mapLeanNotificationToResponse(notification);
  }
}
