import React, { useState, useEffect } from 'react';
import * as userService from '../../services/userService';

const EditUserForm = ({ selectedEmployee, setIsFormOn, handleEmployeeUpdate }) => {
  const [formData, setFormData] = useState({ name: '', role: '' });

  useEffect(() => {
    if (selectedEmployee) {
      setFormData({
        name: selectedEmployee.name || '',
        role: selectedEmployee.role || ''
      });
    }
  }, [selectedEmployee]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
    //   console.log('form data', formData);
      const updatedUser = await userService.update(selectedEmployee._id, formData);
      handleEmployeeUpdate(updatedUser)
      setIsFormOn(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        onChange={handleChange}
        value={formData.name}
      />

      <label htmlFor="role">Role</label>
      <select
        name="role"
        id="role"
        value={formData.role}
        onChange={handleChange}
      >
        <option value="">--- Select Role ---</option>
        <option value="admin">Admin</option>
        <option value="employee">Employee</option>
      </select>

      <button type="button" onClick={() => setIsFormOn(false)}>Cancel</button>
      <button type="submit">Update</button>
    </form>
  );
};

export default EditUserForm;
