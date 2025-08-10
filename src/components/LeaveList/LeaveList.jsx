import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { getLeaveRequests } from '../../services/LeaveService';
const ListLeaves = () => {
 
   const { user } = useContext(UserContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getLeaveRequests(user._id);
        setRequests(data);
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
   

 <div className="leaveRequest">
      <h2>{user.name} Leave Requests</h2>
      <table border={1} cellSpacing={5}>
        <thead>
          <tr>
            <th>Type</th>
            <th>Dates</th>
            <th>Duration</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <tr key={request._id}>
              <td>{request.leaveType}</td>
              <td>
                {new Date(request.fromDate).toLocaleDateString()} - 
                {new Date(request.toDate).toLocaleDateString()}
              </td>
              <td>{request.duration} days</td> {/* Display duration */}
              <td className={`status-${request.status}`}>
                {request.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



export default ListLeaves