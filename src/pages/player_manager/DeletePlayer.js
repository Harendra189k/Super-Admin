import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { apiDelete } from '../../services/httpServices';
import { pathObj } from '../../services/apiPath';

const DeletePlayer = (props) => {

    const deletePlayer = async (data) => {
        
        try {
          const response = await apiDelete(pathObj.DELETE_PLAYER + `/${props.dataView._id}`);
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
        <img className='delete-status-model' src='https://www.shutterstock.com/image-vector/delete-icon-no-sign-close-600nw-1077922715.jpg'></img>
        <Modal.Body>Are You Sure to Delete the Coach. ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.deleteModelView}>
            Close
          </Button>
          <Button variant="primary" onClick={deletePlayer}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default DeletePlayer
