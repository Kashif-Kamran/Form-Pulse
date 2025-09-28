import {
  CreateNotificationReq,
  UpdateNotificationStatusReq,
  GetNotificationsQueryReq,
  NotificationTypeValues,
  NotificationStatusValues,
  NotificationPriorityValues,
  NotificationTypes,
  NotificationPriorities,
  NotificationStatuses,
} from '@repo/shared';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  IsDateString,
  IsNumberString,
  IsBoolean,
  ValidateNested,
  isDateString,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

class TaskDetailsDto {
  @IsDateString()
  dueDateTime: Date;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class CreateNotificationDto implements CreateNotificationReq {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsEnum(Object.values(NotificationTypes))
  type: NotificationTypeValues;

  @IsNotEmpty()
  @IsEnum(Object.values(NotificationPriorities))
  priority: NotificationPriorityValues;

  @IsNotEmpty()
  @IsString()
  recipient: string;

  @IsOptional()
  @IsString()
  animal?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: Date;
}

export class UpdateNotificationStatusDto
  implements UpdateNotificationStatusReq
{
  @IsNotEmpty()
  @IsEnum(Object.values(NotificationStatuses))
  status: NotificationStatusValues;

  @IsOptional()
  @IsString()
  rejectionReason?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => TaskDetailsDto)
  taskDetails?: TaskDetailsDto;
}

export class GetNotificationsQueryDto implements GetNotificationsQueryReq {
  @IsOptional()
  @IsEnum(Object.values(NotificationStatuses))
  status?: NotificationStatusValues;

  @IsOptional()
  @IsEnum(Object.values(NotificationTypes))
  type?: NotificationTypeValues;

  @IsOptional()
  @IsEnum(Object.values(NotificationPriorities))
  priority?: NotificationPriorityValues;

  @IsOptional()
  @IsBoolean()
  isRead?: boolean;

  @IsOptional()
  @IsEnum(['createdAt', 'dueDateTime', 'priority'])
  sortBy?: 'createdAt' | 'dueDateTime' | 'priority';

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';
}
