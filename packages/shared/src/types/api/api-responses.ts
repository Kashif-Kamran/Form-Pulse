import {
  IAccessAndRefreshTokens,
  IAnimal,
  IDietPlan,
  IFeedInventory,
  IUser,
} from "../interfaces/resources";
import {
  ResourceListResponse,
  ResourceResponse,
  SingleItemResponse,
} from "./api-operations";

// Auth
export type AuthResponse = ResourceResponse<IAccessAndRefreshTokens>;
export type UserResponse = ResourceResponse<
  Omit<IUser, "_id" | "password" | "verificationOtp">
>;
export type VerifyOtpResponse = SingleItemResponse<{ message: string }>;

// Profile
export type UserProfileResponse = ResourceResponse<
  Omit<IUser, "_id" | "verificationOtp" | "password">
>;

// Animals
export type AnimalPublic = Omit<IAnimal, "createdAt" | "updatedAt">;
export type AnimalResponse = ResourceResponse<AnimalPublic>;
export type AnimalListResponse = ResourceListResponse<AnimalPublic>;

// Feed Inventory
export type FeedItemPublic = ResourceResponse<IFeedInventory>;
export type FeedItemResponse = ResourceResponse<IFeedInventory>;
export type FeedInventoryListResponse = ResourceListResponse<IFeedInventory>;

// Diet Plan
export type AnimalDietPlanPublic = Omit<IDietPlan, "animal"> & {
  animal: IAnimal;
};

export type CreateAnimalDietPlanResponse = ResourceResponse<IDietPlan>;
export type AnimalDietPlanResponse = ResourceResponse<AnimalDietPlanPublic>;

export type AnimalDietPlanListResponse =
  ResourceListResponse<AnimalDietPlanPublic>;
