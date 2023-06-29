import React, { Suspense } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Breadcrumb from "./components/Breadcrumb";
import routeData from "./components/data/routes.json";
import { Loading } from "./components/Loading";

const components: { [key: string]: React.LazyExoticComponent<any> } = {
  "./User/Login": React.lazy(() => import("./User/Login")),
  "pages/dashboard": React.lazy(() => import("./pages/Dashboard")),
  "pages/dashboard/analysis": React.lazy(
    () => import("./pages/dashboard/Analysis")
  ),
  "pages/dashboard/monitor": React.lazy(
    () => import("./pages/dashboard/Monitor")
  ),
  "pages/dashboard/workplace": React.lazy(
    () => import("./pages/dashboard/Workplace")
  ),
  "./404": React.lazy(() => import("./pages/NotFound")),
};

const App: React.FC = () => {
  return (
    <Router>
      <Sidebar routes={routeData} />
      <div>
        <Breadcrumb routes={routeData} />
        <Suspense fallback={<Loading />}>
          <Route>
            {routeData.map(
              (route, index) =>
                route.path !== "*" && (
                  <Route
                    key={index}
                    path={route.path}
                    component={components[route.component!]}
                  >
                    {route.routes &&
                      route.routes.map((subRoute: any, subIndex) => (
                        <Route
                          key={subIndex}
                          path={subRoute.path!}
                          component={components[subRoute.component!]}
                        />
                      ))}
                  </Route>
                )
            )}
          </Route>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
