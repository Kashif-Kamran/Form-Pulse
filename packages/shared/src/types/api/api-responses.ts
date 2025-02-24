import {
  IAccessAndRefreshTokens,
  IAnimal,
  IUser,
} from "../interfaces/resources";
import {
  ListResponse,
  ResourceResponse,
  SingleItemResponse,
} from "./api-operations";

// Auth
export type AuthResponse = SingleItemResponse<IAccessAndRefreshTokens>;
export type UserResponse = SingleItemResponse<
  Omit<IUser, "_id" | "password" | "verificationOtp">
>;
export type VerifyOtpResponse = SingleItemResponse<{ message: string }>;

// Profile
export type UserProfileResponse = ResourceResponse<
  Omit<IUser, "_id" | "verificationOtp" | "password">
>;

// Animals
export type AnimalResponse = Omit<IAnimal, "createdAt" | "updatedAt">;
export type GetAnimalResponse = SingleItemResponse<AnimalResponse>;
export type AnimalListResponse = ListResponse<AnimalResponse>;
