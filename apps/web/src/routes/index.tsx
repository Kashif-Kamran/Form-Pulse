import { RouteObject, useRoutes } from "react-router-dom";
import { publicRoutes } from "./public-routes";
import { privateRoutes } from "./private-routes";
import GlobalLayout from "@/layout/global-layout";

const routes: RouteObject[] = [
  {
    element: <GlobalLayout />,
    children: [...publicRoutes, ...privateRoutes],
  },
];

const AppRouter = () => {
  return useRoutes(routes);
};

export { AppRouter };
