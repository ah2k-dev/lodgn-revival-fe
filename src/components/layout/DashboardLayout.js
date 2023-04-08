import { Col, Divider, Row } from 'antd'
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
const DashboardLayout = () => {

  const location = useLocation();

  return (
    <div className='d-flex dashboard-layout'>
      { location.pathname !== '/dashboard/user/payment' && <div className='px-0'><Sidebar/></div> }
      <div className={location.pathname !== '/dashboard/user/payment' ? 'ms-auto dashboard' : 'w-100 dashboard'}><Outlet/></div>
    </div>
  )
}

export default DashboardLayout