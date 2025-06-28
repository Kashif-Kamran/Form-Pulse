import { VaccineStatusValues } from "../enum.types";
import {
  IAccessAndRefreshTokens,
  IAnimal,
  IAnimalHealthRecord,
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
export type AnimalDietPlanPublic = Omit<
  IDietPlan,
  "animal" | "careTaker" | "recipes"
> & {
  careTaker: PublicUser;
  animal: IAnimal;
  recipes: Array<
    Omit<IDietPlan["recipes"][number], "feed"> & {
      feed: IFeedInventory;
    }
  >;
};

export type CreateAnimalDietPlanResponse = ResourceResponse<IDietPlan>;
export type AnimalDietPlanResponse = ResourceResponse<AnimalDietPlanPublic>;

//
export type AnimalDietPlanListResponse =
  ResourceListResponse<AnimalDietPlanPublic>;

export type CreateVaccineResponse = Omit<IVaccine, "_id"> & { _id: string };
export type UserListResponse = ListResponse<UserResponse>;
export type VaccineListResponse = ListResponse<IVaccine>;

//
export type AnimalHealthRecordGeneric<
  TAnimal = string,
  TVaccine = string,
  TVet = string,
> = Omit<IAnimalHealthRecord, "animal" | "vaccine" | "veterinarian"> & {
  animal: TAnimal;
  vaccine: TVaccine;
  veterinarian: TVet;
};

export type AnimalHealthRecordResponse = AnimalHealthRecordGeneric;

export type PopulatedAnimalHealthRecord = AnimalHealthRecordGeneric<
  IAnimal,
  IVaccine,
  IUser
>;
export type AnimalHealthRecordsListResponse =
  ListResponse<PopulatedAnimalHealthRecord>;
export type CreateAnimalHealthRecordResponse = IAnimalHealthRecord;
export type UpdateAnimalHealthRecordResponse = SingleItemResponse<{
  message: string;
  data: {
    id: string;
  };
}>;

export type HealthRecordResponseItem = {
  id: string; // schedule, does id
  animal: IAnimal;
  vaccine: IVaccine;
  administeredDate: Date | null;
  dueDate: Date;
  veterinarian: IUser;
  status: VaccineStatusValues;
  quantity: number | string;
  healthRecordId: string;
};

export type HealthRecordListResponse = ListResponse<HealthRecordResponseItem>;

// Health Record Status Update
export type UpdateHealthRecordStatusResponse = SingleItemResponse<{
  message: string;
  updatedSchedule: {
    _id: string;
    dateTime: Date;
    quantity: number;
    status: VaccineStatusValues;
    administeredDate: Date | null;
  };
}>;

// Nutritionist Notification
export type NotifyNutritionistResponse = SingleItemResponse<{
  message: string;
  notificationId: string;
}>;
