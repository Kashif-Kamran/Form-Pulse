import { Outlet, RouteObject, Navigate, useLocation } from "react-router-dom";
import {
  LOGIN,
  HOME,
  CONFIRM_PASSWORD,
} from "@/constants/app-routes";
import { lazy, Suspense } from "react";
import { useMe } from "@/hooks/api/profile.hook";
import FallbackSpinner from "@/components/custom-ui/fallback-spinner";

const Login = lazy(() => import("@/pages/auth/login"));
// Registration and OTP verification components removed - admin-only user creation
// const Register = lazy(() => import("@/pages/auth/register"));
// const VerifyOtp = lazy(() => import("@/pages/auth/verify-otp"));
const ConfirmPassword = lazy(() => import("@/pages/auth/confirm-password"));

const PublicRouteGuard = () => {
  const { data, isLoading, error } = useMe();
  const location = useLocation();

  if (isLoading) {
    return <FallbackSpinner />;
  }

  // If there's an error (like 401) or no data, allow access to public routes
  if (error || !data) {
    return <Outlet />;
  }

  // If user is authenticated, redirect to home
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
      // Registration and OTP verification routes removed - admin-only user creation
      // {
      //   path: REGISTER,
      //   element: (
      //     <Suspense fallback={<FallbackSpinner />}>
      //       <Register />
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: VERIFY_OTP(),
      //   element: (
      //     <Suspense fallback={<FallbackSpinner />}>
      //       <VerifyOtp />
      //     </Suspense>
      //   ),
      // },
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
