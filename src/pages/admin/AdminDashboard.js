import React from 'react'
import CurrentRequest from './CurrentRequest'

const AdminDashboard = () => {
  return (
    <div className='dashboard d-flex flex-column justify-content-between gap-5 align-items-start px-5 py-5'>
      <CurrentRequest />
    </div>
  )
}

export default AdminDashboard