export enum RoleType {
  SuperAdmin = "Super Admin",
  Admin = "Admin",
  Nutritionist = "Nutritionist",
  Veterinarian = "Veterinarian",
  CareTaker = "Care Taker",
}

export const AllowedRolesList = Object.values(RoleType).filter(
  (role) => role !== RoleType.Admin && role !== RoleType.SuperAdmin
);
