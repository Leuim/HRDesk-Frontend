import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import SignUpForm from './components/SignUpForm/SignUpForm'
import { UserContext } from './contexts/UserContext'
import SignInForm from './components/SignInForm/SignInForm'
import EmployeeDashboard from './components/EmployeeDashboard/EmployeeDashboard'
import LeaveForm from './components/LeaveForm/LeaveForm'
import LeaveList from './components/LeaveList/LeaveList'
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
      <Route path='/leaveRequest' element={<LeaveForm/>} />
      <Route path='/employee-dashboard' element={<EmployeeDashboard/>}  />
      <Route path="Leaves" element={<LeaveList/>}/>
    </Routes>
    
    </>
  )
}

export default App