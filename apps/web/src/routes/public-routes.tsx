import { Outlet, RouteObject, Navigate } from "react-router-dom";
import { isAuthenticated } from "./local-is-auth-check";
import {
  LOGIN,
  REGISTER,
  HOME,
  VERIFY_OTP,
  CONFIRM_PASSWORD,
} from "@/constants/app-routes";
import { Login } from "@/pages/auth/login/login";
import { Register } from "@/pages/auth/register/register";
import { VerifyOtp } from "@/pages/auth/verify-otp/verify-otp";
import { ConfirmPassword } from "@/pages/auth/confirm-password/confirm-password";

const PublicRouteGuard = () => {
  return !isAuthenticated ? <Outlet /> : <Navigate to={HOME} />;
};

const publicRoutes: RouteObject[] = [
  {
    element: <PublicRouteGuard />,
    children: [
      {
        path: LOGIN,
        element: <Login />,
        // lazy: () => import("@/pages/login"),
      },
      {
        path: REGISTER,
        // lazy: () => import("@/pages/register"),
        element: <Register />,
      },
      {
        path: VERIFY_OTP(),
        // lazy: () => import("@/pages/register"),
        element: <VerifyOtp />,
      },
      {
        path: CONFIRM_PASSWORD(),
        // lazy: () => import("@/pages/register"),
        element: <ConfirmPassword />,
      },
    ],
  },
];

export { publicRoutes };
