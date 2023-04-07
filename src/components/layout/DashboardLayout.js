import { Col, Divider, Row } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
const DashboardLayout = () => {
  return (
    <div className='d-flex dashboard-layout'>
      <div className='px-0'><Sidebar/></div>
      <div className='ms-auto'><Outlet/></div>
    </div>
  )
}

export default DashboardLayout