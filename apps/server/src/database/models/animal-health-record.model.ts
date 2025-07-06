import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IAnimalHealthRecord } from '@repo/shared';
import { Model, Types } from 'mongoose';
import { toJSONSchemaConfig, toObjectSchemaConfig } from '../common';
import {
  VaccineStatuses,
  VaccineStatusValues,
} from '@repo/shared/dist/cjs/types/enum.types';

@Schema({ _id: true }) // Enables an _id for each subdocument
export class Schedule {
  declare _id?: Types.ObjectId;

  @Prop({ type: Date, required: true })
  dateTime: Date;

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({
    type: String,
    enum: VaccineStatuses,
    default: VaccineStatuses.PENDING,
  })
  status: VaccineStatusValues;

  @Prop({ type: Date, default: null })
  administeredDate: Date | null;
}

@Schema({
  virtuals: true,
  toObject: toObjectSchemaConfig,
  toJSON: toJSONSchemaConfig,
  timestamps: true,
})
export class AnimalHealthRecord implements IAnimalHealthRecord {
  declare _id?: Types.ObjectId;
  declare createdAt?: Date;
  declare updatedAt?: Date;

  @Prop({ type: Types.ObjectId, ref: 'Animal', required: true })
  animal: string;

  @Prop({ type: Types.ObjectId, ref: 'Vaccine', required: true })
  vaccine: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  veterinarian: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: null })
  deletedAt: Date | null;

  @Prop({ type: [Schedule], default: [] }) // Embedded array with its own _id
  schedule: Schedule[];

  get id(): string {
    return this._id.toString();
  }
}

export const AnimalHealthRecordSchema =
  SchemaFactory.createForClass(AnimalHealthRecord);

AnimalHealthRecordSchema.virtual('id').get(function () {
  return this._id.toString();
});

export type AnimalHealthRecordModel = Model<AnimalHealthRecord>;
