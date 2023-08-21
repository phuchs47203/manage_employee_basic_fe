import React, { useEffect, useState } from 'react';
import './listEmployee.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addAllEmployee, selectEmployee } from '../../components/features/employeeSlice';
import axios from 'axios';
import { Artical } from '../../components';
const ListEmployee = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const employees = useSelector(selectEmployee);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = () => {
            // const response = axios
            setLoading(true);
            const response = axios
                .get("http://localhost:8080/api/v1/employee")
                .then((response) => {
                    // console.log(response.data);
                    dispatch(addAllEmployee(response.data));
                });
            setLoading(false);
        };
        fetchData();
        // console.log(employees);
    }, []);
    return (
        <div className='listemployee'>
            <div className='listemployee-header'>
                <h1>List Employee</h1>
            </div>
            <div className='listemployee-btn'>
                <button
                    onClick={() => navigate("/addEmployee")}
                    className='listemployee-btn-button'>
                    Add New Employee
                </button>
            </div>
            {!loading && (
                <div className='listemployee-content'>
                    {employees.map((employee) => (
                        <Artical employee={employee} key={employee.id} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default ListEmployee