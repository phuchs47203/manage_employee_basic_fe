import React from 'react';
import './navbar.css';
import { useNavigate } from 'react-router-dom';
const Narbar = () => {
    const navigate = useNavigate();
    const returnpage = () => {
        navigate("/");
    }
    return (
        // <div
        //     onClick={() => returnpage()}
        //     className='navbar'>
        //     <h1 className='gradient__text'>Employee Management</h1>
        // </div>
        <a href="/" className='link-navbar'>
            <div
                className='navbar'>
                <h1 className='gradient__text'>Employee Management</h1>
            </div>
        </a>
    )
}

export default Narbar