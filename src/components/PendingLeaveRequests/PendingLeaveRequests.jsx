import React, { useEffect, useState } from 'react'
import * as LeaveRequestService from '../../services/leaveRequestService'

const PendingLeaveRequests = ({ setPendingRequestCount }) => {
  const [pendingRequests, setPendingRequests] = useState([])
  const [isRejectionFormOn, setIsRejectionFormOn] = useState(false)
  const [rejectionReason, setRejectionReason] = useState('')
  const [selectedRequest, setSelectedRequest] = useState({})

  useEffect(() => {
    const fetchPendingLeaveRequests = async () => {
      const allLeaves = await LeaveRequestService.index()
      const pendingLeaves = allLeaves.filter((leaves) => leaves.status === 'pending')
      setPendingRequests(pendingLeaves)
      setPendingRequestCount(pendingLeaves.length)
    }
    fetchPendingLeaveRequests()
  }, [])

  const handleApprove = async (leaveRequestId, leaveType, submittedBy) => {
    try {
      const updatedLeave = await LeaveRequestService.approve(leaveRequestId, leaveType, submittedBy)
      const copyPendingLeaves = pendingRequests.filter((leaves) => leaves._id !== updatedLeave._id)
      setPendingRequests(copyPendingLeaves)
      setPendingRequestCount(copyPendingLeaves.length)
    } catch (error) {
      console.log(error)
    }
  }

  const handleReject = async () => {
    try {
      const updatedLeave = await LeaveRequestService.reject(selectedRequest._id, rejectionReason)
      const copyPendingLeaves = pendingRequests.filter((leaves) => leaves._id !== updatedLeave._id)
      setPendingRequests(copyPendingLeaves)
      setPendingRequestCount(copyPendingLeaves.length)
      setSelectedRequest({})
      setRejectionReason('')
      setIsRejectionFormOn(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (evt) => setRejectionReason(evt.target.value)
  const handleCancel = () => {
    setIsRejectionFormOn(false)
    setRejectionReason('')
    setSelectedRequest({})
  }

  return (
    <>
      <div className="card container my-4">
        <h1 className="text-shadow text-secondary text-center my-2">Pending Leave Requests</h1>
        <div className="row mb-2 g-4">
          {pendingRequests.length > 0 ? (
            pendingRequests.map((request) => (
              <div className="col-md-6 col-lg-4" key={request._id}>
                <div className="card shadow-lg h-100 border-0 rounded-4 overflow-hidden">
                  <div
                    className="card-header text-white text-center fw-bold rounded-bottom-0"
                    style={{ backgroundColor: '#144b4bff' }}
                  >
                    {request.submittedBy.name}
                  </div>
                  <div className="card-body bg-light">
                    <h6 className="card-subtitle mb-3 text-muted fw-bold text-center">
                      {request.leaveType.charAt(0).toUpperCase() + request.leaveType.slice(1)} Leave
                    </h6>
                    <p className="mb-1"><strong>From:</strong> {request.fromDate.split('T')[0]}</p>
                    <p className="mb-1"><strong>To:</strong> {request.toDate.split('T')[0]}</p>
                    <p className="mb-1"><strong>Days:</strong> {request.duration}</p>
                    <p className="mb-1"><strong>Reason:</strong> {request.reason}</p>
                    <p className="mb-1"><strong>Submitted At:</strong> {request.createdAt.split('T')[0]}</p>
                    <div className="d-flex justify-content-center gap-2 mt-3">
                      <button
                        className="btn btn-success"
                        onClick={() => handleApprove(request._id, request.leaveType, request.submittedBy._id)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => { setIsRejectionFormOn(true); setSelectedRequest(request) }}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center mt-4">
              <h5 className="fw-bold text-secondary">No pending requests found.</h5>
            </div>
          )}
        </div>
      </div>

      {isRejectionFormOn && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 10 }}
          onClick={handleCancel}
        >
          <div
            className="card p-4 rounded shadow"
            style={{ minWidth: '400px', maxWidth: '500px', zIndex: 11 }}
            onClick={(evt) => evt.stopPropagation()}
          >
            <h4 className="card-text text-secondary mb-3 text-center">Reject Leave Request</h4>
            <form
              onSubmit={(evt) => { evt.preventDefault(); handleReject() }}
            >
              <div className="mb-3">
                <label htmlFor="rejectionReason" className="form-label text-secondary">Rejection Reason</label>
                <input
                  type="text"
                  className="form-control"
                  id="rejectionReason"
                  name="rejectionReason"
                  value={rejectionReason}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="d-flex justify-content-center gap-2">
                <button type="button" className="btn btn-danger w-100" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary w-100">
                  Reject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default PendingLeaveRequests