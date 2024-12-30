import * as React from "react";
import { IRouteConfig } from "../../interfaces/IRouteConfig";

const routes: IRouteConfig[] = [
  {
    path: "/webadmin",
    name: "Login",
    key: "webadmin",
    element: React.lazy(() => import("./LoginExternal")),
  },
];

export default routes;
