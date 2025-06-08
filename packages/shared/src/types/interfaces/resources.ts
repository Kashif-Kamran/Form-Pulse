import { VaccineTypeValues } from "../enum.types";
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
  role: RoleType;
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
  createdAt: Date;
  updatedAt: Date;
}

export interface IFeedInventory {
  _id: any;
  id: string;
  name: string;
  remainingStock: number;
  usedStock: number;
  totalPrice: number;
}

export interface IDietPlan {
  _id?: any;
  id: string;
  animal: string;
  startTime: Date;
  endTime: Date;
  recipes: {
    feed: string;
    quantity: number;
    _id?: any;
    id: string;
  }[];
}

export interface IVaccine {
  _id?: any;
  id: string;
  name: string;
  type: VaccineTypeValues;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAnimalHealthRecord {
  _id?: any;
  id: string;
  animal: string; // relation with animal
  vaccine: string; // relation with vaccine
  veterinarian: string; // relation with doctor
  schedule: { dateTime: Date; quantity: number }[];
  createdAt?: Date;
  updatedAt?: Date;
}
