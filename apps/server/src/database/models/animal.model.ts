import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { IAnimal } from '@repo/shared';
import { toJSONSchemaConfig, toObjectSchemaConfig } from '../common';

export type AnimalDocument = HydratedDocument<Animal>;

@Schema({
  virtuals: true,
  toObject: toObjectSchemaConfig,
  toJSON: toJSONSchemaConfig,
  timestamps: true,
})
export class Animal implements IAnimal {
  declare _id: Types.ObjectId;
  declare createdAt: Date;
  declare updatedAt: Date;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  species: string;

  @Prop({ required: true })
  breed: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  weight: number;

  get id(): string {
    return this._id.toString();
  }
}
export const AnimalSchema = SchemaFactory.createForClass(Animal);

AnimalSchema.virtual('id').get(function () {
  return this._id.toString();
});

export type AnimalModel = Model<Animal>;
