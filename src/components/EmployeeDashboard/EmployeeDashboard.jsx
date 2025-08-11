//EmployeeDashboared
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
  let isMounted = true; // Flag to track mounted state
  
  const loadData = async () => {
    try {
      setError(null);
      setLoading(true);
      
      const data = await getLeaveBalance(user._id);
      
      if (isMounted) {
        setBalance(data);
        console.log('Updated balance:', data); // Log the NEW data directly
      }
    } catch (err) {
      if (isMounted) {
        setError(err.message);
        console.error('Error fetching balance:', err);
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  if (user?._id) {
    loadData();
  } else {
    setLoading(false);
  }

  return () => {
    isMounted = false; // Cleanup function
  };
}, [user?._id]); // Proper dependency array

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (

    <>
      <h1>Hello {user.name}, Welcome to Employee dashboard</h1>

    <div>

      <h2>Leave Balance</h2>
      {balance && (
        <>
          <p>Annual: {balance.annual} days</p>
          <p>Sick: {balance.sick} days</p>
         <p>Other: {balance.others} days</p>
             
        </>
      )}


        <button> <Link to="/leaveRequest" className="btn">
          Request Leave
        </Link> </button>
       
        <button> 
        <Link to="/Leaves" className="btn">
          View My Requests
        </Link>
        </button>
       
      
    </div>
     </>
  );
};

export default EmployeeDashboard;