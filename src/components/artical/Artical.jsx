import React from 'react'
import './artical.css';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin6Fill } from 'react-icons/ri';
const Artical = ({ employee }) => {
    return (
        <div className='artical'>
            <div className='artical-img'>
                <img src={employee.profileimg} alt="" />
            </div>
            <div className='artical-content'>
                <h1>{employee.fullname}</h1>
                <p>{employee.email}</p>
                <p>{employee.department}</p>
                <p>{employee.position}</p>
                <p>{employee.address}</p>
            </div>
            <div className='artical-icon'>
                <RiDeleteBin6Fill />
                <BiEdit />
            </div>
        </div>
    )
}

export default Artical