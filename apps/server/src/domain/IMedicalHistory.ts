import * as mongoose from 'mongoose';
export const RecordTypeEnum = {
  Illness: 'Illness',
  Surgery: 'Surgery',
  Treatment: 'Treatment',
} as const;

export type TypeRecordType =
  (typeof RecordTypeEnum)[keyof typeof RecordTypeEnum];

export interface IMedicalHistory {
  _id?: mongoose.Types.ObjectId;
  animal: mongoose.Types.ObjectId;
  recordType: TypeRecordType;
  description: string;
  date: Date;
  createdBy: mongoose.Types.ObjectId;
}
