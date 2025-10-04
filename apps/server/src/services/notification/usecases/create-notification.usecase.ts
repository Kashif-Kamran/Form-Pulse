import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  NotificationModel,
  NotificationDocument,
} from 'src/database/models/notification.model';
import { User, UserModel } from 'src/database';
import { CreateNotificationDto } from '../dtos';
import { IUser, NotificationPublic } from '@repo/shared';
import { mapDocumentToResponse } from '../mappers/notification-response.mapper';
import { Types } from 'mongoose';

@Injectable()
export class CreateNotificationUseCase {
  constructor(
    @InjectModel('Notification')
    private readonly notificationModel: NotificationModel,
    @InjectModel('User') private readonly userModel: UserModel,
  ) {}
  async execute(
    sender: IUser,
    createNotificationDto: CreateNotificationDto,
  ): Promise<Omit<NotificationPublic, 'sender' | 'recipient' | 'animal'>> {
    // Validate sender exists

    // Validate recipient exists
    const recipient = await this.userModel
      .findOne({
        _id: createNotificationDto.recipient,
        isDeleted: { $ne: true },
      })
      .lean()
      .exec();

    if (!recipient) {
      throw new NotFoundException('Recipient not found');
    }

    // Validate role-based permissions (basic implementation)
    if (
      !this.canSendNotification(
        sender.role,
        recipient.role,
        createNotificationDto.type,
      )
    ) {
      throw new BadRequestException(
        `${sender.role} cannot send ${createNotificationDto.type} to ${recipient.role}`,
      );
    }

    // Create the notification
    const notificationData: any = {
      title: createNotificationDto.title,
      description: createNotificationDto.description,
      type: createNotificationDto.type,
      priority: createNotificationDto.priority,
      recipient: Types.ObjectId.createFromHexString(
        createNotificationDto.recipient,
      ),
      animal: createNotificationDto.animal
        ? Types.ObjectId.createFromHexString(createNotificationDto.animal)
        : undefined,
      sender: Types.ObjectId.createFromHexString(sender._id.toString()),
    };

    // Only add taskDetails if dueDate is provided
    if (createNotificationDto.dueDate) {
      notificationData.taskDetails = {
        dueDateTime: createNotificationDto.dueDate,
      };
    }

    const notificationDocument = new this.notificationModel(notificationData);

    const createdNotification: NotificationDocument =
      await notificationDocument.save();
    return mapDocumentToResponse(createdNotification);
  }

  private canSendNotification(
    senderRole: string,
    recipientRole: string,
    notificationType: string,
  ): boolean {
    // Simplified: Allow anyone to send notifications to anyone
    // Complex role-based restrictions can be added in the future
    return true;
  }
}
