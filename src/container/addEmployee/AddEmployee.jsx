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
import { motion } from 'framer-motion';

const AddEmployee = () => {
    const EMPLOYEE_MANAGEMENT = "http://localhost:8080/api/v1/employee";

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
        seterrorImage("");
    };
    const handleChangeName = (e) => {
        const value = e.target.value;
        seterroreNameempty("");
        settextName(value);
        if (textName.length < 61) {
            seterroreNamelength("");
        }
        else {
            seterroreNamelength("Length of full name is not greater than 60 cahracters !");
            return;
        }

    };
    const handleChangeEmail = (e) => {
        const value = e.target.value;
        seterroreEmailempty("");
        settextEmail(value);
        if (textEmail.length < 66) {
            seterroreEmaillength("");
        }
        else {
            seterroreEmaillength("Length of email address is not greater than 65 cahracters !");
            return;
        }
    };
    const ClearInfor = () => {
        settextAddress("");
        settextDepartment("");
        settextPosition("");
        settextEmail("");
        settextName("");
        removeImage();
    }
    const navigate = useNavigate();
    const saveEmployee = () => {
        const formData = new FormData();
        formData.append("fullName", textName);
        formData.append("email", textEmail);
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
            })
            .catch((error) => {
                console.log(error);
            });
        ClearInfor();
        // refresh();
        annouceSucess();
        // setftoggleSuccesFull(true);
    };
    const [textAddress, settextAddress] = useState("");
    const [textDepartment, settextDepartment] = useState("");
    const [textPosition, settextPosition] = useState("");
    const [textName, settextName] = useState("");
    const [textEmail, settextEmail] = useState("");

    const [errorEmaillength, seterroreEmaillength] = useState("");
    const [errorEmailempty, seterroreEmailempty] = useState("");
    const [errorNamelength, seterroreNamelength] = useState("");
    const [errorNameempty, seterroreNameempty] = useState("");
    const [errorDeparmetnempty, seterroreDepartmentempty] = useState("");
    const [errorPosiotionempty, seterrorePositionempty] = useState("");
    const [errorAddressempty, seterroreAddressempty] = useState("");
    const [errorImage, seterrorImage] = useState("");

    const [toggleSuccesFull, setftoggleSuccesFull] = useState(false);
    const CheckErrorContent = () => {
        if (!textName) {
            seterroreNameempty("Full name is not empty !");
            return;
        }
        seterroreNameempty("");
        if (!textEmail) {
            seterroreEmailempty("Email address is not empty !");
            return;
        }
        seterroreEmailempty("");
        if (!textDepartment) {
            seterroreDepartmentempty("Department is not empty !");
            return;
        }
        if (!textPosition) {
            seterrorePositionempty("Position is not empty !");
            return;
        }
        seterrorePositionempty("");
        if (!textAddress) {
            seterroreAddressempty("Address is not empty !");
            return;
        }
        seterroreAddressempty("");
        if (!imageProfile) {
            seterrorImage("Profile picture is not empty !");
            return;
        }
        seterrorImage("");
        saveEmployee();
        // setftoggleSuccesFull(true);
    }
    const setErrorDepartmentOriginal = (e, value) => {
        seterroreDepartmentempty("");
        settextDepartment(value);
    }
    const setErrorPositionOriginal = (e, value) => {
        seterrorePositionempty("");
        settextPosition(value);
    }
    const setErrorAddressOriginal = (e, value) => {
        seterroreAddressempty("");
        settextAddress(value);
    }
    const refresh = () => window.location.reload(false);

    const ExitPage = () => {

        navigate("/");
        // window.location.reload();
        refresh();
        // navigate(0);
    }
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const annouceSucess = async () => {
        setftoggleSuccesFull(true);
        await delay(1600);
        setftoggleSuccesFull(false);

    }
    return (
        <div div className='addemployee' >
            <div className='addemployee-header'>
                <h1>Enter Information</h1>
            </div>
            <div className='addemployee-content'>
                <input
                    name="fullName"
                    value={textName}
                    onChange={(e) => handleChangeName(e)}
                    type="text"
                    placeholder='Full Name'
                />
                {errorNameempty && <p className='errortext_add'>{errorNameempty}</p>}
                {errorNamelength && <p className='errortext_add'>{errorNamelength}</p>}

                <input
                    name='email'
                    value={textEmail}
                    onChange={(e) => handleChangeEmail(e)}
                    type="email"
                    placeholder='Email Address'
                />
                {errorEmailempty && <p className='errortext_add'>{errorEmailempty}</p>}
                {errorEmaillength && <p className='errortext_add'>{errorEmaillength}</p>}

                <Autocomplete
                    className='combobox'
                    name='department'
                    includeInputInList
                    value={textDepartment}
                    onChange={(e, value) => setErrorDepartmentOriginal(e, value)}
                    options={optionsDepartment}
                    renderInput={(params) =>
                        <TextField {...params} label="Department" variant="standard" />}
                />
                {errorDeparmetnempty && <p className='errortext_add'>{errorDeparmetnempty}</p>}
                <Autocomplete
                    className='combobox'
                    name="position"
                    value={textPosition}
                    onChange={(e, value) => setErrorPositionOriginal(e, value)}
                    options={optionsPosition}
                    renderInput={(params) =>
                        <TextField {...params} label="Position" variant="standard" />}
                />
                {errorPosiotionempty && <p className='errortext_add'>{errorPosiotionempty}</p>}
                <Autocomplete
                    className='combobox'
                    name="address"
                    value={textAddress}
                    onChange={(e, value) => setErrorAddressOriginal(e, value)}
                    options={optionsAddress}
                    renderInput={(params) =>
                        <TextField {...params} label="Address" variant="standard" />}
                />
                {errorAddressempty && <p className='errortext_add'>{errorAddressempty}</p>}


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
                {errorImage && <p className='errortext_add'>{errorImage}</p>}

            </div>
            <div className='addemployee-btn'>
                <button
                    onClick={() => CheckErrorContent()}
                >
                    Save
                </button>
                <button
                    onClick={ClearInfor}
                >
                    Clear
                </button>
                <button
                    onClick={() => ExitPage()}
                >
                    Exit
                </button>
            </div>
            {toggleSuccesFull && (
                <motion.div
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ opacity: toggleSuccesFull ? 1 : 0, x: 0 }}
                    // transition={{ duration: 0.3 }}
                    className='annouce_toggle_content_add'
                >
                    <div className='annouce_toggle_content_div_add'>
                        <p>Successfully</p>
                        {/* <div className='annouce_toggle_content-btn'>
                            <button
                                onClick={() => setftoggleSuccesFull(false)}
                            >
                                Stay
                            </button>
                            <button
                                onClick={() => ExitPage()}
                            >
                                Leave
                            </button>
                        </div> */}
                    </div>
                </motion.div>
            )}
        </div >
    )
}

export default AddEmployee