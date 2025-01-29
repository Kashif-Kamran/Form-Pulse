import { Outlet, RouteObject, Navigate } from "react-router-dom";
import { isAuthenticated } from "./local-is-auth-check";
import { LOGIN, REGISTER, HOME } from "@/constants/app-routes";
import { Login } from "@/pages/login/login";
import { Register } from "@/pages/register/register";

const PublicRouteGuard = () => {
  return !isAuthenticated ? <Outlet /> : <Navigate to={HOME} />;
};

const publicRoutes: RouteObject = {
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
  ],
};

export { publicRoutes };
