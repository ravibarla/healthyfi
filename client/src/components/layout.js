import React, { useState } from "react";
import "../layout.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
function Layout({ children }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const userMenu = [
    { name: "Home", path: "/", icon: "ri-home-line" },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Apply doctor",
      path: "",
      icon: "ri-hospital-line",
    },
    { name: "Profile", path: "/profile", icon: "ri-user-line" },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-line",
    },
  ];
  const menuToBeRendered = userMenu;
  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          {/* <div className={`${collapsed ? "collapsed-sidebar" : "sidebar"}`}> */}
          <div className="sidebar-header">
            <h1>SH</h1>
          </div>
          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;

              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  } `}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
          </div>
        </div>
        <div className="content">
          <div className="header ">
            {collapsed ? (
              <i
                className="ri-menu-2-fill header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-line close-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}
            <div className="d-flex align-items-center px-4">
              <i className="ri-notification-line header-action-icon px-3"></i>
              <Link className="anchor" to="/profile">{user?.name}</Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
