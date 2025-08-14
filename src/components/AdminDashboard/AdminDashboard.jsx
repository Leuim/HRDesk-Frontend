import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import * as leaveRequestServices from '../../services/leaveRequestService'
import './AdminDashboard.css'

const AdminDashboard = ({ pendingRequestCount }) => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const [approvedRequestCount, setApprovedRequestsCount] = useState(0)
  const [rejectedRequestCount, setRejectedRequestsCount] = useState(0)

  useEffect(() => {
    const fetchLeaves = async () => {
      const allLeaves = await leaveRequestServices.index()
      setApprovedRequestsCount(allLeaves.filter(leave => leave.status === 'approved').length)
      setRejectedRequestsCount(allLeaves.filter(leave => leave.status === 'rejected').length)
    }

    fetchLeaves()
  }, [])

  return (
    <main className="container mt-5 justify-content-center align-content-center">
      <div className="card shadow-sm border-1">
        <div className="card-body">
          <h1 className="card-title mt-4 mb-2 text-center text-secondary">Admin Dashboard</h1>
          <p className="text-secondary mb-4 text-center">
            Welcome to the admin dashboard {user.name}. Manage your leave requests and employee records here.
          </p>

          <div className="row text-center mb-4 align-items-stretch">
            <div className="col-md d-flex">
              <div className="card  py-4 bg-pending border-1 flex-fill">
                <div className="card-body d-flex flex-column justify-content-center">
                  <h5 className="text-secondary">Pending Requests</h5>
                  <h3 className="fw-bold text-light">{pendingRequestCount}</h3>
                </div>
              </div>
            </div>
            <div className="col-md d-flex">
              <div className="card bg-success border-1 flex-fill">
                <div className="card-body d-flex flex-column justify-content-center">
                  <h5 className="text-secondary">Approved Leaves</h5>
                  <h3 className="fw-bold text-light">{approvedRequestCount}</h3>
                </div>
              </div>
            </div>
            <div className="col-md d-flex">
              <div className="card bg-danger border-1 flex-fill">
                <div className="card-body d-flex flex-column justify-content-center">
                  <h5 className="text-secondary">Rejected Leaves</h5>
                  <h3 className="fw-bold text-light">{rejectedRequestCount}</h3>
                </div>
              </div>
            </div>
          </div>
        
          <div className="row text-center mt-3">
            <div className="col-md">
              <button
                className="btn btn-primary w-100"
                onClick={() => navigate('/employees-records')}
              >
                Employees Records
              </button>
            </div>
            <div className="col-md">
              <button 
                className="btn btn-success w-100"
                onClick={() => navigate('/all-reviewed-leave-request')}
              >
                All Reviewed Leave Requests
              </button>
            </div>
            <div className="col-md">
              <button
                className="btn btn-light w-100"
                onClick={() => navigate('/pending-leave-requests')}
              >
                Pending Leave Requests
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}

export default AdminDashboard
