import { UserRolesType } from "./common";

export type EmailPassReq = { email: string; password: string };

export type RegisterUserReq = {
  email: string;
  password: string;
  name: string;
  roles: string[];
};

export type RegisterUserResponse = {
  _id: string;
  name: string;
  email: string;
  roles: UserRolesType[];
};
