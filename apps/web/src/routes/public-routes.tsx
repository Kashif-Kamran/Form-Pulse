import { Outlet, RouteObject, Navigate, useLocation } from "react-router-dom";
import {
  LOGIN,
  REGISTER,
  HOME,
  VERIFY_OTP,
  CONFIRM_PASSWORD,
} from "@/constants/app-routes";
import { lazy, Suspense } from "react";
import { useMe } from "@/hooks/api/profile.hook";
import FallbackSpinner from "@/components/custom-ui/fallback-spinner";

const Login = lazy(() => import("@/pages/auth/login"));
const Register = lazy(() => import("@/pages/auth/register"));
const VerifyOtp = lazy(() => import("@/pages/auth/verify-otp"));
const ConfirmPassword = lazy(() => import("@/pages/auth/confirm-password"));

const PublicRouteGuard = () => {
  const { data, isLoading } = useMe();
  const location = useLocation();

  if (isLoading) {
    return <FallbackSpinner />;
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
        element: (
          <Suspense fallback={<FallbackSpinner />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: REGISTER,
        element: (
          <Suspense fallback={<FallbackSpinner />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: VERIFY_OTP(),
        element: (
          <Suspense fallback={<FallbackSpinner />}>
            <VerifyOtp />
          </Suspense>
        ),
      },
      {
        path: CONFIRM_PASSWORD(),
        element: (
          <Suspense fallback={<FallbackSpinner />}>
            <ConfirmPassword />
          </Suspense>
        ),
      },
    ],
  },
];

export { publicRoutes };
