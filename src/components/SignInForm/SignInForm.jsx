import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { signIn } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const signedInUser = await signIn(formData);
      if (signedInUser) {
        setErrorMessage('');
        setUser(signedInUser);
        navigate('/');
      }
    } catch (err) {
      setErrorMessage(err.message);
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
          <h2 className="fw-bold text-secondary">Sign In</h2>
          <p className="text-secondary">Welcome back! Please enter your credentials.</p>
        </div>

        {errorMessage && (
          <div className="alert alert-danger py-2" role="alert">
            {errorMessage}
          </div>
        )}

        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label htmlFor="name" className="form-label fw-semibold text-secondary">
              Username
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

          <div className="mb-4 text-start">
            <label htmlFor="password" className="form-label fw-semibold text-secondary">
              Password
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

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary shadow-sm">
              Sign In
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

export default SignInForm;
