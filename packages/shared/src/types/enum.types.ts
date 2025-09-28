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

// Notification Types
export enum NotificationTypes {
  DIET_PLAN_REQUEST = "Diet Plan Request",
  HEALTH_CHECK_REQUEST = "Health Check Request",
  VACCINATION_REQUEST = "Vaccination Request",
  DIET_PLAN_READY = "Diet Plan Ready",
  HEALTH_REPORT_READY = "Health Report Ready",
  VACCINATION_COMPLETED = "Vaccination Completed",
  SYSTEM_ALERT = "System Alert",
  CUSTOM_MESSAGE = "Custom Message",
}

// Unified Notification/Todo Statuses - covers entire lifecycle
export enum NotificationStatuses {
  PENDING = "Pending",           // Initial state - waiting for response
  ACCEPTED = "Accepted",         // Accepted but not started
  IN_PROGRESS = "In Progress",   // Currently working on it
  COMPLETED = "Completed",       // Successfully finished
  REJECTED = "Rejected",         // Declined/Rejected
  OVERDUE = "Overdue",          // Past due date
}

// Remove separate TodoStatuses as we're unifying them

// Notification Priorities
export enum NotificationPriorities {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
  URGENT = "Urgent",
}

export type VaccineTypeValues = `${VaccineTypes}`;
export type VaccineStatusValues = `${VaccineStatuses}`;
export type NotificationTypeValues = `${NotificationTypes}`;
export type NotificationStatusValues = `${NotificationStatuses}`;
export type NotificationPriorityValues = `${NotificationPriorities}`;

// Remove TodoStatusValues since we unified the statuses
