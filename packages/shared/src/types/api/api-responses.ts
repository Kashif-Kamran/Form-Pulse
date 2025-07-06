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

// Dashboard Analytics
export type SpeciesDistributionItem = {
  species: string;
  count: number;
  percentage: number;
};

export type SpeciesDistributionResponse = {
  success: boolean;
  data: {
    data: SpeciesDistributionItem[];
    total: number;
  };
};

export type AgeDistributionItem = {
  ageGroup: string;
  count: number;
  percentage: number;
  minAge: number;
  maxAge: number;
};

export type AgeDistributionResponse = {
  success: boolean;
  data: {
    data: AgeDistributionItem[];
    total: number;
  };
};

// Vaccination Status Types
export type VaccinationStatusItem = {
  status: "completed" | "pending" | "overdue";
  count: number;
  percentage: number;
};

export type VaccinationStatusResponse = {
  success: boolean;
  data: {
    data: VaccinationStatusItem[];
    total: number;
  };
};

// Top Vaccines Types
export type TopVaccineItem = {
  vaccineName: string;
  count: number;
  vaccineId: string;
};

export type TopVaccinesResponse = {
  success: boolean;
  data: {
    data: TopVaccineItem[];
    total: number;
  };
};

// Health Alerts Types
export type HealthAlertItem = {
  type: "overdue_vaccines" | "missing_records" | "upcoming_schedules";
  count: number;
  severity: "high" | "medium" | "low";
  message: string;
  description: string;
};

export type HealthAlertsResponse = {
  success: boolean;
  data: {
    data: HealthAlertItem[];
    total: number;
  };
};

// Feed Stock Levels Types
export type FeedStockLevelItem = {
  feedId: string;
  feedName: string;
  remainingStock: number;
  totalStock: number;
  usedStock: number;
  percentage: number;
  status: "good" | "low" | "critical";
};

export type FeedStockLevelsResponse = {
  success: boolean;
  data: {
    data: FeedStockLevelItem[];
    total: number;
  };
};

// Feed Usage Types
export type FeedUsageItem = {
  feedId: string;
  feedName: string;
  usedStock: number;
  totalConsumption: number;
};

export type FeedUsageResponse = {
  success: boolean;
  data: {
    data: FeedUsageItem[];
    total: number;
  };
};

// Diet Plans Status Types
export type DietPlansStatusItem = {
  status: "with_diet_plan" | "without_diet_plan";
  count: number;
  percentage: number;
};

export type DietPlansStatusResponse = {
  success: boolean;
  data: {
    data: DietPlansStatusItem[];
    total: number;
    compliance: number;
  };
};

// User Roles Types
export type UserRoleItem = {
  role: "Admin" | "Nutritionist" | "Veterinarian" | "Care Taker";
  count: number;
  percentage: number;
};

export type UserRolesResponse = {
  success: boolean;
  data: {
    data: UserRoleItem[];
    total: number;
  };
};

// Verification Status Types
export type VerificationStatusItem = {
  status: "verified" | "unverified";
  count: number;
  percentage: number;
};

export type VerificationStatusResponse = {
  success: boolean;
  data: {
    data: VerificationStatusItem[];
    total: number;
    verificationRate: number;
  };
};

// Activity Types
export type ActivityItem = {
  type: "animals_added" | "vaccinations_given" | "feed_orders" | "active_users";
  count: number;
  period: "24h" | "7d" | "30d";
  label: string;
};

export type ActivityResponse = {
  success: boolean;
  data: {
    data: ActivityItem[];
    total: number;
  };
};
