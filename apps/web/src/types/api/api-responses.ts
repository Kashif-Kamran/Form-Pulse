// User Types
export const UserRoles = {
  Admin: "ADMIN",
  Nutritionist: "NUTRITIONIST",
  Veterinarian: "VETERINARIAN",
  Caretaker: "CARE_TAKER",
} as const;
export type UserRolesType = (typeof UserRoles)[keyof typeof UserRoles];

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
