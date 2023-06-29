import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./styles/sidebar.css";

interface SidebarProps {
  routes: any[];
}

const Sidebar: React.FC<SidebarProps> = ({ routes }) => {
  const [showChild, setShowChild] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const renderMenuItems = (routes: any[], parentKey?: string) => {
    return routes.map((route, index) => {
      if (route.hideInMenu || !route.hasOwnProperty("name")) return null;

      const key = parentKey ? `${parentKey}-${index}` : String(index);

      if (route.routes && showChild && route.name == selectedItem) {
        return (
          <li key={index}>
            <NavLink
              to={route.path}
              activeClassName="active"
              exact={route.exact}
              className="nav-options"
              onClick={() => {
                setSelectedItem(route.name);
                setShowChild(!showChild);
              }}
            >
              <div className="nav-item">
                <div className="nav-item-name">
                  {route.icon && (
                    <div id="item-icon">
                      <Icon icon={`ic:${route.icon}`} fontSize={23} />
                    </div>
                  )}
                  <div className="item-name">
                    {route.name?.charAt(0).toUpperCase() + route.name?.slice(1)}
                  </div>
                </div>
                {route.routes && route.routes?.length > 0 && (
                  <div className="drop-down-icon">
                    <Icon
                      icon={`ic:round-keyboard-arrow-${
                        showChild && selectedItem == route.name ? "up" : "down"
                      }`}
                      fontSize={23}
                    />
                  </div>
                )}
              </div>
            </NavLink>
            <ul key={key}>{renderMenuItems(route.routes, key)}</ul>
          </li>
        );
      }

      return (
        <li key={key}>
          <NavLink
            to={route.path}
            activeClassName="active"
            exact={route.exact}
            className="nav-options"
            onClick={() => {
              setSelectedItem(route.name);
              setShowChild(!showChild);
            }}
          >
            <div className="nav-item">
              <div className="nav-item-name">
                {route.icon && (
                  <div id="item-icon">
                    <Icon icon={`ic:${route.icon}`} fontSize={23} />
                  </div>
                )}
                <div className="item-name">
                  {route.name?.charAt(0).toUpperCase() + route.name?.slice(1)}
                </div>
              </div>
              {route.routes && route.routes?.length > 0 && (
                <div className="drop-down-icon">
                  <Icon
                    icon={`ic:round-keyboard-arrow-${
                      showChild && selectedItem == route.name ? "up" : "down"
                    }`}
                    fontSize={23}
                  />
                </div>
              )}
            </div>
          </NavLink>
        </li>
      );
    });
  };

  return (
    <div className="sidebar">
      <nav className="navbar-container">{renderMenuItems(routes)}</nav>
    </div>
  );
};

export default Sidebar;
