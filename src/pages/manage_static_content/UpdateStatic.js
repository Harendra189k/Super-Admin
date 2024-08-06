import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { apiPut } from "../../services/httpServices";
import { pathObj } from "../../services/apiPath";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
const UpdateStatic = (props) => {

  const updateStatic = async (data) => {
    const payloadData = {
      _id:props.dataView._id,
      title: data.title,
      description: data.description};
    try {
      const response = await apiPut(pathObj.UPDATE_PRIVACY_POLICY, payloadData);
      if (response.data?.status === 200) {
        toast.success(response?.data?.message)
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
          <Modal.Title>Update </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit(updateStatic)}>
        <div className="form-group">
              <label>Title</label>
              <span className="required-start">*</span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Title"
                defaultValue={props.dataView.title}
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 2,
                    message: "Title must contain at least two characters",
                  },
                })}
              />
              <p className="error-msg">{errors.title?.message}</p>
            </div>

            <div className="form-group ">
              <label>Description</label>
              <span className="required-start">*</span>
              <textarea
                className="form-control model-description"
                placeholder="Enter Description..."
                defaultValue={props.dataView.description}
                minLength={50}
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 2,
                    message: "Description contain at least two characters",
                  },
                })}
              />
              <p className="error-msg">{errors.description?.message}</p>
            </div>
            <Button className="date-reset-btn bg-gradientTo text-sm px-8 mr-3 py-2 rounded-lg items-center border border-transparent text-white hover:bg-DarkBlue sm:w-auto w-1/2" type="submit">
              Update
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

export default UpdateStatic;
