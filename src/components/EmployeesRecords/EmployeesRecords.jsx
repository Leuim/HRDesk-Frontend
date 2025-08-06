import React, { useEffect, useState } from 'react'
import * as userService from '../../services/userService'

const EmployeesRecords = () => {
    const [employees, setEmployees] = useState([])
    useEffect(() => {
        (async () => {
            const employeesRecords = await userService.index()
            console.log('employee records', employeesRecords);
            setEmployees(employeesRecords)
        })()
    }, [])

    return (
        <>
            <h1>Employees Records</h1>
            <table>
                <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>Employee role</th>
                    </tr>
                </thead>
                <tbody>
                   {employees.map((employee)=>(<tr key={employee._id}>
                    <td>{employee.name}</td>
                    <td>{employee.role}</td>
                   </tr>))}
                </tbody>
            </table>
        </>
    )
}

export default EmployeesRecords