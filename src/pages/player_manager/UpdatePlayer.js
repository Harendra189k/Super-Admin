import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { apiPut } from "../../services/httpServices";
import { pathObj } from "../../services/apiPath";

  
const UpdatePlayer = (props) => {

    // console.log("DataView====>>>", props.dataView)

  const updateTeam = async (data) => {
    const payloadData = {
      _id:props.dataView._id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      category: data.category,
    };
    try {
      const response = await apiPut(pathObj.UPDATE_PLAYER, payloadData);
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
          <Modal.Title>Update Player</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit(updateTeam)}>

        <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter first name"
                defaultValue={props.dataView.firstName}
                {...register("firstName", {
                  required: "firstName is required",
                  minLength: {
                    value: 2,
                    message: "firstName must contain at least two characters",
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Invalid Name Format!",
                  },
                })}
              />
              <p className="error-msg">{errors.firstName?.message}</p>
            </div>

            <div className="form-group ">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter coach name"
                defaultValue={props.dataView.lastName}
                {...register("lastName", {
                  required: "lastName is required",
                  minLength: {
                    value: 2,
                    message: "lastName contain at least two characters",
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Invalid Name format!",
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

<div className="form-group ">
  <label>Category</label>
  <select
    className="form-control"
    defaultValue={props.dataView.category}
    {...register("category", {
      required: "category type is required",
    })}
  >
    <option value="">Select Category</option>
    <option value="batsman">batsman</option>
    <option value="bowler">bowler</option>
    <option value="wicketkeeper">wicketkeeper</option>
    <option value="allrounder">allrounder</option>
  </select>
  <p className="error-msg">{errors.category && errors.category.message}</p>
</div>

            <Button className="date-reset-btn bg-gradientTo text-sm px-8 mr-3 py-2 rounded-lg items-center border border-transparent text-white hover:bg-DarkBlue sm:w-auto w-1/2" type="submit">
              Update Player
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

export default UpdatePlayer;
