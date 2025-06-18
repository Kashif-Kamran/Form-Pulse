export enum VaccineTypes {
  KILLED_VACCINE = "Killed Vaccine",
  LIVE_VACCINE = "Live Vaccine",
  LIVESTOCK_VACCINE = "LiveStock Vaccine",
  BACTARIAN = "Bactarian",
  BIO_LOGICS = "BioLogics",
}
export enum VaccineStatuses {
  PENDING = "Pending",
  COMPLETED = "Completed",
  OVER_DUE = "Overdue",
}

export type VaccineTypeValues = `${VaccineTypes}`;
export type VaccineStatusValues = `${VaccineStatuses}`;
