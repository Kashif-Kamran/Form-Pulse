import {
  IAnimal,
  IAnimalHealthRecord,
  IDietPlan,
  IFeedInventory,
  IUser,
  IVaccine,
} from "../interfaces/resources";
import { VaccineStatusValues } from "../enum.types";

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

type CreateFeedInventoryBase = Omit<
  IFeedInventory,
  "_id" | "id" | "remainingStock" | "usedStock"
>;

export type CreateNewFeedItem = {
  name: string;
  totalQuentity: number;
  totalPrice: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  calories: number;
  description?: string;
};
export type CreateNewFeedItemReq = CreateNewFeedItem;

// Diet Plan
export type CreateDietPlanReq = Omit<
  IDietPlan,
  "_id" | "id" | "recipes" | "animal"
> & {
  recipes: Omit<IDietPlan["recipes"][number], "_id" | "id" | "quantity">[];
};

// Vaccine
export type CreateVaccineReq = Pick<IVaccine, "name" | "type">;
export type CreateAnimalHealthRecordReq = Pick<
  IAnimalHealthRecord,
  "animal" | "vaccine" | "veterinarian"
> & {
  schedule: Array<
    Pick<IAnimalHealthRecord["schedule"][number], "quantity" | "dateTime">
  >;
};

// Health Record Status Update
export type UpdateHealthRecordStatusReq = {
  newStatus: VaccineStatusValues;
};

// Nutritionist Notification
export type NotifyNutritionistReq = {
  message: string;
  animalId: string;
  nutritionistId: string;
};
