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
    status: 'pending',
    duration: 0 // Added duration to initial form data
  };

  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(null);

  // Load balance data
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (user?._id) {
          const response = await getLeaveBalance(user._id);
          // Handle both array and object responses
          const balanceData = Array.isArray(response) ? response[0] : response;
          setBalance(balanceData || {
            annual: 60,
            sick: 20,
            others: 20
          });
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
      setFormData(prev => ({ ...prev, duration: calculatedDuration }));
      
      // Validate against balance
      if (formData.leaveType && balance?.[formData.leaveType] !== undefined) {
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

    if (formData.duration > balance[formData.leaveType]) {
      setError(`Cannot request ${formData.duration} days (only ${balance[formData.leaveType]} available)`);
      return;
    }

    try {
      const requestData = {
        leaveType: formData.leaveType,
        fromDate: formData.fromDate,
        toDate: formData.toDate,
        reason: formData.reason,
        duration: formData.duration, // Include duration in request
        status: formData.status,
        submittedBy: user._id,
        leaveBalanceType: formData.leaveType
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

        <div className="duration-info">
          <p><strong>Requested Duration:</strong> {formData.duration} day{formData.duration !== 1 ? 's' : ''}</p>
        </div>

        {formData.leaveType && balance[formData.leaveType] !== undefined && (
          <div className="balance-info">
            <p>
              <strong>Available {formData.leaveType} leave:</strong> {balance[formData.leaveType]} days
              {formData.duration > 0 && balance[formData.leaveType] >= formData.duration && (
                <span> → Remaining: {balance[formData.leaveType] - formData.duration} days</span>
              )}
            </p>
            {formData.duration > 0 && balance[formData.leaveType] < formData.duration && (
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