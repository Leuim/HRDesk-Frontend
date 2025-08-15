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
  let isMounted = true; 
  
  const loadData = async () => {
    try {
      setError(null);
      setLoading(true);
      
      const data = await getLeaveBalance(user._id);
      
      if (isMounted) {
        setBalance(data);
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
    isMounted = false; 
  };
}, [user?._id]); 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (

    <>
    
      <h1>Hello  {user.name}, Welcome to Employee dashboard</h1>

    <div className="container text-center py-5" >

  <h1 className='dashboard-title'>  Leave Balance</h1>
      {balance && (
        <>
        
        <div className='dashboard-card'> 
                
         <div className='card-1 '> <p>Annual: </p>  {balance.annual} days</div>
          <div className='card-2'><p>Sick: </p>{balance.sick} days</div>
         <div className='card-3'><p>Other:</p>{balance.others} days</div>
        </div>
        </>
      )}

       <div className='dashboard-btn'> 
         <button  className='btn-new-leave'> <Link to="/leaveRequest" >
          Request Leave
        </Link> </button>
       
        <button className='btn-list-leave'> 
        <Link to="/Leaves">
          View My Requests
        </Link>
        </button>
      </div>
      
    </div>
     </>
  );
};

export default EmployeeDashboard;