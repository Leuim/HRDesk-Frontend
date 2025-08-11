import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { signIn } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('')
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
        setErrorMessage('')
        setUser(signedInUser);
        navigate('/')
      }
    } catch (err) {
      setErrorMessage(err.message)
    }
  };

  return (
    <main>
      <h1>Sign In</h1>
      {errorMessage ? (<p style={{ color: 'red' }}>{errorMessage}</p>) : null}
      <form autoComplete='off' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Username:</label>
          <input
            type='text'
            autoComplete='off'
            id='name'
            value={formData.name}
            name='name'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            autoComplete='off'
            id='password'
            value={formData.password}
            name='password'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button>Sign In</button>
          <button onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </main>
  );
};

export default SignInForm;

