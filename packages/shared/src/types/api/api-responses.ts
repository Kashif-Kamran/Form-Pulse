import {
  IAccessAndRefreshTokens,
  IAnimal,
  IDietPlan,
  IFeedInventory,
  IUser,
  IVaccine,
} from "../interfaces/resources";
import {
  DeleteResponse,
  ListResponse,
  ResourceListResponse,
  ResourceResponse,
  SingleItemResponse,
} from "./api-operations";

// Auth
export type AuthResponse = ResourceResponse<IAccessAndRefreshTokens>;
export type PublicUser = Omit<IUser, "_id" | "password" | "verificationOtp">;
export type UserResponse = ResourceResponse<PublicUser>;
export type VerifyOtpResponse = SingleItemResponse<{ message: string }>;

// Profile
export type UserProfileResponse = ResourceResponse<PublicUser>;

// Animals
export type AnimalPublic = Omit<IAnimal, "createdAt" | "updatedAt">;
export type AnimalResponse = ResourceResponse<AnimalPublic>;
export type AnimalListResponse = ResourceListResponse<AnimalPublic>;
export type AnimalDeleteResponse = DeleteResponse;

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

export type CreateVaccineResponse = Omit<IVaccine, "_id"> & { _id: string };
export type UserListResponse = ListResponse<UserResponse>;
export type VaccineListResponse = ListResponse<IVaccine>;
