// EmployeeDashboard.js

import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { getLeaveBalance } from '../../services/LeaveService';
import { Link } from 'react-router-dom';

const EmployeeDashboard = () => {
  const { user } = useContext(UserContext); 
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  
  useEffect(() => {
    console.log('User _id:', user?._id); 
    if (user?._id) {
      loadData(); 
    }
  }, [user?._id]); 

 
  const loadData = async () => {
    try {
      const data = await getLeaveBalance(user._id); //
      console.log('Fetched balance:', data); 
      setBalance(data); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); 
    }
  };

  
  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Leave Balance</h2>
      {balance ? (
        <>
          <p>Annual: {balance.annual} days</p>
          <p>Sick: {balance.sick} days</p>
          <p>Paternity: {balance.paternity} days</p>
          <p>Other: {balance.others} days</p>
        </>
      ) : (
        <div>No leave balance data available.</div> 
      )}

      {}
      <button> 
        <Link to="/leaveRequest" className="btn">
          Request Leave
        </Link> 
      </button>

      {}
      <button> 
        <Link to="/Leaves" className="btn">
          View My Requests
        </Link>
      </button>
    </div>
  );
};

export default EmployeeDashboard;
