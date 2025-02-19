import mongoose from 'mongoose';

export interface IAnimal {
  _id?: mongoose.Types.ObjectId;
  name: string;
  species: string; // Schema has enum as type
  breed: string;
  age: number;
  weight: number;
  healthStatus: string;
  activityLevel: string; // Schema has enum as type
  specialDietRequirement: string;
  createdAt?: Date;
  updatedAt?: Date;
}
