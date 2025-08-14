import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import * as authServices from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';

const SignUpForm = () => {
  const initialFormData = {
    name: '',
    password: '',
    confPassword: '',
    role: ''
  };

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState('');

  const { name, password, confPassword, role } = formData;

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const isFormInvalid = () => {
    return !(name && password && role && password === confPassword);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (!formData.name.trim()) {
      setErrorMessage('Username is required');
      return;
    }
    if (!formData.password.trim()) {
      setErrorMessage('Password is required');
      return;
    }
    if (formData.password.length < 8) {
      setErrorMessage('Password must be eight or more characters');
      return;
    }
    if (formData.password !== formData.confPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const newUser = await authServices.signUp(formData);
      setUser(newUser);
      navigate('/');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <main className="container-fluid d-flex align-items-center justify-content-center" style={{ minHeight: '70vh' }}>
      <div
        className="card shadow-lg p-4"
        style={{
          maxWidth: '400px',
          width: '100%',
          borderRadius: '1rem',
        }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold text-secondary">Sign Up</h2>
          <p className="text-secondary">Create your account by filling in the form below.</p>
        </div>

        {errorMessage && (
          <div className="alert alert-danger py-2" role="alert">
            {errorMessage}
          </div>
        )}

        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label htmlFor="name" className="form-label fw-semibold text-secondary">
              Username <span className='text-danger'>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={formData.name}
              name="name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 text-start">
            <label htmlFor="password" className="form-label fw-semibold text-secondary">
              Password <span className='text-danger'>*</span>
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 text-start">
            <label htmlFor="confPassword" className="form-label fw-semibold text-secondary">
              Confirm Password <span className='text-danger'>*</span>
            </label>
            <input
              type="password"
              className="form-control"
              id="confPassword"
              value={formData.confPassword}
              name="confPassword"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4 text-start">
            <label htmlFor="role" className="form-label fw-semibold text-secondary">
              Role <span className='text-danger'>*</span>
            </label>
            <select
              className="form-select text-center"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">--- Select Role ---</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary shadow-sm" disabled={isFormInvalid()}>
              Sign Up
            </button>
            <button
              type="button"
              className="btn btn-danger shadow-sm"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUpForm;
