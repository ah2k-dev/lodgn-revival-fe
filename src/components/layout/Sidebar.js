import React from "react";
import { Link, useLocation } from "react-router-dom";
import { UseGetRole } from "../../hooks/auth";

const Sidebar = ({ activeClass }) => {
  // conditionlly render menu items based on user role

  const location = useLocation();

  const navClass = "d-flex cursor-pointer align-items-center outline-none";

  const role = UseGetRole();
  // const role = 'user';

  const userNavs = [
    {
      route: "/dashboard/user",
      navName: "Current Requests",
    },
    {
      route: "/dashboard/user/ongoing-stays",
      navName: "Ongoing Stays",
    },
    {
      route: "/dashboard/user/requested-updates",
      navName: "Requested Updates",
    },
    {
      route: "/dashboard/user/rejected-requests",
      navName: "Rejected Requests",
    },
    {
      route: "/dashboard/user/previous-stays",
      navName: "Previous Stays",
    },
    {
      route: "/dashboard/user/manage-profile",
      navName: "Manage Profile",
    },
    {
      route: "/dashboard/user/reports",
      navName: "Reports",
    },
  ];

  const adminNavs = [
    {
      route: "/dashboard/admin",
      navName: "Current Requests",
    },
    {
      route: "/dashboard/admin/ongoing-stays",
      navName: "Ongoing Stays",
    },
    {
      route: "/dashboard/admin/requested-updates",
      navName: "Requested Updates",
    },
    {
      route: "/dashboard/admin/deferred-requests",
      navName: "Deferred Requests",
    },
    {
      route: "/dashboard/admin/manage-users",
      navName: "Manage Users",
    },
    {
      route: "/dashboard/admin/reports",
      navName: "Reports",
    },
  ];

  var navs;

  role === "admin" || role === "moderator" ? (navs = adminNavs) : (navs = userNavs);

  const logout = () => {
    localStorage.clear();
    location.reload();
  }

  return (
    <nav className={`sideNav ${ activeClass && 'active' } bg-white shadow px-4 d-flex flex-column justify-content-between pb-4 position-fixed top-0 left-0`}>
      <ul className="relative m-0 list-none py-4 px-0">
        <span>
          <h1 className="fst-italic px-4 py-3 fw-bold">LODGN</h1>
        </span>

        {navs.map((nav, i) => {
          return (
            <li className="position-relative sideNavLinks mb-3" key={i}>
              <Link
                to={nav.route}
                className={
                  location.pathname === nav.route
                    ? "active " + navClass
                    : navClass
                }
              >
                <span>{nav.navName}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      {location.pathname !== "/logout" ? (
        <div className="d-flex px-2 flex-column gap-3">
          <Link
            to="/"
            className="logoutBtn d-flex justify-content-center align-items-center py-2 fs-5 text-white"
            onClick={() => logout()}
          >
            Log - Out
          </Link>
          {role === "user" && (
            <span className="d-flex flex-column align-items-center">
              <span>Help-Desk:</span>
              <span>786-874 9988</span>
            </span>
          )}
        </div>
      ) : null}
    </nav>
  );
};

export default Sidebar;
