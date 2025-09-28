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
import { UpdateNotificationStatusDto } from '../dtos';
import {
  IUser,
  NotificationPublic,
  NotificationStatuses,
  NotificationStatusValues,
} from '@repo/shared';
import { mapDocumentToResponse } from '../mappers/notification-response.mapper';

@Injectable()
export class UpdateNotificationStatusUseCase {
  constructor(
    @InjectModel('Notification')
    private readonly notificationModel: NotificationModel,
  ) {}

  async execute(
    notificationId: string,
    user: IUser,
    updateDto: UpdateNotificationStatusDto,
  ): Promise<Omit<NotificationPublic, 'sender' | 'recipient' | 'animal'>> {
    // Find the notification
    const notification = await this.notificationModel
      .findOne({ _id: notificationId, isDeleted: { $ne: true } })
      .exec();

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    console.log('Notifiction: ', {
      notificatioRecepientId: notification.recipient.toString(),
      userId: user._id,
    });

    // Verify the user is the sender
    if (notification.recipient.toString() !== user._id.toString()) {
      throw new BadRequestException(
        'You can only update notifications you sent',
      );
    }

    // Validate status transitions
    if (!this.isValidStatusTransition(notification.status, updateDto.status)) {
      throw new BadRequestException(
        `Invalid status transition from ${notification.status} to ${updateDto.status}`,
      );
    }

    // Update notification status
    notification.status = updateDto.status;

    // Set timestamps and task details based on new status
    if (updateDto.status === NotificationStatuses.ACCEPTED) {
      notification.acceptedAt = new Date();

      // If accepting and task details provided, set them
      if (updateDto.taskDetails) {
        notification.taskDetails = {
          dueDateTime: updateDto.taskDetails.dueDateTime,
          notes: updateDto.taskDetails.notes,
        };
      }
    } else if (updateDto.status === NotificationStatuses.REJECTED) {
      notification.rejectedAt = new Date();
      // Clear any existing task details when rejecting
      notification.taskDetails = undefined;
    } else if (updateDto.status === NotificationStatuses.COMPLETED) {
      // Set completion timestamp
      if (notification.taskDetails) {
        notification.taskDetails.completedAt = new Date();
      }
    }
    const updatedNotification: NotificationDocument = await notification.save();
    return mapDocumentToResponse(updatedNotification);
  }

  private isValidStatusTransition(
    currentStatus: NotificationStatusValues,
    newStatus: NotificationStatusValues,
  ): boolean {
    // Valid transitions with unified status system:
    // Pending -> Accepted, Rejected
    // Accepted -> In Progress, Rejected
    // In Progress -> Completed, Overdue
    // Rejected/Completed/Overdue -> (final states, no transitions)

    switch (currentStatus) {
      case NotificationStatuses.PENDING:
        return (
          newStatus === NotificationStatuses.ACCEPTED ||
          newStatus === NotificationStatuses.REJECTED
        );
      case NotificationStatuses.ACCEPTED:
        return (
          newStatus === NotificationStatuses.IN_PROGRESS ||
          newStatus === NotificationStatuses.REJECTED
        );
      case NotificationStatuses.IN_PROGRESS:
        return (
          newStatus === NotificationStatuses.COMPLETED ||
          newStatus === NotificationStatuses.OVERDUE
        );
      case NotificationStatuses.REJECTED:
      case NotificationStatuses.COMPLETED:
      case NotificationStatuses.OVERDUE:
        // Final states - no further transitions allowed
        return false;
      default:
        return false;
    }
  }
}
