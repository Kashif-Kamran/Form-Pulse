import { UserRolesType } from "./common";

export type AuthResponse = {
  access: {
    token: string;
  };
};

export type ProfileResponse = {
  _id?: string;
  name: string;
  email: string;
  roles: UserRolesType[];
};

export type VerifyOtpResponse = {
  message: string;
};

// Animals

export type IAnimal = {
  _id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  healthStatus: string;
  activityLevel: string;
  specialDietRequirement: string;
};

export type AniamlsListResponse = {
  results: IAnimal[];
  count: Number;
};
