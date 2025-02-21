export type UserRolesType = (typeof UserRoles)[keyof typeof UserRoles];
export const UserRoles = {
  Admin: "Admin",
  Nutritionist: "Nutritionist",
  Veterinarian: "Veterinarian",
  Caretaker: "Care Taker",
} as const;
