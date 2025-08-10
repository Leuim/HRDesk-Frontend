import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import PendingLeaveRequests from '../PendingLeaveRequests/PendingLeaveRequests'
import EmployeesRecords from '../EmployeesRecords/EmployeesRecords'

const AdminDashboard = ({pendingRequestCount}) => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  return (
    <>
      <h1>Hello {user.name}, Welcome to admin dashboard</h1>
      <div>
        <h2>Pending Leave Requests</h2>
        <p>{pendingRequestCount} Pending Leave requests remaining</p>
      </div>
      <button onClick={() => navigate('/employees-records')}>Employees Records</button>
      <button onClick={() => navigate('/pending-leave-requests')}>Pending Leave Requests</button>
    </>
  )
}

export default AdminDashboard
