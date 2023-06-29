import React, { createContext, useContext } from "react";
import routes from "../components/data/routes.json";

const RouteContext = createContext<any[]>([]);

export const useRouteContext = () => useContext(RouteContext);

export const RouteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <RouteContext.Provider value={routes}>{children}</RouteContext.Provider>
  );
};
