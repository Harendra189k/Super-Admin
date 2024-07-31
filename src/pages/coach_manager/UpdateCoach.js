import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { apiPut } from "../../services/httpServices";
import { pathObj } from "../../services/apiPath";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateCoach = (props) => {
  console.log("Data Coach ==", props.dataView);

  const updateCoach = async (data) => {
    const payloadData = {
      _id: props.dataView._id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      password: data.password,
    };
    try {
      const response = await apiPut(pathObj.UPDATE_COACH, payloadData);
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
          <form onSubmit={handleSubmit(updateCoach)}>
            <div className="form-group">
              <label>First Name</label>
              <span className="required-start">*</span>
              <input
                type="text"
                className="form-control"
                // placeholder="Enter first name"
                defaultValue={props.dataView.firstName}
                {...register("firstName", {
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "First name must contain two charecters",
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Invalid Format!",
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

            <div className="form-group">
              <label>Email</label>
              <span className="required-start">*</span>
              <input
                type="email"
                className="form-control"
                defaultValue={props.dataView.email}
                {...register("email", {
                  required: "Email is required",
                  minLength: {
                    value: 3,
                    message: "Email must be at least 3 characters long",
                  },
                  pattern: {
                    value: /^(?![0-9])[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
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
                min={0}
                maxLength={10}
                onInput={(e) => preventMaxInput(e, 10)}
                // placeholder="Enter phone number"
                defaultValue={props.dataView.phone}
                {...register("phone", {
                  required: "Phone number  is required",
                  minLength: {
                    value: 10,
                    message: "Phone number must contain 10 digit",
                  },
                  maxLength: {
                    value: 10,
                    message: "Phone number must contain only 10 digit",
                  },
                })}
              />
              <p className="error-msg">{errors.phone?.message}</p>
            </div>

            {/* <div className="form-group">
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
            </div> */}

            <Button
              className="date-reset-btn bg-gradientTo text-sm px-8 mr-3 py-2 rounded-lg items-center border border-transparent text-white hover:bg-DarkBlue sm:w-auto w-1/2"
              type="submit"
            >
              Update Coach
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

export default UpdateCoach;
