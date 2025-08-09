import React, { useContext } from 'react'
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

const App = () => {
  const { user } = useContext(UserContext)
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />}>
          <Route path="employees-records" element={<EmployeesRecords />} />
          <Route path="pending-leave-requests" element={<PendingLeaveRequests />} />
        </Route>

          <Route path='/leaveRequest' element={<LeaveForm/>} />
      <Route path='/employee-dashboard' element={<EmployeeDashboard/>}  />
      <Route path="Leaves" element={<LeaveList/>}/>

      </Routes>
    </>
  )
}

export default App