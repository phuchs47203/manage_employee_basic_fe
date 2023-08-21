import React, { useEffect, useReducer, useRef, useState } from 'react';
import './editEmployee.css';
import { IoMdPhotos } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addAllEmployee, addEmployee, selectEmployee } from '../../components/features/employeeSlice';
import axios from 'axios';
import { motion } from 'framer-motion';

const EditEmployee = () => {
    const { id } = useParams();
    const EMPLOYEE_MANAGEMENT_LINK = "http://localhost:8080/api/v1/employee/" + id;
    const optionsAddress = ['Ha Noi', 'Ho Chi Minh', 'Ca Mau', 'Quang Binh', 'DakLak', 'Nghe An', 'Quang Tri', 'Thanh Hoa', 'Ha Tinh', 'Vung Tau', 'Binh Duong'];
    const optionsDepartment = ['Human Resources', 'Marketing', 'Technical Support Team', 'IT', 'Logistics', 'Sales', 'Customer Service', 'Finance '];
    const optionsPosition = ['Manager', 'Administrator', 'Data Analyst', 'Business Analyst', 'Recruiter', 'Assistant', 'Secretary', 'Rep'];

    const [imageProfile, setimageProfile] = useState(null);
    const [toggleUpdate, settoggleUpdate] = useState(false);

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
                    .get(EMPLOYEE_MANAGEMENT_LINK);
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
        // if (employee.emailString) {
        //     seterroreEmailempty("");
        // }
        if (employee.emailString) {
            seterroreEmailempty("");
        }
        else {
            seterroreEmailempty("Email address is not empty");
        }

        if (employee.emailString.length > 65) {
            seterroreEmaillength("Length of email address is not greater than 65 cahracters !");
        }
        else {
            seterroreEmaillength("");
        }
    };
    const navigate = useNavigate();
    const [textAddress, settextAddress] = useState("");
    const [textDepartment, settextDepartment] = useState("");
    const [textPosition, settextPosition] = useState("");

    const refresh = () => window.location.reload(true);

    const editEmployee = (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (!imageProfile) {
            formData.append("file", employee.profilePictureString);
        }
        else {
            formData.append("file", imageProfile);
        }

        formData.append("email", employee.emailString);
        formData.append("position", employee.positionString);
        formData.append("department", employee.departmentString);
        if (!textAddress) {
            formData.append("address", employee.addressString);
        }
        else {
            formData.append("address", textAddress);
        }

        formData.append("fullName", employee.fullNameString);

        axios
            .put(EMPLOYEE_MANAGEMENT_LINK, formData, {
                headers: { Accept: "application/json" },
            })
            .then((response) => {
                inputRef.current.value = "";
                dispatch(addEmployee(response.data));
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        // navigate("/");
        refresh();
    };
    const [errorEmaillength, seterroreEmaillength] = useState("");
    const [errorEmailempty, seterroreEmailempty] = useState("");
    const CheckErrorContent = () => {
        if (!employee.emailString) {
            seterroreEmailempty("Email address is not empty !");
            return;
        }
        seterroreEmailempty("");
        if (employee.emailString.length > 70) {
            seterroreEmaillength("Length of email address is not greater than 70 cahracters !");
            return;
        }
        seterroreEmaillength("");
        settoggleUpdate(true);
    }
    const ExitPage = () => {
        navigate("/");
        refresh();
    }

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
                        {errorEmailempty && <p className='errortext'>
                            {errorEmailempty}
                        </p>
                        }
                        {errorEmaillength && <p className='errortext'>
                            {errorEmaillength}
                        </p>
                        }
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
                                <TextField {...params} label={employee.addressString} variant='standard' />}
                        />

                        {imageProfile && (
                            <div

                                className='imgPicture_edit'>
                                <img src={imageProfile} alt="" />
                                <RiDeleteBin6Line
                                    onClick={removeImage}
                                    className="Ridepete" />
                            </div>
                        )}
                        <div
                            onClick={handleClick}
                            className='editeemployee-content-img'>
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
                    <div className='editeemployee-btn'>
                        <button
                            onClick={() => CheckErrorContent()}
                        >
                            Update
                        </button>
                        <button onClick={() => ExitPage()}>
                            Exit
                        </button>
                    </div>
                    <div className='annouce_toggle'>
                        {
                            toggleUpdate && (
                                <motion.div
                                    initial={{ opacity: 0, x: 0 }}
                                    animate={{ opacity: toggleUpdate ? 1 : 0, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className='annouce_toggle_content'
                                >
                                    <div className='annouce_toggle_content_div'>
                                        <p>Do you want to update information ?</p>
                                        <div className='annouce_toggle_content-btn'>
                                            <button
                                                onClick={editEmployee}
                                            >
                                                Yes
                                            </button>
                                            <button
                                                onClick={() => settoggleUpdate(false)}
                                            >
                                                No
                                            </button>

                                        </div>
                                    </div>

                                </motion.div>
                            )
                        }
                    </div>
                </div>
            </div>

        </div >
    )
}

export default EditEmployee