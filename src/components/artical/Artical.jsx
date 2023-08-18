import React from 'react'
import './artical.css';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../features/employeeSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Artical = ({ employee }) => {
    const EMPLOYEE_MANAGEMENT = "http://localhost:8080/api/v1/employee"
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const editEmployee = (e, id) => {
        e.preventDefault();
        // console.log(employee);
        navigate(`/editEmployee/${id}`);
    };

    const deleteEmployee = (e) => {
        e.preventDefault();
        axios
            .delete(EMPLOYEE_MANAGEMENT + "/" + employee.id);
    }

    return (
        <div className='artical'>
            <div className='artical-img'>
                <img src={employee.profilePictureString} alt="" />
            </div>
            <div className='artical-content'>
                <h1>{employee.fullNameString}</h1>
                <p>{employee.emailString}</p>
                <p>{employee.departmentString}</p>
                <p>{employee.positionString}</p>
                <p>{employee.addressString}</p>
                <p>{employee.timeStamp}</p>
            </div>
            <div className='artical-icon'>
                <RiDeleteBin6Fill
                    className='artical-icon-delete'
                    onClick={deleteEmployee} />
                <BiEdit
                    onClick={(e, id) => editEmployee(e, employee.id)}
                />
            </div>
        </div>
    )
}

export default Artical