import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import * as authServices from '../../services/authService'
import { UserContext } from '../../contexts/UserContext'

const SignUpForm = () => {

  const initialFormData = {
    name: '',
    password: '',
    confPassword: '',
    role: ''
  }
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialFormData)
  const [errorMessage, setErrorMessage] = useState('')

  const { name, password, confPassword, role } = formData

  const handleChange = (evt) => {
    const copyFormData = { ...formData, [evt.target.name]: evt.target.value }
    setFormData(copyFormData)
  }

  const isFormValid = () => {
    return !(name && password && role && password === confPassword)
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    if (!formData.name.trim()) {
      setErrorMessage('Username is required')
      return
    }
    if (!formData.password.trim()) {
      setErrorMessage('Password is required')
      return
    }
    if (formData.password.length < 8){
      setErrorMessage('Password must be eight or more characters')
      return
    }

    try {
      const newUser = await authServices.signUp(formData)
      setUser(newUser)
      navigate('/')
    } catch (error) {
      console.log(error.message);
    }

  }
  return (
    <main>
      {errorMessage ? (<p style={{ color: 'red' }}>{errorMessage}</p>) : null}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Username: </label>
        <input
          type="text"
          autoComplete='off'
          name="name"
          id="name"
          onChange={handleChange}
          value={formData.name}
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          autoComplete='off'
          name="password"
          id="password"
          onChange={handleChange}
          value={formData.password}
        />
        <label htmlFor="confPassword">Confirm Password: </label>
        <input type="password"
          name="confPassword"
          id="confPassword"
          onChange={handleChange}
          value={formData.confPassword}
        />
        <label htmlFor="role">Role: </label>
        <select name="role" id="role" value={formData.role} onChange={handleChange}>
          <option value="">--- Select Role ---</option>
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
        </select>
        <button type='submit' disabled={isFormValid()}>Sign Up</button>
        <button onClick={() => navigate()}>Cancel</button>
      </form>
    </main>
  )
}

export default SignUpForm