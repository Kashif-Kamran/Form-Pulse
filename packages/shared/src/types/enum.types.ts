export enum VaccineTypes {
  LIVE = "Live",
  KILLED = "Killed", 
  LIVESTOCK = "Livestock",
  BACTRIN = "Bactrin",
  BIOLOGICS = "Biologics",
}

export enum VaccineStatuses {
  PENDING = "Pending",
  COMPLETED = "Completed",
  OVER_DUE = "Overdue",
}

export type VaccineTypeValues = `${VaccineTypes}`;
export type VaccineStatusValues = `${VaccineStatuses}`;
