import React, { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { useNavigate } from 'react-router'
import logoHD from '../../assets/logohd.png'

const Landing = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  return (
    <div
      className="container d-flex flex-column text-center align-items-center"
      style={{ minHeight: '70vh' }}
    >
      <h1 className="my-5">
        {user ? `Welcome to HRDesk, ${user.name}!` : 'Welcome to HRDesk'}
      </h1>
      <img className='justify-content-center' src={logoHD} alt="logo" width='400' height='300' />
      <div
        className="card mx-auto shadow-lg mt-auto"
        style={{
          maxWidth: '500px',
          borderRadius: '1rem'
        }}
      >
        <div className="card-body">
          <p className="card-text text-secondary mb-4">
            {user
              ? user.role === 'admin'
                ? 'Manage leave requests and keep the team organized.'
                : 'Request leave and track your leave balance easily.'
              : 'An easy way for employees to request leave and for admins to manage them.'}
          </p>

          <button
            className="btn btn-primary w-100"
            onClick={() =>
              navigate(
                user ? (user.role === 'admin' ? '/admin-dashboard' : '/employee-dashboard') : '/sign-in'
              )
            }
          >
            {user
              ? user.role === 'admin'
                ? 'Go to Admin Dashboard'
                : 'Go to Employee Dashboard'
              : 'Sign In'}
          </button>
        </div>
      </div>
    </div>

  )
}

export default Landing
