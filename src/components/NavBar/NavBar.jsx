import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import { useNavigate } from 'react-router-dom'
const NavBar = () => {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const handleSignout = () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/')
  }
  return (
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        {user ? (
          <>
            <li><Link to='/' onClick={handleSignout}>Sign Out</Link></li>
            {user.role === 'admin' ? (<>
              <li><Link to='/admin-dashboard'>Admin dashboard</Link></li>
              <li><Link to='/pending-leave-requests'>Pending Leave Requests</Link></li>
              <li><Link to='/employees-records'>View Employees Records</Link></li>
              <li><Link to='/all-reviewed-leave-request'>All Reviewed Leave Requests</Link></li>
          </>
            ) : (
              <li><Link to='/employee-dashboard'>Employee dashboard</Link></li>
            )}
          </>
        ) : (
          <>
            <li><Link to='/sign-in'>Sign In</Link></li>
            <li><Link to='/sign-up'>Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default NavBar