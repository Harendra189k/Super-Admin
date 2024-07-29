import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { apiPost } from "../../services/httpServices";
import { pathObj } from "../../services/apiPath";
import { Form } from 'react-bootstrap';

const AddPlayer = ({playerData}) => {
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

  const addPlayer = async (data) => {
    const payloadData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      category: data.category
    };
    try {
      const response = await apiPost(pathObj.ADD_PLAYER, payloadData);
      if (response.data?.status === 200) {
        playerData()
        reset()
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
      addPlayer(data);
  };

  return (
    <div>
      <button
        className="date-reset-btn bg-gradientTo text-sm px-8 ml-3 mb-3 py-2 rounded-lg items-center border border-transparent text-white hover:bg-DarkBlue sm:w-auto w-1/2 mr-3"
        onClick={handleShow}
      >
        + Add Player
      </button>

      <Modal show={show} onHide={handleClose} className="model-add-athlete">
        <Modal.Header closeButton>
          <Modal.Title>Add Player</Modal.Title>
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
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter last name"
                {...register("lastName", {
                  required: "lastName is required",
                  minLength: {
                    value: 2,
                    message: "lastName must contain at least two characters",
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

<div className="form-group ">
  <label>Category</label>
  <select
    className="form-control"
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

            <Button
              className="date-reset-btn bg-gradientTo text-sm px-8 mr-3 py-2 rounded-lg items-center border border-transparent text-white hover:bg-DarkBlue sm:w-auto w-1/2"
              type="submit"
            >
              Add Team
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

export default AddPlayer;
