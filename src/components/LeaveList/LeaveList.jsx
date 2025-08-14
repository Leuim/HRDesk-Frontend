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
   <> 
<div className="leave-requests-container">
  <h2><i className="fas fa-clipboard-list me-2"></i>{user.name} Leave Requests</h2>
  
  <div className="table-responsive">
    <table className="leave-requests-table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Dates</th>
          <th>Duration</th>
          <th>Status</th>
          <th>Review By</th>
          <th>Reject Reason</th>
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
            <td>{request.duration} days</td> 
            <td className={`status-${request.status.toLowerCase()}`}>
              <span className="badge">
                {request.status}
                {request.status === 'approved' && <i className="fas fa-check-circle ms-2"></i>}
                {request.status === 'rejected' && <i className="fas fa-times-circle ms-2"></i>}
                {request.status === 'pending' && <i className="fas fa-clock ms-2"></i>}
              </span>
            </td>
            <td>{request.reviewBy || 'Pending'}</td>
            <td>{request.rejectionReason || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
    </>

  )

}


export default ListLeaves