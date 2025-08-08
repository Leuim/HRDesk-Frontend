import React, { useContext } from 'react'
import { Link } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
const NavBar = () => {
  const { user, setUser } = useContext(UserContext)

  const handleSignout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }
  return (
    <nav>
      <ul>
        {user ? (
          <>
            <li><Link to='/' onClick={handleSignout}>Sign Out</Link></li>
            {user.role === 'admin' ? (<>
              <li><Link to='/admin-dashboard'>Admin dashboard</Link></li>
              <li><Link to='/admin-dashboard/pending-leave-requests'>Pending Leave Requests</Link></li>
              <li><Link to='/admin-dashboard/employees-records'>View Employees Records</Link></li>
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