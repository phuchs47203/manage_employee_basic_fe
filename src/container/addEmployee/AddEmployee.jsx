import React, { useRef, useState } from 'react'
import './addEmployee.css';
import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/lab/Autocomplete';
import Autocomplete from '@mui/material/Autocomplete';
import { IoMdPhotos } from "react-icons/io";
import { RiDeleteBin6Line } from 'react-icons/ri';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../../components/features/employeeSlice';
import { useNavigate } from 'react-router-dom';


const AddEmployee = () => {
    const EMPLOYEE_MANAGEMENT = "http://localhost:8080/api/v1/employee";

    const optionsAddress = ['Ha Noi', 'Ho Chi Minh', 'Ca Mau', 'Quang Binh', 'DakLak', 'Nghe An', 'Quang Tri', 'Thanh Hoa', 'Ha Tinh', 'Vung Tau', 'Binh Duong'];
    const optionsDepartment = ['Human Resources', 'Marketing', 'Technical Support Team', 'IT', 'Logistics', 'Sales', 'Customer Service', 'Finance '];
    const optionsPosition = ['Manager', 'Administrator', 'Data Analyst', 'Business Analyst', 'Recruiter', 'Assistant', 'Secretary', 'Rep'];

    const [employee, setEmployee] = useState({
        fullName: "",
        email: "",
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
    const [errorFullName, seterrorFullName] = useState("");
    const navigate = useNavigate();
    const saveEmployee = (e) => {
        e.preventDefault();
        if (!textAddress) {
            seterrorFullName("fullName is not empty");
            return;
        }
        if (!textDepartment) {
            seterrorFullName("not empty");
            return;
        }
        if (!textPosition) {
            seterrorFullName("not empty");
            return;
        }
        if (!employee.fullName) {
            seterrorFullName("notempty");
        }
        seterrorFullName("");
        const formData = new FormData();

        // console.log(employee.fullName);
        // console.log(employee.email);
        // console.log(employee.department);
        // console.log(employee.address);
        // console.log(employee.position);

        formData.append("fullName", employee.fullName);
        formData.append("email", employee.email);
        formData.append("department", textDepartment);
        formData.append("position", textPosition);
        formData.append("address", textAddress);
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
    const [textAddress, settextAddress] = useState("");
    const [textDepartment, settextDepartment] = useState("");
    const [textPosition, settextPosition] = useState("");

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
                {errorFullName &&
                    <p>
                        {errorFullName}
                    </p>
                }
                <input
                    name='email'
                    value={employee.email}
                    onChange={(e) => handleChange(e)}
                    type="email"
                    placeholder='Email Address'
                />
                <Autocomplete
                    className='combobox'
                    name='department'
                    includeInputInList
                    value={textDepartment}
                    onChange={(e, value) => settextDepartment(value)}
                    options={optionsDepartment}
                    renderInput={(params) =>
                        <TextField {...params} label="Department" variant="standard" />}
                />
                <Autocomplete
                    className='combobox'
                    name="position"
                    value={textPosition}
                    onChange={(e, value) => settextPosition(value)}
                    options={optionsPosition}
                    renderInput={(params) =>
                        <TextField {...params} label="Position" variant="standard" />}
                />
                <Autocomplete
                    className='combobox'
                    name="address"
                    value={textAddress}
                    onChange={(e, value) => settextAddress(value)}
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
                <button>
                    Clear
                </button>
                <button
                    onClick={() => navigate("/")}
                >
                    Cancle
                </button>
            </div>
        </div >
    )
}

export default AddEmployee