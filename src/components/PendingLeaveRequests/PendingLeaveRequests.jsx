import React, { useEffect, useState } from 'react'
import * as LeaveRequestService from '../../services/leaveRequestService'

const PendingLeaveRequests = ({setPendingRequestCount, pendingRequestCount}) => {
    const [pendingRequests, setPendingRequests] = useState([])
    const [isRejectionFormOn, setIsRejectionFormOn] = useState(false)
    const [rejectionReason, setRejectionReason] = useState('')
    const [selectedRequest, setSelectedRequest] = useState({})
    useEffect(() => {

        const fetchPendingLeaveRequests = async () => {
            const allLeaves = await LeaveRequestService.index()
            const pendingLeaves = allLeaves.filter((leaves) => {
                return leaves.status === 'pending'
            })
            // console.log(pendingLeaves.length);
            setPendingRequests(pendingLeaves)
            setPendingRequestCount(pendingLeaves.length)
        }

        fetchPendingLeaveRequests()
    }, [])

    const handleApprove = async (leaveRequestId,  leaveType) => {
        try {
            const updatedLeave = await LeaveRequestService.approve(leaveRequestId, leaveType)
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
        } catch (error) {
            console.log(error);
        }
        
    }
    const handleChange = (evt) => {
        setRejectionReason(evt.target.value)
    }
    const handleCancel = () => {
        setIsRejectionFormOn(false)
        setRejectionReason('')
        setSelectedRequest({})
    }
    return (
        <>
            <div>
                <h3>Total Amount of Pending Leave requests: {pendingRequestCount}</h3>
                {pendingRequests.length !== 0 ? (
                    pendingRequests.map((request) => {
                        // const daysCount = countDays(request.fromDate, request.toDate);
                        return (
                            <div key={request._id}>
                                <h3>Employee Name: {request.submittedBy.name}</h3>
                                <p>Employee Role: {request.submittedBy.role}</p>
                                <p>Leave Type: {request.leaveType}</p>
                                <p>From: {request.fromDate.split('T')[0]}</p>
                                <p>To: {request.toDate.split('T')[0]}</p>
                                <p>Number of days {request.duration}</p>
                                <p>Reason: {request.reason}</p>
                                <p>Submitted At: {request.createdAt.split('T')[0]}</p>
                                <button onClick={() => handleApprove(request._id, request.leaveType)}>Approve</button>
                                <button onClick={() => { setIsRejectionFormOn(true); setSelectedRequest(request); }}>Reject</button>
                            </div>
                        )
                    })
                ) : (
                    <div>
                        <h2>No Pending requests yet.</h2>
                    </div>
                )}
            </div>

            {isRejectionFormOn ? (<div>
                <div>
                    <form >
                        <label htmlFor="rejectionReason">Rejection reason</label>
                        <input type="text" name="rejectionReason" id="rejectionReason" onChange={handleChange} value={rejectionReason} />
                        <button type='submit' onClick={() => handleReject()}>Reject Leave Request</button>
                        <button type='button' onClick={handleCancel}>Cancel</button>
                    </form>
                </div>
            </div>) : null}
        </>
    )
}

export default PendingLeaveRequests