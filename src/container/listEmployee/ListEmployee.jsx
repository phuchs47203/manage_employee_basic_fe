import React from 'react';
import './listEmployee.css';
import { useNavigate } from 'react-router-dom';
const ListEmployee = () => {
    const navigate = useNavigate();

    return (
        <div className='listemployee'>
            <div className='listemployee-header'>
                <h1>List Employee</h1>
            </div>
            <div className='listemployee-btn'>
                {/* <a href="/addEmployee">
                    <button>Add New Employee</button>
                </a> */}
                <button
                    onClick={() => navigate("/addEmployee")}
                    className='listemployee-btn-button'>
                    Add New Employee
                </button>


            </div>
        </div>
    )
}

export default ListEmployee