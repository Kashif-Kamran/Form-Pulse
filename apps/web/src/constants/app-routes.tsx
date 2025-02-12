// Authentication Routes
const LOGIN = "/auth/login";
const REGISTER = "/auth/register";
const VERIFY_OTP = (email?: string) => `/auth/verify-otp/${email ?? ":email"}`;
const CONFIRM_PASSWORD = (email?: string) =>
  `/auth/confirm-password/${email ?? ":email"}`;

// Application Routes
const HOME = "/";
const ANIMALS_PROFILE = "/animal-profiles";
const DIET_MANAGEMENT = "/diet-management";
const FEED_INVENTORY = "/feed-inventory";
const HEALTH_MONITORING = "/monitor-health";
const REPORTS = "/reports";
const EDUCATIONAL_RESOURCERS = "/educational-resources";
const SETTINGS = "/settings";

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
};
