import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { IAnimal } from '@repo/shared';
import { toJSONSchemaConfig, toObjectSchemaConfig } from '../common';

export type AnimalDocument = HydratedDocument<IAnimal>;

@Schema({
  virtuals: true,
  toObject: toObjectSchemaConfig,
  toJSON: toJSONSchemaConfig,
})
export class Animal implements IAnimal {
  declare _id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  species: string;

  @Prop()
  breed: string;

  @Prop()
  age: number;

  @Prop()
  weight: number;

  @Prop()
  healthStatus: string;

  @Prop()
  activityLevel: string;

  @Prop()
  specialDietRequirement: string;

  get id(): string {
    return this._id.toString();
  }
}
export const AnimalSchema = SchemaFactory.createForClass(Animal);

AnimalSchema.virtual('id').get(function () {
  return this._id.toString();
});

export type AnimalModel = Model<Animal>;
