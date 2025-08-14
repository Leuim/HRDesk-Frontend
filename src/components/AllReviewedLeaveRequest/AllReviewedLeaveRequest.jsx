import React, { useState, useEffect } from 'react';
import * as LeaveRequestService from '../../services/leaveRequestService';

const AllReviewedLeaveRequest = () => {
    const [reviewedRequests, setReviewedRequests] = useState([]);
    const [searchEmpName, setEmpName] = useState('');

    useEffect(() => {
        const fetchPendingLeaveRequests = async () => {
            const allLeaves = await LeaveRequestService.index();
            const filteredLeaves = allLeaves.filter((leaves) => leaves.status !== 'pending');
            setReviewedRequests(filteredLeaves);
        };
        fetchPendingLeaveRequests();
    }, []);

    const filteredRequests = reviewedRequests.filter(request =>
        request.submittedBy?.name.toLowerCase().includes(searchEmpName.toLowerCase())
    );

    return (
        <div className="card container my-4 ">
            <h1 className="text-shadow text-secondary text-center my-2">All Reviewed Requests</h1>

            <div className="d-flex justify-content-start mb-4">
                <input
                    type="text"
                    className="form-control w-auto shadow-sm"
                    placeholder="Search by name..."
                    value={searchEmpName}
                    onChange={(evt) => setEmpName(evt.target.value)}
                />
            </div>

            {filteredRequests.length > 0 ? (
                <div className="row mb-2 g-4">
                    {filteredRequests.map((request) => (
                        <div className="col-md-6 col-lg-4" key={request._id}>
                            <div className="card shadow-lg h-100 border-0 rounded-4 overflow-hidden">
                                <div className="card-header text-white text-center fw-bold rounded-bottom-0"
                                    style={{ backgroundColor: '#144b4bff' }}>
                                    {request.submittedBy.name}
                                </div>

                                <div className="card-body bg-light">
                                    <h6 className="card-subtitle mb-3 text-muted fw-bold text-center">
                                        {request.leaveType.charAt(0).toUpperCase() + request.leaveType.slice(1)} Leave
                                    </h6>
                                    <hr />
                                    <p className="mb-1"><strong>From:</strong> {request.fromDate.split('T')[0]}</p>
                                    <p className="mb-1"><strong>To:</strong> {request.toDate.split('T')[0]}</p>
                                    <p className="mb-1"><strong>Days:</strong> {request.duration}</p>
                                    <p className="mb-1"><strong>Reason:</strong> {request.reason}</p>
                                    <p className="mb-1"><strong>Submitted At:</strong> {request.createdAt.split('T')[0]}</p>
                                    <p className="mb-1"><strong>Reviewed By:</strong> {request.reviewBy}</p>
                                    <div className="mt-3 text-center">
                                        <span className={`badge px-3 py-2 fs-6 bg-${request.status === 'approved' ? 'success' : 'danger'}`}>
                                            {request.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            ) : (
                <div className="text-center mt-4">
                    <h5 className='fw-bold text-secondary '>No reviewed requests found.</h5>
                </div>
            )}
        </div>
    );
};

export default AllReviewedLeaveRequest;
