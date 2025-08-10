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
    status: 'pending'
  };

  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState(initialFormData);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState({
    annual: 60,  // Default values from your balance model
    sick: 20,
    paternity: 10,
    others: 20
  });

  // Load actual balance data when component mounts
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (user?._id) {
          const response = await getLeaveBalance(user._id);
          if (response && response.length > 0) {
            // Update with actual values from database
            setBalance(response[0]);
          }
          // If no balance found, keep the default values
        }
      } catch (err) {
        console.error('Failed to load balance:', err);
        setError('Failed to load leave balance data');
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [user?._id]);

  // Calculate duration and validate dates
  useEffect(() => {
    if (formData.fromDate && formData.toDate) {
      const fromDate = new Date(formData.fromDate);
      const toDate = new Date(formData.toDate);
      
      if (toDate < fromDate) {
        setError('End date cannot be before start date');
        return;
      }
      
      const calculatedDuration = Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1;
      setDuration(calculatedDuration);
      
      // Validate against balance
      if (formData.leaveType && balance[formData.leaveType] !== undefined) {
        if (calculatedDuration > balance[formData.leaveType]) {
          setError(`You don't have enough ${formData.leaveType} leave (Available: ${balance[formData.leaveType]} days)`);
        } else if (calculatedDuration <= 0) {
          setError('Duration must be at least 1 day');
        } else {
          setError('');
        }
      }
    }
  }, [formData.fromDate, formData.toDate, formData.leaveType, balance]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === 'fromDate') {
      setFormData(prev => ({ ...prev, toDate: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Final validation
    if (!formData.leaveType) {
      setError('Please select a leave type');
      return;
    }

    if (duration > balance[formData.leaveType]) {
      setError(`Cannot request ${duration} days (only ${balance[formData.leaveType]} available)`);
      return;
    }

    try {
      // Prepare data for both models
      const requestData = {
        // LeaveRequest fields
        leaveType: formData.leaveType,
        fromDate: formData.fromDate,
        toDate: formData.toDate,
        reason: formData.reason,
        duration: duration,
        status: formData.status,
        submittedBy: user._id,
        
        // Balance update fields
        leaveBalanceType: formData.leaveType,
        leaveBalanceDuration: duration,
        employeeId: user._id
      };

      const result = await createLeaveRequest(requestData);
      
      // Update local balance state with the response
      if (result.updatedBalance) {
        setBalance(result.updatedBalance);
      }
      
      navigate('/employee-dashboard', {
        state: { 
          message: 'Leave requested successfully!',
          newBalance: result.updatedBalance || balance
        }
      });
      
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.message || 'Failed to submit leave request');
    }
  };

  if (loading) {
    return <div className="loading-message">Loading leave data...</div>;
  }

  return (
    <div className="leave-form-container">
      <h3>New Leave Request</h3>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="leaveType">Leave Type *</label>
          <select
            id="leaveType"
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
          <label htmlFor="fromDate">From Date *</label>
          <input
            type="date"
            id="fromDate"
            name="fromDate"
            min={new Date().toISOString().split('T')[0]}
            onChange={handleChange}
            value={formData.fromDate}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="toDate">To Date *</label>
          <input
            type="date"
            id="toDate"
            name="toDate"
            min={formData.fromDate || new Date().toISOString().split('T')[0]}
            onChange={handleChange}
            value={formData.toDate}
            required
            disabled={!formData.fromDate}
          />
        </div>

        <div className="form-group">
          <label htmlFor="reason">Reason *</label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
            minLength={10}
          />
        </div>

        {formData.leaveType && (
          <div className="balance-info">
            <p>
              <strong>Available {formData.leaveType} leave:</strong> {balance[formData.leaveType]} days
              {duration > 0 && balance[formData.leaveType] >= duration && (
                <span> → Will have {balance[formData.leaveType] - duration} days remaining</span>
              )}
            </p>
            {duration > 0 && balance[formData.leaveType] < duration && (
              <p className="insufficient-balance">
                Not enough days available for this request
              </p>
            )}
          </div>
        )}

        <div className="form-actions">
          <button
            type="submit"
            disabled={!!error || loading}
            className="submit-button"
          >
            {loading ? 'Processing...' : 'Submit Request'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/employee-dashboard')}
            className="cancel-button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeaveForm;