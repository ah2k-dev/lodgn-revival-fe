import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {

    // conditionlly render menu items based on user role

    const location = useLocation();

  const navClass = "d-flex cursor-pointer align-items-center outline-none";

  const navs = [
  {
    id:1,
    route:'/dashboard/user',
    navName:'Current Requests'
  },
  {
    id:2,
    route:'/dashboard/ongoing-stays',
    navName:'Ongoing Stays'
  },
  {
    id:3,
    route:'/dashboard/previous-stays',
    navName:'Previous Stays'
  },
  {
    id:4,
    route:'/dashboard/reports',
    navName:'Reports'
  },
]

  return (
    <nav
    className="sideNav bg-white shadow px-4 d-flex flex-column justify-content-between pb-4 position-fixed top-0 left-0"
  >
    <ul className="relative m-0 list-none py-4 px-0">
      <span>
        <h1 className="text-2xl italic p-4 fw-bold">LODGN</h1>
      </span>
     {
        navs.map((nav) => {
          return (
          <li className="position-relative sideNavLinks mb-4" key={nav.id}>
          <Link
            to={nav.route}
            className={ location.pathname === nav.route ? "active " + navClass : navClass}
          >
            <span>{nav.navName}</span>
          </Link>
        </li>
        )
        })
     }
    </ul>
    { location.pathname !== '/logout' ?
    <div className="d-flex px-2 flex-column gap-3">
      <Link to='/' className="logoutBtn d-flex justify-content-center align-items-center py-2 fs-5 text-white">Log - Out</Link>
      <span className="d-flex flex-column align-items-center">
        <span>
          Help-Desk:
        </span>
        <span>786-874 9988</span>
      </span>
    </div> : null
    }
  </nav>
  )
}

export default Sidebar