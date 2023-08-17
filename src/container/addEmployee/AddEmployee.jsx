import React, { useRef, useState } from 'react'
import './addEmployee.css';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/lab/Autocomplete';
import { IoMdPhotos } from "react-icons/io";
import { RiDeleteBin6Line } from 'react-icons/ri';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../../components/features/employeeSlice';


const AddEmployee = () => {
    const EMPLOYEE_MANAGEMENT = "http://localhost:8080/api/v1/employee";

    const optionsAddress = ['Ha Noi', 'Ho Chi Minh', 'Ca Mau', 'Quang Binh', 'DakLak', 'Nghe An', 'Quang Tri', 'Thanh Hoa', 'Ha Tinh', 'Vung Tau', 'Binh Duong'];
    const optionsDepartment = ['Human Resources', 'Marketing', 'Technical Support Team', 'IT', 'Logistics', 'Sales', 'Customer Service', 'Finance '];
    const optionsPosition = ['Manager', 'Administrator', 'Data Analyst', 'Business Analyst', 'Recruiter', 'Assistant', 'Secretary', 'Rep'];

    const [employee, setEmployee] = useState({
        fullName: "",
        email: "",
        department: "",
        position: "",
        address: "",
    })
    const [imageProfile, setimageProfile] = useState(null);
    const removeImage = () => {
        setimageProfile(null);
    };
    const hiddenFileInput = useRef(null);
    const inputRef = useRef(null);
    const dispatch = useDispatch();

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
    const handleChange = (e) => {
        const value = e.target.value;
        setEmployee({ ...employee, [e.target.name]: value });
    };
    const saveEmployee = (e) => {
        e.preventDefault();
        const formData = new FormData();

        console.log(employee.fullName);
        console.log(employee.email);

        formData.append("fullName", employee.fullName);
        formData.append("email", employee.email);
        formData.append("department", "department");
        formData.append("position", "position");
        formData.append("address", "address");
        formData.append("file", imageProfile);
        axios
            .post(EMPLOYEE_MANAGEMENT, formData, {
                headers: { Accept: "application/json" },
            })
            .then((response) => {
                inputRef.current.value = "";
                dispatch(addEmployee(response.data));
                console.log(response.data);
                removeImage();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div div className='addemployee' >
            <div className='addemployee-header'>
                <h1>enter information</h1>
            </div>
            <div className='addemployee-content'>
                <input
                    name="fullName"
                    value={employee.fullName}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder='Full Name'
                />
                <input
                    name='email'
                    value={employee.email}
                    onChange={(e) => handleChange(e)}
                    type="email"
                    placeholder='Email Address'
                />
                <Autocomplete
                    className='combobox'
                    name="department"
                    value={employee.department}
                    onChange={(e) => handleChange(e)}
                    options={optionsDepartment}
                    renderInput={(params) =>
                        <TextField {...params} label="Department" variant="standard" />}
                />
                <Autocomplete
                    className='combobox'
                    name="position"
                    value={employee.position}
                    onChange={(e) => handleChange(e)}
                    options={optionsPosition}
                    renderInput={(params) =>
                        <TextField {...params} label="Position" variant="standard" />}
                />
                <Autocomplete
                    className='combobox'
                    name="address"
                    value={employee.address}
                    onChange={(e) => handleChange(e)}
                    options={optionsAddress}
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
                <button
                    onClick={saveEmployee}
                >
                    Save
                </button>
                <button>Clear</button>
            </div>
        </div >
    )
}

export default AddEmployee