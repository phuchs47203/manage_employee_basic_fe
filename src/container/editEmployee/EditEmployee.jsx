import React, { useEffect, useReducer, useRef, useState } from 'react';
import './editEmployee.css';
import { IoMdPhotos } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addAllEmployee, selectEmployee } from '../../components/features/employeeSlice';
import axios from 'axios';

const EditEmployee = () => {
    const { id } = useParams();
    const optionsAddress = ['Ha Noi', 'Ho Chi Minh', 'Ca Mau', 'Quang Binh', 'DakLak', 'Nghe An', 'Quang Tri', 'Thanh Hoa', 'Ha Tinh', 'Vung Tau', 'Binh Duong'];
    const optionsDepartment = ['Human Resources', 'Marketing', 'Technical Support Team', 'IT', 'Logistics', 'Sales', 'Customer Service', 'Finance '];
    const optionsPosition = ['Manager', 'Administrator', 'Data Analyst', 'Business Analyst', 'Recruiter', 'Assistant', 'Secretary', 'Rep'];

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
    const [employee, setemployee] = useState(
        {
            id: id,
            fullNameString: "",
            emailString: "",
            departmentString: "",
            positionString: "",
            addressString: "",
            file: "",
            timeStamp: "",
            imageName: "",
            profilePictureString: ""
        });
    const [imageProfilefirst, setimageProfilefirst] = useState(null);

    const removeImageFirst = () => {
        setimageProfilefirst(null);
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios
                    .get("http://localhost:8080/api/v1/employee" + "/" + id);
                // .then((response) => {
                //     setemployee(response.data);

                // });
                setemployee(response.data);
            } catch (error) {
                console.log(error);
            }
            setimageProfilefirst(employee.profilePictureString);
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const value = e.target.value;
        setemployee({ ...employee, [e.target.name]: value });
    };
    const [textAddress, settextAddress] = useState("");
    const [textDepartment, settextDepartment] = useState("");
    const [textPosition, settextPosition] = useState("");

    return (
        <div div className='editemployee' >
            <div className='editemployee-header'>
                <h1>Edit Employee</h1>
            </div>
            <div className='editemployee-column'>
                <div className='content_left'>
                    <img src={employee.profilePictureString} alt="" />
                </div>
                <div className='content_right'>
                    <div className='editemployee-content'>
                        <input
                            type="text"
                            name="fullNameString"
                            value={employee.fullNameString}
                            placeholder='Full Name'
                        />

                        <input
                            name='emailString'
                            type="email"
                            value={employee.emailString}
                            onChange={(e) => handleChange(e)}
                            placeholder='Email Address'
                        />
                        <Autocomplete
                            className='edit_combobox'
                            name='departmentString'
                            value={employee.departmentString}
                            options={optionsDepartment}
                            renderInput={(params) =>
                                <TextField {...params} label="Department" variant="standard" />}
                        />
                        <Autocomplete
                            className='edit_combobox'
                            name='positionString'
                            value={employee.positionString}
                            options={optionsPosition}
                            renderInput={(params) =>
                                <TextField {...params} label="Position" variant="standard" />}
                        />
                        <Autocomplete
                            className='edit_combobox'
                            options={optionsAddress}
                            value={textAddress}
                            onChange={(e, value) => settextAddress(value)}
                            renderInput={(params) =>
                                <TextField {...params} label={employee.addressString} variant="standard" />}
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
                        >
                            Update
                        </button>
                        <button>
                            Cancle
                        </button>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default EditEmployee