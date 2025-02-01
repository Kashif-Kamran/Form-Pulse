const LOGIN = "/auth/login";
const REGISTER = "/auth/register";
const VERIFY_OTP = (email?: string) => `/auth/verify-otp/${email ?? ":email"}`;
const CONFIRM_PASSWORD = (email?: string) =>
  `/auth/confirm-password/${email ?? ":email"}`;

const HOME = "/";

export { LOGIN, REGISTER, HOME, VERIFY_OTP, CONFIRM_PASSWORD };
