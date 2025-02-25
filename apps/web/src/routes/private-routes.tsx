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
<<<<<<< Updated upstream
import Dashboard from "@/pages/dashboard/dashboard";
import AppLayout from "@/layout/app-layout";
import AnimalProfiles from "@/pages/animal-profiles/animal-profiles";
const PirvateRouteGuard = () => {
  return isAuthenticated ? <Outlet /> : <Navigate to={LOGIN} />;
=======
import FallbackSpinnerScreen from "@/components/custom-ui/fallback-spinner";
import { useMe } from "@/hooks/api/profile.hook";
import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/common/error-boundary";

const Dashboard = lazy(() => import("@/pages/dashboard/dashboard"));
const AppLayout = lazy(() => import("@/layout/app-layout"));
const AnimalList = lazy(
  () => import("@/pages/animals/animal-list/animal-list")
);
const CreateAnimal = lazy(() => import("@/pages/animals/create-animal"));

const ProtectedRoute = () => {
  const { data, isLoading } = useMe();
  const location = useLocation();

  if (isLoading) {
    return <FallbackSpinnerScreen />;
  }

  if (!data) {
    return <Navigate to={LOGIN} state={{ from: location }} replace />;
  }

  return <Outlet />;
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            element: <AnimalProfiles />,
=======
            element: (
              <Suspense fallback={<FallbackSpinnerScreen />}>
                <AnimalList />
                <CreateAnimal/>
              </Suspense>
            ),
>>>>>>> Stashed changes
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
