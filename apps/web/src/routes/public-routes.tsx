import { Outlet, RouteObject, Navigate, useLocation } from "react-router-dom";
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
import { useMe } from "@/hooks/api/profile.hook";
import { Spinner } from "@/components/ui/spinnner";

const PublicRouteGuard = () => {
  const { data, isLoading } = useMe();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="text-ui-fg-interactive" />
      </div>
    );
  }

  if (data) {
    return <Navigate to={HOME} state={{ from: location }} replace />;
  }

  return <Outlet />;
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
