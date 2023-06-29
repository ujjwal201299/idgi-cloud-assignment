import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import "./styles/breadcrumb.css";

interface BreadcrumbProps {
  routes: any[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ routes }) => {
  const location = useLocation();

  const findRouteByPath = (path: string, routes: any[]): any | null => {
    for (const route of routes) {
      if (route.path === path) {
        return route;
      } else if (route.routes) {
        const foundRoute = findRouteByPath(path, route.routes);
        if (foundRoute) return foundRoute;
      }
    }

    return null;
  };

  const getBreadcrumbItems = (path: string): JSX.Element[] => {
    const breadcrumbItems: JSX.Element[] = [];
    const pathSegments = path.split("/").filter(Boolean);

    for (let i = 0; i < pathSegments.length; i++) {
      const currentPath = `/${pathSegments.slice(0, i + 1).join("/")}`;

      const route = findRouteByPath(currentPath, routes);

      if (route) {
        breadcrumbItems.push(
          <NavLink to={route.path}>
            <div className="breadcrum-item">
              {route.icon && (
                <div id="breadcrum-item-icon">
                  <Icon icon={`ic:${route.icon}`} fontSize={23} />
                </div>
              )}
              <div className="breadcrum-item-name">
                {route.name?.charAt(0).toUpperCase() + route.name?.slice(1)}
              </div>
            </div>
          </NavLink>
        );
      }
    }

    return breadcrumbItems;
  };

  const breadcrumbItems = getBreadcrumbItems(location.pathname);

  return (
    <div className="breadcrumb-main-container">
      {breadcrumbItems.length > 0 ? (
        <ul>
          {breadcrumbItems.map((item: any, index) => (
            <div>
              <li key={index}>{item}</li>
              {breadcrumbItems.length - 1 !== index && (
                <Icon icon="ic:round-keyboard-arrow-right" fontSize={23} />
              )}
            </div>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Breadcrumb;
