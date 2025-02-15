import mongoose from 'mongoose';

export const UserRoles = {
  Admin: 'ADMIN',
  Nutritionist: 'NUTRITIONIST',
  Veterinarian: 'VETERINARIAN',
  Caretaker: 'CARE_TAKER',
} as const;

export type UserRolesType = (typeof UserRoles)[keyof typeof UserRoles];

export interface IUser {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRolesType;
}

export interface Animal {
  _id?: mongoose.Types.ObjectId;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  healthStatus: string;
  activityLevel: string;
  specialDietRequirement: string;
  medicalHistory: string;
  createdAt: Date;
  updatedAt: Date;
}
