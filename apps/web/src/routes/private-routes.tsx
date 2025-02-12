import { Outlet, RouteObject, Navigate } from "react-router-dom";
import { isAuthenticated } from "./local-is-auth-check";
import {
  ANIMALS_PROFILE,
  DIET_MANAGEMENT,
  EDUCATIONAL_RESOURCERS,
  FEED_INVENTORY,
  HEALTH_MONITORING,
  HOME,
  LOGIN,
  REPORTS,
  SETTINGS,
} from "@/constants/app-routes";
import Dashboard from "@/pages/dashboard/dashboard";
import AppLayout from "@/layout/app-layout";
const PirvateRouteGuard = () => {
  return isAuthenticated ? <Outlet /> : <Navigate to={LOGIN} />;
};

const privateRoutes: RouteObject[] = [
  {
    element: <PirvateRouteGuard />,

    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: HOME,
            index: true,
            element: <Dashboard />,
          },
          {
            path: ANIMALS_PROFILE,
            element: <div>Animal Profiles</div>,
          },
          {
            path: DIET_MANAGEMENT,
            element: <div>Diet Management </div>,
          },
          {
            path: FEED_INVENTORY,
            element: <div> Feed Inventory</div>,
          },
          {
            path: HEALTH_MONITORING,
            element: <div>Health Monitoring</div>,
          },
          {
            path: EDUCATIONAL_RESOURCERS,
            element: <div>Educational Resources</div>,
          },
          {
            path: REPORTS,
            element: <div>Reports</div>,
          },
          {
            path: SETTINGS,
            element: <div>Settings</div>,
          },
        ],
      },
    ],
  },
];

export { privateRoutes };
