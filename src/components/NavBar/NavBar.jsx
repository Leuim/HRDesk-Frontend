import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <nav
      className="navbar px-3"
      style={{ backgroundColor: '#022e2eff' }}
    >
      <Link
        className="navbar-brand fw-bold"
        to="/"
        >
        <img src={logo} alt="logo" width="50" height="50"></img>
      </Link>

      <div className="d-flex align-items-center">
        <Link
          className=" nav-link text-white px-2"
          to="/"
          style={{ textDecoration: 'none' }}
        >
          <span className='btn btn-primary'>Home</span>
        </Link>

        {user ? (
          <>
            <Link
              className="nav-link text-white px-2"
              to="/"
              onClick={handleSignout}
              style={{ textDecoration: 'none' }}
            >
               <span className='btn btn-primary'>Sign Out</span>
            </Link>

            {user.role === 'admin' ? (
              <>
                <Link
                  className="nav-link text-white px-2"
                  to="/admin-dashboard"
                  style={{ textDecoration: 'none' }}
                >
                   <span className='btn btn-primary'>Admin Dashboard</span>
                </Link>
                <Link
                  className="nav-link text-white px-2"
                  to="/pending-leave-requests"
                  style={{ textDecoration: 'none' }}
                >
                   <span className='btn btn-primary'>Pending Leave Requests</span>
                </Link>
                <Link
                  className="nav-link text-white px-2"
                  to="/employees-records"
                  style={{ textDecoration: 'none' }}
                >
                   <span className='btn btn-primary'>Employees Records</span>
                </Link>
                <Link
                  className="nav-link text-white px-2"
                  to="/all-reviewed-leave-request"
                  style={{ textDecoration: 'none' }}
                >
                   <span className='btn btn-primary'>All Reviewed Leave Requests</span>
                </Link>
              </>
            ) : (
              <Link
                className="nav-link text-white px-2"
                to="/employee-dashboard"
                style={{ textDecoration: 'none' }}
              >
                 <span className='btn btn-primary'>Employee Dashboard</span>
              </Link>
            )}
          </>
        ) : (
          <>
            <Link
              className="nav-link text-white px-2"
              to="/sign-in"
              style={{ textDecoration: 'none' }}
            >
               <span className='btn btn-primary'>Sign In</span>
            </Link>
            <Link
              className="nav-link text-white px-2"
              to="/sign-up"
              style={{ textDecoration: 'none' }}
            >
               <span className='btn btn-primary'>Sign Up</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
