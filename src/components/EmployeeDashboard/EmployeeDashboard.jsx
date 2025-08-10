//EmployeeDashboared
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { getLeaveBalance } from '../../services/LeaveService';
import { Link } from 'react-router-dom';

const EmployeeDashboard = () => {
  const { user } = useContext(UserContext);
  const [balance, setBalance] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getLeaveBalance(user._id);
        setBalance(data); console.log(balance);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); 
        
      }
    };

    if (user?._id) loadData();
  }, [user?._id]);

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
