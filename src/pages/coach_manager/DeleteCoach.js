import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { apiDelete } from '../../services/httpServices';
import { pathObj } from '../../services/apiPath';

const DeleteCoach = (props) => {

    const deleteCoach = async (data) => {
        
        try {
          const response = await apiDelete(pathObj.DELETE_COACH + `/${props.dataView._id}`);
          if (response.data?.status === 200) {
            props.deleteModelView()

          } else {
            console.log("Something went wrong");
          }
        } catch (error) {
          console.error(error);
        }
      };
  
  return (
    <div>
      <Modal className='delete-model' show={props.showdel} onHide={props.deleteModelView}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Coach</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You Sure to Delete the Coach. ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.deleteModelView}>
            Close
          </Button>
          <Button variant="primary" onClick={deleteCoach}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default DeleteCoach
