// EmployeeDashboard.js

import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { getLeaveBalance } from '../../services/LeaveService';
import { Link } from 'react-router-dom';

const EmployeeDashboard = () => {
  const { user } = useContext(UserContext); // Use context to get user info
  const [balance, setBalance] = useState(null); // Initialize with null
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors during API call

  // Log user._id to check if it’s being set correctly
  useEffect(() => {
    console.log('User _id:', user?._id); // Debugging step
    if (user?._id) {
      loadData(); // Proceed with loading data only if _id is available
    }
  }, [user?._id]); // Run when user._id changes

  // Load data from API
  const loadData = async () => {
    try {
      const data = await getLeaveBalance(user._id); // Fetch balance from API
      console.log('Fetched balance:', data); // Debugging step to see the data structure
      // Check if data is an array and extract the first element
      if (Array.isArray(data) && data.length > 0) {
        setBalance(data[0]); // Set balance to the first item in the array
      } else {
        setError('No balance data available');
      }
    } catch (err) {
      setError(err.message); // Set error state if the API call fails
    } finally {
      setLoading(false); // Once the data is fetched, stop loading
    }
  };

  // Show loading state while data is being fetched
  if (loading) return <div>Loading...</div>;

  // Show error state if there’s an issue with fetching data
  if (error) return <div>Error: {error}</div>;

  // Check the balance and make sure it's loaded before rendering
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
        <div>No leave balance data available.</div> // Fallback message if balance is null or undefined
      )}

      {/* Button to request leave */}
      <button> 
        <Link to="/leaveRequest" className="btn">
          Request Leave
        </Link> 
      </button>

      {/* Button to view leave requests */}
      <button> 
        <Link to="/Leaves" className="btn">
          View My Requests
        </Link>
      </button>
    </div>
  );
};

export default EmployeeDashboard;
