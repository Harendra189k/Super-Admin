import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { apiPut } from "../../services/httpServices";
import { pathObj } from "../../services/apiPath";

  
const UpdateAthlete = (props) => {

    console.log("DataView====>>>", props.dataView)

  const updateAthlete = async (data) => {
    const payloadData = {
      _id:props.dataView._id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      height: data.height,
      weight: data.weight,
      membershipType: data.membershipType,
      membershipDate: data.membershipDate,
      password:data.password};
    try {
      const response = await apiPut(pathObj.UPDATE_ATHLETE, payloadData);
      if (response.data?.status === 200) {
        props.handleClose()
        
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

  return (
    <div>

      <Modal className="model-update" show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Coach</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit(updateAthlete)}>

            <div className="flex">
                
            <div className="form-group mr-3">
              <label>First Name</label>
              <input type="text" className="form-control" placeholder="Enter first name"
              defaultValue={props.dataView.firstName}
               {...register('firstName', { required: "First Name is required",
                
                minLength: {
                  value: 2,
                  message: "FirstName must contain two charecters"
                },
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "Invalid Name Format!",
                },
              })}
              />
              <p className='error-msg'>{errors.firstName?.message}</p>
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input type="text" className="form-control" placeholder="Enter last name"
              defaultValue={props.dataView.lastName}
               {...register('lastName', { required: "LastName Name is required",
                minLength: {
                  value: 2,
                  message: "LastName must contain two charecters"
                },
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "Invalid Format!",
                },
              })}
               />
               <p className='error-msg'>{errors.lastName?.message}</p>
            </div>
            </div>

            <div className="flex">
            <div className="form-group mr-3">
              <label>Email</label>
              <input type="email" className="form-control" placeholder="Enter email"
              defaultValue={props.dataView.email}
              {...register('email', {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid Email"
                }
              })}
              />
              <p className="error-msg">{errors.email?.message}</p>

            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input type="number" className="form-control" placeholder="Enter phone number"
              defaultValue={props.dataView.phone}
               {...register('phone', { required: "PhoneNumber  is required",
                minLength: {
                  value: 10,
                  message: "PhoneNumber must contain 10 digit"
                },
                maxLength: {
                  value: 10,
                  message: "PhoneNumber must contain Only 10 digit"
                }
              })}  />
              <p className="error-msg">{errors.phone?.message}</p>

            </div>
            </div>
            <div className="flex">
            <div className="form-group mr-3">
              <label>Height (Feet)</label>
              <input
                type="number"
                step="any"
                className="form-control"
                placeholder="Enter email"
                defaultValue={props.dataView.height}
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
              <input
                type="number"
                className="form-control"
                placeholder="Enter phone number"
                defaultValue={props.dataView.weight}
                {...register("weight", {
                  required: "Weight is required",
                  min: {
                    value: 25,
                    message: "Weight should be greater than 25 feet",
                  },
                  max: {
                    value: 150,
                    message: "Weight should be less than 150 feet",
                  },
                  
                  maxLength: {
                    value: 10,
                    message: "Weight must contain exactly 10 digits",
                  },
                })}
              />
              <p className="error-msg">{errors.weight?.message}</p>
            </div>
            </div>

            <div className="flex">
            <div className="form-group mr-3">
  <label>MemberShip Type</label>
  <select
    className="form-control form-date"
    defaultValue={props.dataView.membershipType}
    {...register("membershipType", {
      required: "Membership type is required",
      
    })}
  >
    <option value="">Select Membership Type</option>
    <option value="Free Trial">Free Trial</option>
    <option value="Standard Membership">Standard Membership</option>
    <option value="Prime Membership">Prime Membership</option>
  </select>
  <p className="error-msg">{errors.membershipType && errors.membershipType.message}</p>
</div>

            <div className="form-group">
              <label>MemberShip Date</label>
              <input
                type="date"
                className="form-control form-date"
                defaultValue={props.dataView.membershipDate}
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

            <Button className="date-reset-btn bg-gradientTo text-sm px-8 mr-3 py-2 rounded-lg items-center border border-transparent text-white hover:bg-DarkBlue sm:w-auto w-1/2" type="submit">
              Update Athlete
            </Button>
            
            <Button variant="secondary" className="text-sm px-8 ml-3 py-2 rounded-lg items-center border border-transparent text-white sm:w-auto w-1/2" onClick={props.handleClose}>
              Close
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UpdateAthlete;
