export enum RoleType {
  Admin = "Admin",
  Nutritionist = "Nutritionist",
  Veterinarian = "Veterinarian",
  CareTaker = "Care Taker",
}

export const AllowedRolesList = Object.values(RoleType).filter(
  (role) => role !== RoleType.Admin
);
