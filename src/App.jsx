import React, { useContext } from 'react'
import { Route, Routes } from 'react-router'
import NavBar from './components/NavBar/NavBar'
import SignUpForm from './components/SignUpForm/SignUpForm'
import { UserContext } from './contexts/UserContext'

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
    </Routes>
    </>
  )
}

export default App