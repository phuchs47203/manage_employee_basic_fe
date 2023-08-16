import React from 'react';
import './listEmployee.css';
const ListEmployee = () => {
    return (
        <div className='listemployee'>
            <div className='listemployee-header'>
                <h1>List Employee</h1>
            </div>
            <div className='listemployee-btn'>
                <a href="/addEmployee">
                    <button>Add New Employee</button>
                </a>
            </div>
        </div>
    )
}

export default ListEmployee