import React, { useRef, useState } from 'react'
import './addEmployee.css';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/lab/Autocomplete';
import { IoMdPhotos } from "react-icons/io";
import { RiDeleteBin6Line } from 'react-icons/ri';


const AddEmployee = () => {
    const options = ['Ha Noi', 'Ho Chi Minh', 'Ca Mau', 'Quang Binh', 'DakLak', 'Nghe An', 'Quang Tri', 'Thanh Hoa', 'Ha Tinh', 'Vung Tau', 'Binh Duong'];
    const optionsDepartment = ['Human Resources', 'Marketing', 'Technical Support Team', 'IT', 'Logistics', 'Sales', 'Customer Service', 'Finance '];
    const optionsPosition = ['Manager', 'Administrator', 'Data Analyst', 'Business Analyst', 'Recruiter', 'Assistant', 'Secretary', 'Rep'];
    const [imageProfile, setimageProfile] = useState(null);
    const removeImage = () => {
        setimageProfile(null);
    };
    const hiddenFileInput = useRef(null);
    const handleClick = () => {
        hiddenFileInput.current.click();
    };
    const addImageToPost = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = (e) => {
                setimageProfile(e.target.result);
            };
        }
    };
    return (
        <div div className='addemployee' >
            <div className='addemployee-header'>
                <h1>enter information</h1>
            </div>
            <div className='addemployee-content'>
                <input type="text" placeholder='Full Name' />
                <input type="text" placeholder='Email Address' />
                <Autocomplete
                    className='combobox'
                    options={optionsDepartment}
                    renderInput={(params) =>
                        <TextField {...params} label="Department" variant="standard" />}
                />
                <Autocomplete
                    className='combobox'
                    options={optionsPosition}
                    renderInput={(params) =>
                        <TextField {...params} label="Position" variant="standard" />}
                />
                <Autocomplete
                    className='combobox'
                    options={options}
                    renderInput={(params) =>
                        <TextField {...params} label="Address" variant="standard" />}
                />
                {imageProfile && (
                    <div

                        className='imgPicture'>
                        <img src={imageProfile} alt="" />
                        <RiDeleteBin6Line
                            onClick={removeImage}
                            className="Ridepete" />
                    </div>
                )}
                <div
                    onClick={handleClick}
                    className='addemployee-content-img'>
                    <IoMdPhotos className='imgphoto' />
                    <input
                        onChange={addImageToPost}
                        ref={hiddenFileInput}
                        type="file"
                        accept='image/*'
                        hidden
                    />
                </div>

            </div>
            <div className='addemployee-btn'>
                <button>Save</button>
                <button>Clear</button>
            </div>
        </div >
    )
}

export default AddEmployee