import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { UseGetRole } from '../../hooks/auth';

const Sidebar = () => {

  // conditionlly render menu items based on user role

  const location = useLocation();

  const navClass = "d-flex cursor-pointer align-items-center outline-none";

  // const role = UseGetRole();
  const role = 'user';

  const userNavs = [
    {
      id: 1,
      route: '/dashboard/user/current-requests',
      navName: 'Current Requests',
    },
    {
      id: 2,
      route: '/dashboard/user/ongoing-stays',
      navName: 'Ongoing Stays'
    },
    {
      id: 3,
      route: '/dashboard/user/previous-stays',
      navName: 'Previous Stays'
    },
    {
      id: 4,
      route: '/dashboard/reports',
      navName: 'Reports'
    },
  ]

  const adminNavs = [
    {
      id: 1,
      route: '/dashboard/admin',
      navName: 'Current Requests',
    },
    {
      id: 2,
      route: '/dashboard/admin/ongoing-stays',
      navName: 'Ongoing Stays'
    }
  ]

  var navs;
  
  role === 'admin' ? navs = adminNavs : navs = userNavs;

  return (
    <nav
      className="sideNav bg-white shadow px-4 d-flex flex-column justify-content-between pb-4 position-fixed top-0 left-0"
    >
      <ul className="relative m-0 list-none py-4 px-0">
        <span>
          <h1 className="text-2xl fst-italic p-4 fw-bold">LODGN</h1>
        </span>

        { navs.map((nav) => {
          return (
            <li className="position-relative sideNavLinks mb-4" key={nav.id}>
              <Link
                to={nav.route}
                className={location.pathname === nav.route ? "active " + navClass : navClass}
              >
                <span>{nav.navName}</span>
              </Link>
            </li>
          )
        }) }
      </ul>
      {location.pathname !== '/logout' ?
        <div className="d-flex px-2 flex-column gap-3">
          <Link to='/' className="logoutBtn d-flex justify-content-center align-items-center py-2 fs-5 text-white">Log - Out</Link>
         { role === 'user' && <span className="d-flex flex-column align-items-center">
            <span>
              Help-Desk:
            </span>
            <span>786-874 9988</span>
          </span> }
        </div> : null
      }
    </nav>
  )
}

export default Sidebar