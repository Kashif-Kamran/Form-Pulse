import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IMedicalHistory, RecordTypeEnum } from 'src/domain';

import { TypeRecordType } from 'src/domain';
export type MedicalHistoryDocument = HydratedDocument<MedicalHistory>;

@Schema()
export class MedicalHistory implements IMedicalHistory {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Animal', required: true })
  animal: mongoose.Types.ObjectId;

  @Prop({ required: true, type: String, enum: Object.values(RecordTypeEnum) })
  recordType: TypeRecordType;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  createdBy: mongoose.Types.ObjectId;
}

export const MedicalHistorySchema =
  SchemaFactory.createForClass(MedicalHistory);
