import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import * as authServices from '../../services/authService'
import { UserContext } from '../../contexts/UserContext'

const SignUpForm = () => {

  const initialFormData = {
    name: '',
    password: '',
    confPassword: '',
    role:''
  }
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialFormData)

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
    // console.log(formData);
    try {
      const newUser = await authServices.signup(formData)
      // console.log(newUser);
      setUser(newUser)
      navigate('/')
    } catch (error) {
      console.log(error.message);
    }

  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name: </label>
      <input type="text" name="name" id="name" onChange={handleChange} value={formData.name} />
      <label htmlFor="password">Password: </label>
      <input type="text" name="password" id="password" onChange={handleChange} value={formData.password} />
      <label htmlFor="confPassword">Confirm Password: </label>
      <input type="text" name="confPassword" id="confPassword" onChange={handleChange} value={formData.confPassword} />
      <label htmlFor="role">Role: </label>
      <select name="role" id="role" value={formData.role} onChange={handleChange}>
      <option value="">--- Select Role ---</option>
      <option value="admin">Admin</option>
      <option value="employee">Employee</option>
      </select>
      <button type='submit' disabled={isFormValid()}>Sign Up</button>
    </form>
  )
}

export default SignUpForm