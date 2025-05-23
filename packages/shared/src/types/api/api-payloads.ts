import {
  IAnimal,
  IDietPlan,
  IFeedInventory,
  IUser,
  IVaccine,
} from "../interfaces/resources";
import { ListResponse } from "./api-operations";

// Auth
export type EmailPassReq = { email: string; password: string };
export type VerifyOtpReq = { email: string; otp: number };

// Users
export type CreateUserReq = Omit<
  IUser,
  "id" | "_id" | "isVerified" | "verificationOtp"
>;
export type RegisterUserReq = CreateUserReq;

// Animals
export type CreateAnimalReq = Omit<
  IAnimal,
  "_id" | "id" | "createdAt" | "updatedAt"
>;

// Feed Inventory
export type CreateNewFeedItem = {
  name: string;
  totalQuentity: number;
  totalPrice: number;
};
export type CreateNewFeedItemReq = CreateNewFeedItem;

// Diet Plan
export type CreateDietPlanReq = Omit<
  IDietPlan,
  "_id" | "id" | "recipes" | "animal"
> & {
  recipes: Omit<IDietPlan["recipes"][number], "_id" | "id">[];
};

// Vaccine
export type CreateVaccineReq = Pick<IVaccine, "name" | "type">;
