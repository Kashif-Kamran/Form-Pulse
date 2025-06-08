import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IAnimalHealthRecord } from '@repo/shared';
import { Model, Types } from 'mongoose';
import { toJSONSchemaConfig, toObjectSchemaConfig } from '../common';

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

  @Prop({ type: Types.ObjectId, ref: 'Vaccine', required: true })
  veterinarian: string;

  @Prop({})
  schedule: { dateTime: Date; quantity: number }[];

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
