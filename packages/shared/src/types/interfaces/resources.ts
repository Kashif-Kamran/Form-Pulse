import { RoleType } from "../roles.types";

export type IAccessAndRefreshTokens = {
  access: {
    token: string;
  };
};

export interface IUser {
  _id?: any;
  id: string;
  name: string;
  email: string;
  password: string;
  roles: RoleType[];
  verificationOtp?: Number | null;
  isVerified: boolean;
}

export interface IAnimal {
  _id?: any;
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  healthStatus: string;
  activityLevel: string;
  specialDietRequirement: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IFeedInventory {
  _id: any;
  id: string;
  name: string;
  availableQuantity: number;
  unitPrice: number;
}
