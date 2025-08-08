import React, { useContext } from 'react'
import { Route, Routes } from 'react-router'
import NavBar from './components/NavBar/NavBar'
import SignUpForm from './components/SignUpForm/SignUpForm'
import { UserContext } from './contexts/UserContext'
import SignInForm from './components/SignInForm/SignInForm'
import AdminDashboard from './components/AdminDashboard/AdminDashboard'
import EmployeesRecords from './components/EmployeesRecords/EmployeesRecords'
import PendingLeaveRequests from './components/PendingLeaveRequests/PendingLeaveRequests'

const App = () => {
  const {user} = useContext(UserContext)
  return (
    <>
    <NavBar/>
    {user ?(<h2>Welcome to HRDesk {user.name}</h2>):
    (<h2>Welcome to HRDesk Please login</h2>)}
    <Routes>
      <Route path='/' element={<h1>Home</h1>}/>
      <Route path='/sign-up' element={<SignUpForm/>}/>
      <Route path='/sign-in' element={<SignInForm/>}/>
       <Route path="/admin-dashboard" element={<AdminDashboard />}>
          <Route path="employees-records" element={<EmployeesRecords />} />
          <Route path="pending-leave-requests" element={<PendingLeaveRequests />} />
        </Route>
    </Routes>
    </>
  )
}

export default App