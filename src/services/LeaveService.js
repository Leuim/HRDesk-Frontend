// services/leaveService.js
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`;

export const getLeaveRequests = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/leaveRequest?employee=${userId}`, { 
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.err || 'Failed to fetch requests');
    return data;
  } catch (err) {
    console.error('LeaveService Error:', err.message);
    throw err;
  }
};

export const createLeaveRequest = async (requestData) => {
  try {
    const res = await fetch(`${BASE_URL}/leaveRequest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(requestData)
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.err || 'Failed to submit request');
    }

    return await res.json();
  } catch (err) {
    console.error('LeaveService Error:', err);
    throw err;
  }
};

export const getLeaveBalance = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/leaveBalance/${userId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch balance');
    }

    return await res.json();
  } catch (err) {
    console.error('LeaveService Error:', err);
    throw err;
  }
};