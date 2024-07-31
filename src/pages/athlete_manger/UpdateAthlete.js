import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { apiPut } from "../../services/httpServices";
import { pathObj } from "../../services/apiPath";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateAthlete = (props) => {

  const [formattedDate, setFormattedDate] = useState('');
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({defaultValues:{membershipDate:formatToDateInputValue(new Date(props.dataView.membershipDate))}});

  console.log("DataView====>>>", props.dataView);

  const updateAthlete = async (data) => {
    const payloadData = {
      _id: props.dataView._id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      height: data.height,
      weight: data.weight,
      membershipType: data.membershipType,
      membershipDate: data.membershipDate,
      password: data.password,
    };
    try {
      const response = await apiPut(pathObj.UPDATE_ATHLETE, payloadData);
      if (response.data?.status === 200) {
        toast.success(response?.data?.message)
        props.handleClose();
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [show, setShow] = useState(props.show);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  const preventMaxInput = (e, limit) => {
    e.target.value = e.target.value.trimStart();
    e.target.value = e.target.value.replace(/  +/g, " ");
    if (e.target.value.length > limit) {
      e.target.value = e.target.value.slice(0, limit);
    }
  };
  console.log("new Date(props.dataView.membershipDate)", new Date(props.dataView.membershipDate))
  // function getFormattedDate(date) {
  //   var year = date.getFullYear();
  
  //   var month = (1 + date.getMonth()).toString();
  //   month = month.length > 1 ? month : '0' + month;
  
  //   var day = date.getDate().toString();
  //   day = day.length > 1 ? day : '0' + day;
    
  //   return month + '/' + day + '/' + year;
  // }
  // const [formateDate, setFormateDate] = useState('')
  // useEffect(() => {
  //   setFormateDate(getFormattedDate(new Date(props.dataView.membershipDate)))
  // }, [])
  // console.log("formateDate", formateDate)
  function formatToDateInputValue(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  
  useEffect(() => {
    const date = new Date(props.dataView.membershipDate);
    setFormattedDate(formatToDateInputValue(date));
  }, [props.dataView.membershipDate]);
  return (
    <div>
      <Modal
        className="model-update"
        show={props.show}
        onHide={props.handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Coach</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(updateAthlete)}>
            <div className="flex">
              <div className="form-group mr-3">
                <label>First Name</label>
                <span className="required-start">*</span>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={props.dataView.firstName}
                  {...register("firstName", {
                    required: "First Name is required",

                    minLength: {
                      value: 2,
                      message: "FirstName must contain two charecters",
                    },
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message: "Invalid Name Format!",
                    },
                  })}
                />
                <p className="error-msg">{errors.firstName?.message}</p>
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <span className="required-start">*</span>
                <input
                  type="text"
                  className="form-control"
                  // placeholder="Enter last name"
                  defaultValue={props.dataView.lastName}
                  {...register("lastName", {
                    required: "LastName Name is required",
                    minLength: {
                      value: 2,
                      message: "LastName must contain two charecters",
                    },
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message: "Invalid Format!",
                    },
                  })}
                />
                <p className="error-msg">{errors.lastName?.message}</p>
              </div>
            </div>

            <div className="flex">
              <div className="form-group mr-3">
                <label>Email</label>
                <span className="required-start">*</span>
                <input
                  type="email"
                  className="form-control"
                  // placeholder="Enter email"
                  defaultValue={props.dataView.email}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid Email",
                    },
                  })}
                />
                <p className="error-msg">{errors.email?.message}</p>
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <span className="required-start">*</span>
                <input
                  type="number"
                  className="form-control"
                  // placeholder="Enter phone number"
                  defaultValue={props.dataView.phone}
                  maxLength={10}
                  onInput={(e) => preventMaxInput(e, 10)}
                  {...register("phone", {
                    required: "PhoneNumber  is required",
                    minLength: {
                      value: 10,
                      message: "PhoneNumber must contain 10 digit",
                    },
                    maxLength: {
                      value: 10,
                      message: "PhoneNumber must contain Only 10 digit",
                    },
                  })}
                />
                <p className="error-msg">{errors.phone?.message}</p>
              </div>
            </div>
            <div className="flex">
              <div className="form-group mr-3">
                <label>Height (Feet)</label>
                <span className="required-start">*</span>
                <input
                  type="number"
                  step="any"
                  className="form-control"
                  // placeholder="Enter email"
                  defaultValue={props.dataView.height}
                  min={0}
                  max={7}
                  maxLength={1}
                  onInput={(e) => preventMaxInput(e, 1)}
                  {...register("height", {
                    required: "Height is required",
                    min: {
                      value: 2,
                      message: "Height should be greater than 2 feet",
                    },
                    max: {
                      value: 8,
                      message: "Height should be less than 8 feet",
                    },
                  })}
                />
                <p className="error-msg">{errors.height?.message}</p>
              </div>

              <div className="form-group">
                <label>Weight(Kg)</label>
                <span className="required-start">*</span>
                <input
                  type="number"
                  className="form-control"
                  // placeholder="Enter phone number"
                  defaultValue={props.dataView.weight}
                  min={0}
                  maxLength={3}
                  max={150}
                  onInput={(e) => preventMaxInput(e, 3)}
                  {...register("weight", {
                    required: "Weight is required",
                    min: {
                      value: 25,
                      message: "Weight should be greater than 25 KG",
                    },
                    max: {
                      value: 150,
                      message: "Weight should be less or equal to 150 KG",
                    },
                  })}
                />
                <p className="error-msg">{errors.weight?.message}</p>
              </div>
            </div>

            <div className="flex">
              <div className="form-group mr-3">
                <label>MemberShip Type</label>
                <span className="required-start">*</span>
                <select
                  className="form-control form-date"
                  defaultValue={props.dataView.membershipType}
                  {...register("membershipType", {
                    required: "Membership type is required",
                  })}
                >
                  <option className="select-place" value="">
                    Select Membership Type
                  </option>
                  <option value="Free Trial">Free Trial</option>
                  <option value="Standard Membership">
                    Standard Membership
                  </option>
                  <option value="Prime Membership">Prime Membership</option>
                </select>
                <p className="error-msg">
                  {errors.membershipType && errors.membershipType.message}
                </p>
              </div>

              <div className="form-group">
                <label>MemberShip Date</label>
                <span className="required-start">*</span>
                <input
                  type="date"
                  className="form-control form-date"
                  defaultValue={formattedDate}
                  {...register("membershipDate", {
                    required: "Date is required",
                  })}
                />
                <p className="error-msg">{errors.membershipDate?.message}</p>
              </div>
            </div>

            {/* <div className="flex">
            <div className="form-group mr-3">
              <label>Password</label>
              <div className="password-input">
                <input
                  type={passwordShown ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter password"
                  defaultValue={props.dataView.password}
                  {...register('password', { required: "password  is required",
                    minLength: {
                      value: 8,
                      message: "password must contain 8 charecter"
                    }
                  })}
                />
                 <p className="error-msg">{errors.password?.message}</p>
                <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                  {passwordShown ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <div className="password-input">
                <input
                  type={confirmPasswordShown ? "text" : "password"}
                  className="form-control"
                  placeholder="Confirm password"
                  defaultValue={props.dataView.password}
                  {...register('confirmPassword', { required: "Confirm password  is required",
                    minLength: {
                      value: 8,
                      message: "confirm password must contain 8 charecter"
                    }
                  })}
                />
                 <p className="error-msg">{errors.confirmPassword?.message}</p>
                <span className="password-toggle-icon" onClick={toggleConfirmPasswordVisibility}>
                  {confirmPasswordShown ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
            </div>
            </div> */}

            <Button
              className="date-reset-btn bg-gradientTo text-sm px-8 mr-3 py-2 rounded-lg items-center border border-transparent text-white hover:bg-DarkBlue sm:w-auto w-1/2"
              type="submit"
            >
              Update Athlete
            </Button>

            <Button
              variant="secondary"
              className="text-sm px-8 ml-3 py-2 rounded-lg items-center border border-transparent text-white sm:w-auto w-1/2"
              onClick={props.handleClose}
            >
              Close
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UpdateAthlete;
