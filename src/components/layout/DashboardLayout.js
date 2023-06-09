import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
const DashboardLayout = () => {
  const [isActive, setActive] = useState(false);

  const location = useLocation();

  return (
    <div className="d-flex dashboard-layout">
      <span className="hamburger-icon" onClick={() => setActive(!isActive)}>
        {!isActive ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            width={30}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            width={30}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </span>
      <div className="px-0">
        <Sidebar activeClass={isActive} setActiveClass={setActive} />
      </div>
      {location.pathname !== "/dashboard/user/create-request" ? (
        <div className="ms-auto dashboard dashboard-padding">
          <Outlet />
        </div>
      ) : null}
      {location.pathname === "/dashboard/user/create-request" && (
        <div className="ms-auto dashboard px-0 bg-dark-green">
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
