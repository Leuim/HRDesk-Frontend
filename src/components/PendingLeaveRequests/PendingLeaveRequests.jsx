import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import * as LeaveRequestService from '../../services/leaveRequestService'

const PendingLeaveRequests = () => {
    const [pendingRequests, setPendingRequests] = useState([])
    const { setPendingRequestCount } = useOutletContext()
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

    const countDays = (fromDate, toDate) => {
        const start = new Date(fromDate);
        const end = new Date(toDate);

        const timeDiff = end - start;

        const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;

        return days;
    };

    const handleApprove = async (leaveRequestId, daysCount, leaveType) => {
        try {
            const updatedLeave = await LeaveRequestService.approve(leaveRequestId, daysCount, leaveType)
            const copyPendingLeaves = pendingRequests.filter((leaves) => leaves._id !== updatedLeave._id)
            setPendingRequests(copyPendingLeaves)
            setPendingRequestCount(copyPendingLeaves.length)
        } catch (error) {
            console.log(error)
        }
    }


    // const handleReject = async () => {

    // }
    return (
        <>
            <div>
                {pendingRequests.length !== 0 ? (
                    pendingRequests.map((request) => {
                        const daysCount = countDays(request.fromDate, request.toDate);
                        return (
                            <div key={request._id}>
                                <h3>Employee Name: {request.submittedBy.name}</h3>
                                <p>Employee Role: {request.submittedBy.role}</p>
                                <p>Leave Type: {request.leaveType}</p>
                                <p>From: {request.fromDate.split('T')[0]}</p>
                                <p>To: {request.toDate.split('T')[0]}</p>
                                <p>Number of days {daysCount}</p>
                                <p>Reason: {request.reason}</p>
                                <p>Submitted At: {request.createdAt.split('T')[0]}</p>
                                <button onClick={() => handleApprove(request._id,daysCount, request.leaveType)}>Approve</button>
                                <button>Reject</button>
                            </div>
                        )
                    })
                ) : (
                    <div>
                        <h2>No Pending requests yet.</h2>
                    </div>
                )}
            </div>

        </>
    )
}

export default PendingLeaveRequests