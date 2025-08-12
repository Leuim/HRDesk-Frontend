import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

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
      className="navbar navbar-expand-lg px-3"
      style={{ backgroundColor: '#022e2eff' }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-white" to="/">
          <img src={logo} alt="logo" width="50" height="50" />
        </Link>

        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="ms-auto d-flex align-items-center gap-2">
            {user ? (
              <>

                {user.role === 'admin' && (
                  <div className="dropdown">
                    <button
                      className="btn btn-primary dropdown-toggle"
                      type="button"
                      id="adminDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Admin Menu
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="adminDropdown">
                      <li>
                        <Link className="dropdown-item" to="/admin-dashboard">
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/pending-leave-requests">
                          Pending Leave Requests
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/employees-records">
                          Employees Records
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/all-reviewed-leave-request">
                          All Reviewed Leave Requests
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}

                {user.role !== 'admin' && (
                  <Link className="btn btn-primary" to="/employee-dashboard">
                    Employee Dashboard
                  </Link>
                )}

                <button
                  onClick={handleSignout}
                  className="btn btn-danger ms-2"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link className="btn btn-primary" to="/sign-in">
                  Sign In
                </Link>
                <Link className="btn btn-success" to="/sign-up">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
