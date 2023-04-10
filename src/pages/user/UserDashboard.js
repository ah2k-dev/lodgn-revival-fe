import React from 'react'
import CurrentRequest from '../../pages/user/CurrentRequest'

const UserDashboard = () => {
  return (
    <div className='dashboard d-flex flex-column justify-content-between gap-5 align-items-start px-5 py-5'>
      <CurrentRequest />
    </div>
  )
}

export default UserDashboard