import { Outlet, RouteObject, Navigate } from "react-router-dom";
import { isAuthenticated } from "./local-is-auth-check";
import { HOME, LOGIN } from "@/constants/app-routes";
const PirvateRouteGuard = () => {
  return isAuthenticated ? <Outlet /> : <Navigate to={LOGIN} />;
};

const privateRoutes: RouteObject = {
  element: <PirvateRouteGuard />,
  children: [
    {
      path: HOME,
      index: true,
      element: <>Home Page</>,
    },
  ],
};

export { privateRoutes };
