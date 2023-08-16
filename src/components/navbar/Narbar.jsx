import React from 'react';
import './navbar.css';
import { useNavigate } from 'react-router-dom';
const Narbar = () => {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate("/")}
            className='navbar'>
            <h1 className='gradient__text'>Employee Management</h1>
        </div>
    )
}

export default Narbar