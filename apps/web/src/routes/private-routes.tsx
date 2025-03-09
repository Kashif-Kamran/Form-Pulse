import { Outlet, RouteObject, Navigate, useLocation } from "react-router-dom";
import {
  ANIMAL_DETAIL,
  ANIMALS_PROFILE,
  CREATE_DIET_PLAN,
  DIET_MANAGEMENT,
  EDUCATIONAL_RESOURCERS,
  FEED_INVENTORY,
  HEALTH_MONITORING,
  HOME,
  LOGIN,
  REPORTS,
  SETTINGS,
} from "@/constants/app-routes";
import FallbackSpinnerScreen from "@/components/custom-ui/fallback-spinner";
import { useMe } from "@/hooks/api/profile.hook";
import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/common/error-boundary";

const AnimalProfile = lazy(() => import("@/pages/animals/animal-profile"));
const Dashboard = lazy(() => import("@/pages/dashboard/dashboard"));
const AppLayout = lazy(() => import("@/layout/app-layout"));
const FeedInventory = lazy(() => import("@/pages/feed-inventory"));
const DietList = lazy(() => import("@/pages/diet-management/diet-list"));
const CreateDietPlanPage = lazy(
  () => import("@/pages/diet-management/create-diet-plan")
);
const AnimalList = lazy(
  () => import("@/pages/animals/animal-list/animal-list")
);
const HealthMonitoring = lazy(
  () => import("@/pages/health-monitoring/health-list")
);

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
};

const privateRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        element: (
          <Suspense fallback={<FallbackSpinnerScreen />}>
            <AppLayout />
          </Suspense>
        ),
        children: [
          {
            path: HOME,
            index: true,
            element: (
              <Suspense fallback={<FallbackSpinnerScreen />}>
                <Dashboard />
              </Suspense>
            ),
          },
          {
            path: ANIMALS_PROFILE,
            element: (
              <Suspense fallback={<FallbackSpinnerScreen />}>
                <AnimalList />
              </Suspense>
            ),
          },
          {
            path: ANIMAL_DETAIL(),
            element: (
              <Suspense fallback={<FallbackSpinnerScreen />}>
                <AnimalProfile />
              </Suspense>
            ),
          },
          {
            path: DIET_MANAGEMENT,
            element: (
              <Suspense fallback={<FallbackSpinnerScreen />}>
                <DietList />
              </Suspense>
            ),
          },
          {
            path: CREATE_DIET_PLAN,
            element: (
              <Suspense fallback={<FallbackSpinnerScreen />}>
                <CreateDietPlanPage />
              </Suspense>
            ),
          },
          {
            path: FEED_INVENTORY,
            element: (
              <Suspense fallback={<FallbackSpinnerScreen />}>
                <FeedInventory />
              </Suspense>
            ),
          },
          {
            path: HEALTH_MONITORING,
            element: (
              <Suspense fallback={<FallbackSpinnerScreen />}>
                <HealthMonitoring />
              </Suspense>
            ),
          },
          {
            path: EDUCATIONAL_RESOURCERS,
            element: (
              <Suspense fallback={<FallbackSpinnerScreen />}>
                <div>Educational Resources</div>
              </Suspense>
            ),
          },
          {
            path: REPORTS,
            element: (
              <Suspense fallback={<FallbackSpinnerScreen />}>
                <div>Reports</div>
              </Suspense>
            ),
          },
          {
            path: SETTINGS,
            element: (
              <Suspense fallback={<FallbackSpinnerScreen />}>
                <div>Settings</div>
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
];

export { privateRoutes };
