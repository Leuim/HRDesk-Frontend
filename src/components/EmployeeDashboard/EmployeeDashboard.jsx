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
    
      <h1>Hello  {user.name}, Welcome to Employee dashboard</h1>

    <div class="container text-center py-5" >

  <h1 class='dashboard-title'>  Leave Balance</h1>
      {balance && (
        <>
        
        <div class='dashboard-card'> 
                
         <div class='card-1 '> <p>Annual: </p>  {balance.annual} days</div>
          <div class='card-2'><p>Sick: </p>{balance.sick} days</div>
         <div class='card-3'><p>Other:</p>{balance.others} days</div>
        </div>
        </>
      )}

       <div class='dashboard-btn'> 
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