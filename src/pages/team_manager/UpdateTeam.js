import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { apiPut } from "../../services/httpServices";
import { pathObj } from "../../services/apiPath";

  
const UpdateTeam = (props) => {

    console.log("DataView====>>>", props.dataView)

  const updateTeam = async (data) => {
    const payloadData = {
      _id:props.dataView._id,
      teamName: data.teamName,
      sportType: data.sportType,
      coachName: data.coachName,};
    try {
      const response = await apiPut(pathObj.UPDATE_TEAM, payloadData);
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
  

  return (
    <div>

      <Modal className="model-update" show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Coach</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit(updateTeam)}>

        <div className="form-group">
              <label>Team Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter team name"
                defaultValue={props.dataView.teamName}
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
    defaultValue={props.dataView.sportType}
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
                defaultValue={props.dataView.coachName}
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

            <Button className="date-reset-btn bg-gradientTo text-sm px-8 mr-3 py-2 rounded-lg items-center border border-transparent text-white hover:bg-DarkBlue sm:w-auto w-1/2" type="submit">
              Update Team
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

export default UpdateTeam;
