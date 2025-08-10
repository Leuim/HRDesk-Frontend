import React, { useState, useEffect } from 'react';
import * as userService from '../../services/userService';
import * as leaveBalanceService from '../../services/leaveBalanceService'

const EditUserForm = ({ selectedEmployee, setIsFormOn, handleEmployeeUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    leaveBalance: {
      annual: '',
      sick: '',
      others: ''
    }
  });

  useEffect(() => {
    if (selectedEmployee) {
      setFormData({
        name: selectedEmployee.name || '',
        role: selectedEmployee.role || '',
        leaveBalance: {
          annual: selectedEmployee.leavebalance?.annual || 0,
          sick: selectedEmployee.leavebalance?.sick || 0,
          others: selectedEmployee.leavebalance?.others || 0
        }
      });
    }
  }, [selectedEmployee]);

  const handleChange = (evt) => {
    if (evt.target.name === 'annual' || evt.target.name === 'sick' || evt.target.name === 'others') {
      setFormData({ ...formData, leaveBalance: { ...formData.leaveBalance, [evt.target.name]: Number(evt.target.value) } });
    } else {
      setFormData({ ...formData, [evt.target.name]: evt.target.value })
    }
  };


 const handleSubmit = async (evt) => {
  evt.preventDefault();
  try {
    const updatedUser = await userService.update(selectedEmployee._id, {
      name: formData.name,
      role: formData.role,
    });

    const updatedLeaveBalance = await leaveBalanceService.updateLeaveBalance(
      selectedEmployee.leavebalance._id,
      formData.leaveBalance
    );

    handleEmployeeUpdate({
      ...updatedUser,
      leavebalance: updatedLeaveBalance,
    });

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
      <label htmlFor="annual">Annual</label>
      <input
        type="number"
        name="annual"
        value={formData.leaveBalance.annual}
        onChange={handleChange}
        min={0}
      />

      <label htmlFor="sick">Sick</label>
      <input
        type="number"
        name="sick"
        value={formData.leaveBalance.sick}
        onChange={handleChange}
        min={0}
      />

      <label htmlFor="others">Others</label>
      <input
        type="number"
        name="others"
        value={formData.leaveBalance.others}
        onChange={handleChange}
        min={0}
      />

      <button type="button" onClick={() => setIsFormOn(false)}>Cancel</button>
      <button type="submit">Update</button>
    </form>
  );
};

export default EditUserForm;
