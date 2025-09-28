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
import { IUser } from '@repo/shared';

@Injectable()
export class DeleteNotificationUseCase {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: NotificationModel,
  ) {}

  async execute(
    notificationId: string,
    user: IUser,
  ): Promise<{
    message: string;
    notificationId: string;
  }> {
    // Find the notification
    const notification = await this.notificationModel
      .findOne({
        _id: notificationId,
        isDeleted: { $ne: true },
      })
      .exec();

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    // Check if user is authorized to delete this notification
    // Only the sender (creator) can delete the notification
    if (notification.sender.toString() !== user._id.toString()) {
      throw new ForbiddenException(
        'You can only delete notifications you created',
      );
    }

    // Soft delete the notification
    notification.isDeleted = true;
    notification.deletedAt = new Date();
    await notification.save();

    return {
      message: 'Notification deleted successfully',
      notificationId: notificationId,
    };
  }
}
