import React, { useEffect, useState } from 'react'
import * as userService from '../../services/userService'
import { useNavigate } from 'react-router'
import EditUserForm from '../EditUserForm/EditUserForm'
import './EmployeesRecords.css'

const EmployeesRecords = () => {
    const navigate = useNavigate()
    const [employees, setEmployees] = useState([])
    const [selectedEmployee, setSelectedEmployee] = useState({})
    const [isFormOn, setIsFormOn] = useState(false)

    const [searchName, setSearchName] = useState('')

    useEffect(() => {
        (async () => {
            const employeesRecords = await userService.index()
            // console.log('employee records', employeesRecords);
            const filteredEmployee = employeesRecords.filter(employee => {
                return employee.role === 'employee'
            })
            setEmployees(filteredEmployee)
        })()
    }, [])

    const handleEmployeeUpdate = (updatedUser) => {
        const updatedEmployees = employees.map(employee => {
            if (employee._id === updatedUser._id) {
                return updatedUser; 
            } else {
                return employee; 
            }
        });

        setEmployees(updatedEmployees);
    };


    const handleDelete = async (employeeId) => {
    try {
        const deletedUser = await userService.deleteUser(employeeId);

        const updatedEmployees = employees.filter(e => e._id !== deletedUser._id);

        setEmployees(updatedEmployees);
    } catch (err) {
        console.log(err);
    }
};


    const filteredEmployees = employees.filter(employee => {
        const nameMatch = employee.name.toLowerCase().includes(searchName.toLowerCase())
        return nameMatch
    })

    return (
        <main className="container mt-5 justify-content-center align-content-center ">
            <div className="card shadow-sm border-1">
                <div className='card-body'>


                    <h1 className='text-shadow text-secondary text-center'>Employees Records</h1>
                    <div className='d-flex justify-content-between '>
                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchName}
                            onChange={(evt) => setSearchName(evt.target.value)}
                            className='fw-semibold form-control w-auto'
                        />
                        <button className='btn btn-primary' onClick={() => navigate('/sign-up')}>Register a New User</button>
                    </div>

                    <table className='table table-secondary table-rounded table-hover table-striped mt-3 mw-100 text-center'>
                        <thead>
                            <tr className=''>
                                <th>#</th>
                                <th>Employee Name</th>
                                <th>Employee Role</th>
                                <th>Annual Leaves</th>
                                <th>Sick Leaves</th>
                                <th>Other Leaves</th>
                                <th>Update User</th>
                                <th>Delete User</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.length > 0 ? (
                                filteredEmployees.map((employee, index) => (

                                    <tr key={employee._id}>
                                        <td>{index + 1}</td>
                                        <td>{employee.name}</td>
                                        <td>{employee.role}</td>
                                        <td><span className='badge bg-primary'>{employee.leavebalance.annual}</span></td>
                                        <td><span className='badge bg-success'>{employee.leavebalance.sick}</span></td>
                                        <td><span className='badge bg-warning'>{employee.leavebalance.others}</span></td>
                                        <td>
                                            <button
                                                onClick={() => {
                                                    setIsFormOn(true)
                                                    setSelectedEmployee(employee)
                                                }}
                                                className='btn btn-outline-primary'
                                            >
                                                Update User
                                            </button>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDelete(employee._id)}
                                                className='btn btn-outline-danger'
                                            >
                                                Delete User
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: 'center' }}>
                                        No employees found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {isFormOn && (
                        <EditUserForm
                            selectedEmployee={selectedEmployee}
                            setIsFormOn={setIsFormOn}
                            handleEmployeeUpdate={handleEmployeeUpdate}
                        />
                    )}
                </div>
            </div>
        </main>
    )
}

export default EmployeesRecords
