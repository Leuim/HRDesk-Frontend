import React, { useEffect, useState } from 'react'
import * as userService from '../../services/userService'
import { useNavigate } from 'react-router'
import EditUserForm from '../EditUserForm/EditUserForm'

const EmployeesRecords = () => {
    const navigate = useNavigate()
    const [employees, setEmployees] = useState([])
    const [selectedEmployee, setSelectedEmployee] = useState({})
    const [isFormOn, setIsFormOn] = useState(false)
    useEffect(() => {
        (async () => {
            const employeesRecords = await userService.index()
            // console.log('employee records', employeesRecords);
            setEmployees(employeesRecords)
        })()
    }, [])

    const handleDelete = async (employeeId) => {
        try {
            const deletedUser = await userService.deleteUser(employeeId)
            const updatedEmployees = employees.filter((employee) => {
                return employee._id !== deletedUser._id
            })
            setEmployees(updatedEmployees)
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <h1>Employees Records</h1>
            <button onClick={()=> navigate('/sign-up')}>Sign Up a User</button>
            <table>
                <thead>
                    <tr>
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
                    {employees.length > 0 ? (
                        employees.map((employee) => (
                            <tr key={employee._id}>
                                <td>{employee.name}</td>
                                <td>{employee.role}</td>
                                <td>{employee.leavebalance.annual}</td>
                                <td>{employee.leavebalance.sick}</td>
                                <td>{employee.leavebalance.others}</td>
                                <td><button onClick={() => {setIsFormOn(true); setSelectedEmployee(employee);}}>Update User</button></td>
                                <td><button onClick={() => handleDelete(employee._id)}>Delete User</button></td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" style={{ textAlign: 'center' }}>No employees found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {isFormOn ? <EditUserForm selectedEmployee={selectedEmployee} setIsFormOn={setIsFormOn}/> : null}
        </>
    )
}

export default EmployeesRecords