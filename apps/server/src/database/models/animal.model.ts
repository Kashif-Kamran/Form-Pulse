import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { IAnimal } from 'src/domain';

export type AnimalDocument = HydratedDocument<IAnimal>;

@Schema({ timestamps: true })
export class Animal implements IAnimal {
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

  @Prop()
  medicalHistory: string;
}

export const AnimalSchema = SchemaFactory.createForClass(Animal);
export type AnimalModel = Model<Animal>;
