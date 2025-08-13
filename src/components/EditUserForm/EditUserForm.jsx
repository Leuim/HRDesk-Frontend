import React, { useState, useEffect } from 'react';
import * as userService from '../../services/userService';
import * as leaveBalanceService from '../../services/leaveBalanceService';

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
    if (['annual', 'sick', 'others'].includes(evt.target.name)) {
      setFormData({ ...formData, leaveBalance: { ...formData.leaveBalance, [evt.target.name]: Number(evt.target.value) } });
    } else {
      setFormData({ ...formData, [evt.target.name]: evt.target.value });
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
    <div 
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 10 }}
      onClick={() => setIsFormOn(false)} 
    >
      <div 
        className="card p-4 rounded shadow"
        style={{ minWidth: '400px', maxWidth: '500px', zIndex: 11 }}
        onClick={(evt) => evt.stopPropagation()} 
      >
        <h4 className="card-text text-secondary mb-3 text-center">Edit Employee</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-secondary">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="role" className="form-label text-secondary">Role</label>
            <select
              className="form-select text-center"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="annual" className="form-label text-secondary">Annual Leaves</label>
            <input
              type="number"
              className="form-control"
              id="annual"
              name="annual"
              value={formData.leaveBalance.annual}
              onChange={handleChange}
              min={0}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="sick" className="form-label text-secondary">Sick Leaves</label>
            <input
              type="number"
              className="form-control"
              id="sick"
              name="sick"
              value={formData.leaveBalance.sick}
              onChange={handleChange}
              min={0}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="others" className="form-label text-secondary">Other Leaves</label>
            <input
              type="number"
              className="form-control"
              id="others"
              name="others"
              value={formData.leaveBalance.others}
              onChange={handleChange}
              min={0}
            />
          </div>

          <div className="d-flex justify-content-center  gap-2">
            <button 
              type="button" 
              className="btn btn-danger w-100"
              onClick={() => setIsFormOn(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary w-100">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;
