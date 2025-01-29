import { RouteObject, useRoutes } from "react-router-dom";
import { publicRoutes } from "./public-routes";
import { privateRoutes } from "./private-routes";

const routes: RouteObject[] = [publicRoutes, privateRoutes];

const AppRouter = () => {
  return useRoutes(routes);
};

export { AppRouter };
