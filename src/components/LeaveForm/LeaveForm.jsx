import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { createLeaveRequest, getLeaveBalance } from '../../services/LeaveService';

const LeaveForm = () => {
  const initialFormData = {
    leaveType: '',
    fromDate: '',
    toDate: '',
    reason: '',
  };

  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState(initialFormData);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState('');
  const [balance, setBalance] = useState(null);

  // Load balance data
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (user?._id) {
          const response = await getLeaveBalance(user._id);
          setBalance(response[0] || null); // Take first item or null if empty
        }
      } catch (err) {
        console.error('Failed to load balance:', err);
        setError('Failed to load leave balance');
      }
    };
    fetchBalance();
  }, [user?._id]);

  // Calculate duration and validate
  useEffect(() => {
    if (formData.fromDate && formData.toDate) {
      const fromDate = new Date(formData.fromDate);
      const toDate = new Date(formData.toDate);
      
      if (toDate < fromDate) {
        setError('End date cannot be before start date');
        return;
      }

      const days = Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1;
      setDuration(days);

      // Validate balance if leave type selected
      if (formData.leaveType && balance?.[formData.leaveType] !== undefined) {
        if (days > balance[formData.leaveType]) {
          setError(`Not enough ${formData.leaveType} leave days available`);
        } else {
          setError('');
        }
      }
    }
  }, [formData, balance]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!balance) {
      setError('No leave balance data available');
      return;
    }

    try {
      const requestData = {
        ...formData,
        duration,
        submittedBy: user._id
      };

      const result = await createLeaveRequest(requestData);
      navigate('/employee-dashboard', {
        state: { 
          message: 'Leave requested successfully!',
          newBalance: result.updatedBalance[0] 
        }
      });
    } catch (err) {
      setError(err.message || 'Submission failed');
    }
  };

  // No balance data state
  if (!balance) {
    return (
      <div className="no-balance-container">
        <h3>Leave Request</h3>
        <p className="no-balance-message">No leave balance data available</p>
        <div className="action-buttons">
          <button onClick={() => navigate('/employee-dashboard')}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="leave-form-container">
      <h3>New Leave Request</h3>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Leave Type *</label>
          <select
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="annual">Annual</option>
            <option value="sick">Sick</option>
            <option value="paternity">Paternity</option>
            <option value="others">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>From Date *</label>
          <input
            type="date"
            name="fromDate"
            min={new Date().toISOString().split('T')[0]}
            value={formData.fromDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>To Date *</label>
          <input
            type="date"
            name="toDate"
            min={formData.fromDate || new Date().toISOString().split('T')[0]}
            value={formData.toDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Reason *</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
          />
        </div>
           
        {formData.leaveType && (
        <div className="balance-info">
          Available {formData.leaveType} leave: {balance[formData.leaveType]} days
          {duration > 0 && balance[formData.leaveType] >= duration && (
            <span> → Remaining: {balance[formData.leaveType] - duration} days</span>
          )}
          </div>
        )}

        <div className="form-actions">
          <button type="submit" disabled={!!error}>
            Submit Request
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/employee-dashboard')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeaveForm;