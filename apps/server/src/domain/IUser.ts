import mongoose from 'mongoose';
export const UserRoles = {
  Admin: 'Admin',
  Nutritionist: 'Nutritionist',
  Veterinarian: 'Veterinarian',
  Caretaker: 'Care Taker',
} as const;

export type UserRolesType = (typeof UserRoles)[keyof typeof UserRoles];

export interface IUser {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  roles: UserRolesType[];
}
