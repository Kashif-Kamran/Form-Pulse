const LOGIN = "/auth/login";
const REGISTER = "/auth/register";
const VERIFY_OTP = (email?: string) => `/auth/verify-otp/${email ?? ":email"}`;
const CONFIRM_PASSWORD = (email?: string) =>
  `/auth/confirm-password/${email ?? ":email"}`;

const HOME = "/";
const ANIMALS_PROFILE = "/animal-profiles";
const DIET_MANAGEMENT = "/diet-management";
const FEED_INVENTORY = "/feed-inventory";

export {
  LOGIN,
  REGISTER,
  HOME,
  VERIFY_OTP,
  CONFIRM_PASSWORD,
  ANIMALS_PROFILE,
  DIET_MANAGEMENT,
  FEED_INVENTORY,
};
