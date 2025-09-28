import {
  VaccineStatusValues,
  VaccineTypeValues,
  NotificationTypeValues,
  NotificationStatusValues,
  NotificationPriorityValues,
} from "../enum.types";
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
  isDeleted?: boolean;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
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
  isDeleted?: boolean;
  deletedAt?: Date | null;
}

export interface IFeedInventory {
  _id: any;
  id: string;
  name: string;
  remainingStock: number;
  usedStock: number;
  totalPrice: number;
  description?: string;
  nutritionInfo: {
    protein: number;
    carbs: number;
    fats: number;
    fiber: number;
    calories: number;
  };
  isDeleted?: boolean;
  deletedAt?: Date | null;
}

export interface IDietPlan {
  _id?: any;
  id: string;
  animal: string;
  startTime: Date;
  endTime: Date;
  careTaker: any;
  noOfTimesPerDay: number;
  recipes: {
    feed: string;
    perTimeQuantity: number;
    quantity: number;
    _id?: any;
    id: string;
  }[];
  isDeleted?: boolean;
  deletedAt?: Date | null;
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
  schedule: {
    dateTime: Date;
    quantity: number;
    status: VaccineStatusValues;
    administeredDate: Date | null;
    _id?: any;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
  deletedAt?: Date | null;
}

export interface INotification {
  _id?: any;
  id: string;

  // Core notification data
  title: string;
  description?: string;
  type: NotificationTypeValues;
  priority: NotificationPriorityValues;

  // User relationships
  sender: any; // User ID who sent the notification
  recipient: any; // User ID who should receive the notification

  // Optional animal reference
  animal?: any; // Animal ID (optional)

  // Unified status covering entire lifecycle
  status: NotificationStatusValues;

  // Task-specific fields (when notification becomes a task)
  taskDetails?: {
    dueDateTime?: Date;
    notes?: string;
    completedAt?: Date;
  };

  // Metadata
  readAt?: Date;
  acceptedAt?: Date;
  rejectedAt?: Date;

  // Audit fields
  createdAt: Date;
  updatedAt: Date;
  isDeleted?: boolean;
  deletedAt?: Date | null;
}
