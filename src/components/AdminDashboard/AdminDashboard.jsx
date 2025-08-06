import React, { useEffect, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router'


const AdminDashboard = () => {
  const [pendingRequest, setPendingRequest] = useState(0)
  const {user} = useContext(UserContext)
  const navigate = useNavigate()



  return (
    <>
      <h1>Helle {user.name}, Welcome to admin dashboard</h1>
      <div>
        <h2>Pending Leave Requests</h2>
        <p>{pendingRequest} Pending Leave requests remaining</p>
      </div>
      <button onClick={()=>navigate('/employees-records')}>Employees Records</button>
      <button onClick={()=> navigate('/pending-requests')}>Pending Leave Requests</button>
    </>
  )
}

export default AdminDashboard