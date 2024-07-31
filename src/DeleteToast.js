import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteToast = ({showToast}) => {
    // console.log("hj", showToast)
    // const [show, setShow] = useState(false);
    const notify = () => toast("Wow so easy!");
  return (
    <div>
        {/* <button onClick={notify}>Notify!</button> */}
        <ToastContainer />
      </div>
    
    //       <Row>
    //   <Col xs={6}>
    //     <Toast onClose={() => setShow(false)} show={showToast} delay={5000} autohide>
    //       <Toast.Header>
    //         <img
    //           src="holder.js/20x20?text=%20"
    //           className="rounded me-2"
    //           alt=""
    //         />
    //       </Toast.Header>
    //       <Toast.Body>Data Deleted SuccessFully</Toast.Body>
    //     </Toast>
    //   </Col>
    //   <Col xs={6}>
    //   </Col>
    // </Row>
   
  )
}

export default DeleteToast
