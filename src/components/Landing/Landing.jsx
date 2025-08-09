import React from 'react'
import { UserContext } from '../../contexts/UserContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router'

const Landing = () => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    return (
<div>
  {user ? (
    user.role === 'admin' ? (
      <>
        <h1>Welcome to HRDesk {user.name}.</h1>
        <button onClick={()=>navigate('/admin-dashboard')}>Admin Dashboard</button>
      </>
    ) : (
      <>
        <h1>Welcome to HRDesk {user.name}.</h1>
        <button onClick={()=>navigate('/employee-dashboard')}>Employee Dashboard</button>
      </>
    )
  ) : (
    <>
    <h1>Welcome to HRDesk, Please Sign In.</h1>
    <button onClick={() =>navigate('/sign-in')}>Sign In</button>
    </>
  )}
</div>
    )}
export default Landing