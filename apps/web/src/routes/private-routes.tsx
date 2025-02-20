import { Outlet, RouteObject, Navigate, useLocation } from "react-router-dom";
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
import AnimalList from "@/pages/animals/animal-list/animal-list";
import { Spinner } from "@/components/ui/spinnner";
import { useMe } from "@/hooks/api/profile.hook";

const ProtectedRoute = () => {
  const { data, isLoading } = useMe();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="text-ui-fg-interactive" />
      </div>
    );
  }

  if (!data) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

// const PirvateRouteGuard = () => {
//   return isAuthenticated ? <Outlet /> : <Navigate to={LOGIN} />;
// };

const privateRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute />,

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
            element: <AnimalList />,
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
