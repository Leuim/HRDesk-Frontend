import React, { useContext, useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import SignUpForm from './components/SignUpForm/SignUpForm'
import { UserContext } from './contexts/UserContext'
import SignInForm from './components/SignInForm/SignInForm'

import EmployeeDashboard from './components/EmployeeDashboard/EmployeeDashboard'
import LeaveForm from './components/LeaveForm/LeaveForm'
import LeaveList from './components/LeaveList/LeaveList'

import AdminDashboard from './components/AdminDashboard/AdminDashboard'
import EmployeesRecords from './components/EmployeesRecords/EmployeesRecords'
import PendingLeaveRequests from './components/PendingLeaveRequests/PendingLeaveRequests'
import Landing from './components/Landing/Landing'
import * as LeaveRequestService from './services/leaveRequestService'
import AllReviewedLeaveRequest from './components/AllReviewedLeaveRequest/AllReviewedLeaveRequest'


const App = () => {
  const { user } = useContext(UserContext)
  const [pendingRequestCount, setPendingRequestCount] = useState()

    useEffect(() => {
    const fetchPendingCount = async () => {
      if(user){
      const allLeaves = await LeaveRequestService.index()
      const pendingLeaves = allLeaves.filter(leave => leave.status === 'pending')
      setPendingRequestCount(pendingLeaves.length)
      } else {
        return
      }
    }
    fetchPendingCount()
  }, [])
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Landing pendingRequestCount={pendingRequestCount}/>} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />

        {user?.role === 'admin' && (
          <>
            <Route
              path='/admin-dashboard'
              element={<AdminDashboard pendingRequestCount={pendingRequestCount} />}
            />
            <Route
              path='/pending-leave-requests'
              element={<PendingLeaveRequests pendingRequestCount={pendingRequestCount} setPendingRequestCount={setPendingRequestCount} />}
            />
            <Route path='/employees-records' element={<EmployeesRecords />} />
            <Route path='/all-reviewed-leave-request' element={<AllReviewedLeaveRequest/>}/>
          </>
        )}
        <Route path='/leaveRequest' element={<LeaveForm />} />
        <Route path='/employee-dashboard' element={<EmployeeDashboard />} />
        <Route path="Leaves" element={<LeaveList />} />
      </Routes>
    </>
  )
}

export default App