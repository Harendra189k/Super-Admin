import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { apiGet, apiPost } from "../../services/httpServices";
import { pathObj } from "../../services/apiPath";
import { Form } from 'react-bootstrap';

const AddTeam = ({teamData}) => {
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

  // const teamData = async (data) => {
  //   try {
  //     const response = await apiGet(pathObj.GET_TEAM);
  //     // console.log( "response +++++===>>",response);
  
  //     if (response.status === 200) {
  //     } else {
  //       console.log('Something went wrong');
  //     }
  
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };


  const addTeam = async (data) => {
    const payloadData = {
      teamName: data.teamName,
      sportType: data.sportType,
      coachName: data.coachName
    };
    try {
      const response = await apiPost(pathObj.ADD_TEAM, payloadData);
      if (response.data?.status === 200) {
         teamData()
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
      addTeam(data);
  };

  return (
    <div>
      <button
        className="date-reset-btn bg-gradientTo text-sm px-8 ml-3 mb-3 mr-3 py-2 rounded-lg items-center border border-transparent text-white hover:bg-DarkBlue sm:w-auto w-1/2"
        onClick={handleShow}
      >
        + Add Team
      </button>

      <Modal show={show} onHide={handleClose} className="model-add-athlete">
        <Modal.Header closeButton>
          <Modal.Title>Add Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>Team Name</label>
              <input
                type="text"
                pattern="[A-Za-z]+"
                className="form-control"
                placeholder="Enter team name"
                {...register("teamName", {
                  required: "teamName is required",
                  minLength: {
                    value: 2,
                    message: "teamName must contain at least two characters",
                  },
                })}
              />
              <p className="error-msg">{errors.teamName?.message}</p>
            </div>

<div className="form-group ">
  <label>Sport Type</label>
  <select
    className="form-control"
    {...register("sportType", {
      required: "sportType type is required",
    })}
  >
    <option value="">Select Sport Type</option>
    <option value="cricket">cricket</option>
    <option value="football">football</option>
    <option value="badminton">badminton</option>
    <option value="tennis">tennis</option>
    <option value="racing">racing</option>
  </select>
  <p className="error-msg">{errors.sportType && errors.sportType.message}</p>
</div>

            <div className="form-group ">
              <label>Coach Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter coach name"
                {...register("coachName", {
                  required: "coachName is required",
                  minLength: {
                    value: 2,
                    message: "coachNamemust contain at least two characters",
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Invalid Name Format!",
                  },
                })}
              />
              <p className="error-msg">{errors.coachName?.message}</p>
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

export default AddTeam;
