import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import {
  INotification,
  NotificationTypeValues,
  NotificationStatusValues,
  NotificationPriorityValues,
  NotificationStatuses,
  NotificationPriorities,
  NotificationTypes,
} from '@repo/shared';
import { toJSONSchemaConfig, toObjectSchemaConfig } from '../common';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema({
  virtuals: true,
  toObject: toObjectSchemaConfig,
  toJSON: toJSONSchemaConfig,
  timestamps: true,
})
export class Notification implements INotification {
  declare _id: Types.ObjectId;
  declare createdAt: Date;
  declare updatedAt: Date;

  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ default: NotificationTypes.CUSTOM_MESSAGE })
  type: NotificationTypeValues;

  @Prop({ required: true, default: NotificationPriorities.MEDIUM })
  priority: NotificationPriorityValues;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  sender: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  recipient: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Animal', default: null })
  animal?: Types.ObjectId;

  @Prop({
    required: true,
    enum: NotificationStatuses,
    default: NotificationStatuses.PENDING,
  })
  status: NotificationStatusValues;

  // Simplified task-related fields - no separate todoStatus
  @Prop({
    type: {
      dueDateTime: Date,
      notes: String,
      completedAt: Date,
    },
    default: null,
  })
  taskDetails?: {
    dueDateTime: Date;
    notes?: string;
    completedAt?: Date;
  };

  @Prop({ default: null })
  readAt?: Date;

  @Prop({ default: null })
  acceptedAt?: Date;

  @Prop({ default: null })
  rejectedAt?: Date;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: null })
  deletedAt: Date | null;

  get id(): string {
    return this._id.toString();
  }
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

NotificationSchema.virtual('id').get(function () {
  return this._id.toString();
});

// Create indexes for optimal performance
NotificationSchema.index({
  recipient: 1,
  status: 1,
  createdAt: -1,
});
NotificationSchema.index({ sender: 1, createdAt: -1 });
NotificationSchema.index({ animal: 1 });
NotificationSchema.index({
  'taskDetails.dueDateTime': 1,
  status: 1,
});
NotificationSchema.index({ type: 1, priority: 1 });

export type NotificationModel = Model<Notification>;
