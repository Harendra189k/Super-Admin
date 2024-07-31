import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { apiPost } from "../../services/httpServices";
import { pathObj } from "../../services/apiPath";
import { Form } from "react-bootstrap";

const AddAthlete = ({athleteData}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    reset,
  } = useForm();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    reset()
    setShow(false);
  }
  const handleShow = () => setShow(true);

  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

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

  const addAthlete = async (data) => {
    const payloadData = {
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
      const response = await apiPost(pathObj.ADD_ATHLETE, payloadData);
      if (response.data?.status === 200) {
        athleteData()
        reset();
        handleClose();
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
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
    addAthlete(data);
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
      <button
        className="date-reset-btn bg-gradientTo text-sm px-8 ml-3 mb-3 mr-3 py-2 rounded-lg items-center border border-transparent text-white hover:bg-DarkBlue sm:w-auto w-1/2"
        onClick={handleShow}
      >
        + Add Athlete
      </button>

      <Modal show={show} onHide={handleClose} className="model-add-athlete">
        <Modal.Header closeButton>
          <Modal.Title>Add Athlete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex">
              <div className="form-group mr-3">
                <label>First Name</label>
                <span className="required-start">*</span>
                <input
                  type="text"
                  className="form-control"
                  // placeholder="Enter first name"
                  {...register("firstName", {
                    required: "First Name is required",
                    minLength: {
                      value: 2,
                      message:
                        "First Name must contain at least two characters",
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
                  {...register("lastName", {
                    required: "Last Name is required",
                    minLength: {
                      value: 2,
                      message: "Last Name must contain at least two characters",
                    },
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message: "Invalid LastName Format!",
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
                  className="form-control form-emaill"
                  // placeholder="Enter email"
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
                  maxLength={10}
                  onInput={(e) => preventMaxInput(e, 10)}
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
            </div>

            <div className="flex">
              <div className="form-group mr-3">
                <label>Height (feet)</label>
                <span className="required-start">*</span> 
                <input
                  type="number"
                  step="any"
                  className="form-control"
                  // placeholder="Enter email"
                  min={0}
                  maxLength={1}
                  max={7}
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
                <label>Weight (Kg)</label>
                <span className="required-start">*</span>
                <input
                  type="number"
                  className="form-control"
                  min={0}
                  max={150}
                  maxLength={3}
                  onInput={(e) => preventMaxInput(e, 3)}
                  {...register("weight", {
                    required: "Weight is required",
                    min: {
                      value: 25,
                      message: "Weight should be greater than 25 KG",
                    },
                    max: {
                      value: 150,
                      message: "Weight should be less than 151 KG",
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
                  {...register("membershipType", {
                    required: "Membership type is required",
                  })}
                >
                  <option className="select-place" value="">Select Membership Type</option>
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
                  {...register("membershipDate", {
                    required: "Date is required",
                  })}
                />
                <p className="error-msg">{errors.membershipDate?.message}</p>
              </div>
            </div>

            <div className="flex">
              <div className="form-group mr-3">
                <label>Password</label>
                <span className="required-start">*</span>
                <div className="password-input form-date">
                  <input
                    type={passwordShown ? "text" : "password"}
                    className="form-control"
                    // placeholder="Enter password"
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
                    {passwordShown ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </span>
                </div>
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <span className="required-start">*</span>
                <div className="password-input">
                  <input
                    type={confirmPasswordShown ? "text" : "password"}
                    className="form-control"
                    // placeholder="Confirm password"
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      minLength: {
                        value: 8,
                        message:
                          "Confirm Password must be at least 8 characters long",
                      },
                      validate: (value) =>
                        value === watchPassword || "Passwords do not match",
                    })}
                  />
                  <p className="error-msg">{errors.confirmPassword?.message}</p>
                  <span
                    className="password-toggle-icon"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {confirmPasswordShown ? (
                      <AiFillEye />
                    ) : (
                      <AiFillEyeInvisible />
                    )}
                  </span>
                </div>
              </div>
            </div>

            <Button
              className="date-reset-btn bg-gradientTo text-sm px-8 mr-3 py-2 rounded-lg items-center border border-transparent text-white hover:bg-DarkBlue sm:w-auto w-1/2"
              type="submit"
            >
              Add Athlete
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

export default AddAthlete;
