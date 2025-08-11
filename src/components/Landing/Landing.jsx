import React, { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { useNavigate } from 'react-router'

const Landing = ({pendingRequestCount}) => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  return (
    <div >
      {user ? (
        <>
          <h1>Welcome to HRDesk, {user.name}!</h1>
          <p>
            {user.role === 'admin'
              ? 'Manage leave requests and keep the team organized.'
              : 'Request leave and track your leave balance easily.'}
          </p>

          {user.role === 'admin' ? (
            <>
              <button onClick={() => navigate('/admin-dashboard')}>Admin Dashboard</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/employee-dashboard')}>Employee Dashboard</button>
            </>
          )}
        </>
      ) : (
        <>
          <h1>Welcome to HRDesk</h1>
          <p>
            An easy way for employees to request leave and for admins to manage them.
          </p>
          <button onClick={() => navigate('/sign-in')}>Sign In</button>
        </>
      )}
    </div>
  )
}

export default Landing
