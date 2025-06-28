// Authentication Routes
const LOGIN = "/auth/login";
const REGISTER = "/auth/register";
const VERIFY_OTP = (email?: string) => `/auth/verify-otp/${email ?? ":email"}`;
const CONFIRM_PASSWORD = (email?: string) =>
  `/auth/confirm-password/${email ?? ":email"}`;

// Application Routes
const HOME = "/";
const ANIMALS_PROFILE = "/animal-profiles";
const ANIMAL_DETAIL = (animalId?: string) =>
  `/animal-profiles/${animalId ?? ":animalId"}`;
const DIET_MANAGEMENT = "/diet-management";
const FEED_INVENTORY = "/feed-inventory";
const HEALTH_MONITORING = "/monitor-health";
const REPORTS = "/reorts";
const EDUCATIONAL_RESOURCERS = "/educational-resources";
const SETTINGS = "/settings";
const CREATE_DIET_PLAN = DIET_MANAGEMENT + "/create";
const EDIT_DIET_PLAN = (dietPlanId?: string) => 
  `${DIET_MANAGEMENT}/edit/${dietPlanId ?? ":dietPlanId"}`;
const CREATE_HEALTH_RECORD = HEALTH_MONITORING + "/create";
const EDIT_HEALTH_RECORD = (healthRecordId?: string) => 
  `${HEALTH_MONITORING}/edit/${healthRecordId ?? ":healthRecordId"}`;
export {
  LOGIN,
  REGISTER,
  HOME,
  VERIFY_OTP,
  CONFIRM_PASSWORD,
  ANIMALS_PROFILE,
  DIET_MANAGEMENT,
  FEED_INVENTORY,
  HEALTH_MONITORING,
  REPORTS,
  EDUCATIONAL_RESOURCERS,
  SETTINGS,
  ANIMAL_DETAIL,
  CREATE_DIET_PLAN,
  EDIT_DIET_PLAN,
  CREATE_HEALTH_RECORD,
  EDIT_HEALTH_RECORD,
};
