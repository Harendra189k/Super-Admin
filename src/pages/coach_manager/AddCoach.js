import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { apiPost } from "../../services/httpServices";
import { pathObj } from "../../services/apiPath";
import { LuLoader2 } from "react-icons/lu";


const AddCoach = ({coachData}) => {
  // console.log("coachDAta==>>", coachData)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    reset
  } = useForm();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [loader,setLoader]=useState(false)

  const watchPassword = watch("password", "");

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  const validatePassword = (value) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return regex.test(value);
  };

  const addCoach = async (data) => {
    setLoader(true)
    const payloadData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      password: data.password,
    };
    try {
      const response = await apiPost(pathObj.ADD_COACH, payloadData);
      if (response.data?.status === 200) {
        coachData()
        setLoader(false)
        reset()
        handleClose();

      } else {
        setLoader(false)
        console.log("Something went wrong");
      }
    } catch (error) {
      setLoader(false)
      console.error(error);
    }
  };

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    addCoach(data);
  };

  return (
    <div>
      <button
        className="date-reset-btn bg-gradientTo text-sm px-8 ml-3 mb-3 mr-3 py-2 rounded-lg items-center border border-transparent text-white hover:bg-DarkBlue sm:w-auto w-1/2"
        onClick={handleShow}
      >
        + Add coach
      </button>

      <Modal show={show} onHide={handleClose} className="model-add">
        <Modal.Header closeButton>
          <Modal.Title>Add Coach</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter first name"
                {...register("firstName", {
                  required: "First Name is required",
                  minLength: {
                    value: 2,
                    message: "First Name must contain at least two characters",
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
              <input
                type="text"
                className="form-control"
                placeholder="Enter last name"
                {...register("lastName", {
                  required: "Last Name is required",
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Invalid Last Name Format!",
                  },
                  minLength: {
                    value: 2,
                    message: "Last Name must contain at least two characters",
                  },
                })}
              />
              <p className="error-msg">{errors.lastName?.message}</p>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
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
              <input
                type="number"
                className="form-control"
                placeholder="Enter phone number"
                {...register("phone", {
                  required: "Phone Number is required",
                  minLength: {
                    value: 10,
                    message: "Phone Number must contain exactly 10 digits",
                  },
                  maxLength: {
                    value: 10,
                    message: "Phone Number must contain exactly 10 digits",
                  },
                })}
              />
              <p className="error-msg">{errors.phone?.message}</p>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-input">
                <input
                  type={passwordShown ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                    validate: (value) =>
                      validatePassword(value) ||
                      "Password must contain at least one uppercase letter, one lowercase letter, one symbol, and one number",
                  })}
                />
                <p className="error-msg">{errors.password?.message}</p>
                <span
                  className="password-toggle-icon"
                  onClick={togglePasswordVisibility}
                >
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
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    minLength: {
                      value: 8,
                      message: "Confirm Password must be at least 8 characters long",
                    },
                    validate: (value) =>
                      value === watchPassword ||
                      "Passwords do not match",
                  })}
                />
                <p className="error-msg">{errors.confirmPassword?.message}</p>
                <span
                  className="password-toggle-icon"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {confirmPasswordShown ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
            </div>

            <Button
              className="date-reset-btn bg-gradientTo text-sm px-8 mr-3 py-2 rounded-lg items-center border border-transparent text-white hover:bg-DarkBlue sm:w-auto w-1/2"
              type="submit"
            >
              Add Coach {loader && <LuLoader2 />}
            </Button>
            <Button
              variant="secondary"
              className="text-sm px-8 ml-3 py-2 rounded-lg items-center border border-transparent text-white sm:w-auto w-1/2"
              onClick={handleClose}
            >
              Close
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddCoach;
