import { IAnimal, IUser } from "../interfaces/resources";
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
