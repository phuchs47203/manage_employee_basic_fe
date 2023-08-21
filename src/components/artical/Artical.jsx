import React from 'react'
import './artical.css';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../features/employeeSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
const Artical = ({ employee }) => {
    const EMPLOYEE_MANAGEMENT = "http://localhost:8080/api/v1/employee"
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const editEmployee = (e, id) => {
        e.preventDefault();
        // console.log(employee);
        navigate(`/editEmployee/${id}`);
    };
    const refresh = () => window.location.reload(true)

    const deleteEmployee = (e) => {
        e.preventDefault();
        axios
            .delete(EMPLOYEE_MANAGEMENT + "/" + employee.id);
        refresh();
        settoggleDelete(false);

    }
    const [toggleDelete, settoggleDelete] = useState(false);
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
                    onClick={() => settoggleDelete(true)} />
                <BiEdit
                    onClick={(e, id) => editEmployee(e, employee.id)}
                />
            </div>
            <div className='annouce_toggle'>
                {
                    toggleDelete && (
                        <motion.div
                            initial={{ opacity: 0, x: 0 }}
                            animate={{ opacity: toggleDelete ? 1 : 0, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className='annouce_toggle_content'
                        >
                            <div className='annouce_toggle_content_div'>
                                <p>Do you want to remove {employee.fullNameString} at {employee.departmentString} Department ?</p>
                                <div className='annouce_toggle_content-btn'>
                                    <button
                                        onClick={deleteEmployee}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        onClick={() => settoggleDelete(false)}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>

                        </motion.div>
                    )
                }
            </div>
        </div>
    )
}

export default Artical