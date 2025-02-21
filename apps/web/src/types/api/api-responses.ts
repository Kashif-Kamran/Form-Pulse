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
