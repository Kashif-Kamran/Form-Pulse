import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IVaccine } from '@repo/shared';
import { VaccineTypeValues } from '@repo/shared/dist/cjs/types/enum.types';
import { Model, Types } from 'mongoose';
import { toJSONSchemaConfig, toObjectSchemaConfig } from '../common';

@Schema({
  virtuals: true,
  toObject: toObjectSchemaConfig,
  toJSON: toJSONSchemaConfig,
  timestamps: true,
})
export class Vaccine implements IVaccine {
  declare _id?: Types.ObjectId;
  declare createdAt?: Date;
  declare updatedAt?: Date;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: VaccineTypeValues;

  get id(): string {
    return this._id.toString();
  }
}

export const VaccineSchema = SchemaFactory.createForClass(Vaccine);

VaccineSchema.virtual('id').get(function () {
  return this._id.toString();
});

export type VaccineModel = Model<Vaccine>;
