import React from 'react'
import { useState, useEffect } from 'react'
import * as LeaveRequestService from '../../services/leaveRequestService'

const AllReviewedLeaveRequest = () => {
    const [reviewedRequests, setReviewedRequests] = useState([])
    const [searchEmpName, setEmpName] = useState('')
    useEffect(() => {

        const fetchPendingLeaveRequests = async () => {
            const allLeaves = await LeaveRequestService.index()
            const filteredLeaves = allLeaves.filter((leaves) => {
                return leaves.status !== 'pending'
            })
            setReviewedRequests(filteredLeaves)
        }
        
        fetchPendingLeaveRequests()
    }, [])

    const filteredRequests = reviewedRequests.filter(request =>{
        const nameMatch = request.submittedBy.name.toLowerCase().includes(searchEmpName.toLowerCase())
        return nameMatch
    })

    return (
        <>
            <div>
                <input type="text" name="searchEmpName" id="searchEmpName" value={searchEmpName} onChange={(evt)=>{setEmpName(evt.target.value)}} placeholder="Search by employee name..."/>
                {filteredRequests.length !== 0 ? (
                    filteredRequests.map((request) => {
                        return (
                            <div key={request._id}>
                                <h3>Employee Name: {request.submittedBy.name}</h3>
                                <p>Leave Type: {request.leaveType}</p>
                                <p>From: {request.fromDate.split('T')[0]}</p>
                                <p>To: {request.toDate.split('T')[0]}</p>
                                <p>Number of days {request.duration}</p>
                                <p>Reason: {request.reason}</p>
                                <p>Submitted At: {request.createdAt.split('T')[0]}</p>
                                <p>reviewed By: {request.reviewBy}</p>
                                <p>Status: {request.status}</p>
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

export default AllReviewedLeaveRequest