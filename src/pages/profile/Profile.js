import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import TopNavBar from '../../components/TopNavBar'
import { useForm } from 'react-hook-form';
import { apiGet, apiPut } from '../../services/httpServices';
import { pathObj } from '../../services/apiPath';
import { Link, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

const Profile = () => {

  const [storeAdmin, setStoreAdmin] = useState({})
  const navigate = useNavigate()
  
  
  const getAdmin = async (data) => {
    try {
      const response = await apiGet(pathObj.GET_ADMIN);
      // console.log("object ressss", response)
      
      if (response.status === 200) {
        setStoreAdmin(response.data);
      } else {
        console.log('Something went wrong');
      }
  
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAdmin();
  }, []);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: getAdmin
  });

  const updateAdmin = async (data) => {
    const payloadData = {
      firstName: data.firstName ? data.firstName : storeAdmin.firstName ,
      lastName: data.lastName ? data.lastName: storeAdmin.lastName,
      email: data.email ? data.email: storeAdmin.email,};

    try {
      const response = await apiPut(pathObj.UPDATE_ADMIN, payloadData);
      if (response.data?.status === 200) {
        setStoreAdmin(response.data)
        navigate("/dashboard")
        reset()
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
        <Sidebar />
        <TopNavBar />
        <div>
        <Card className="bg-light text-white profile-card">
        <div class="container">
    <h1 className='heading-edit-profile'>Edit Profile</h1>
	<div className="row mt-20 change-profile-admin">
      {/* <div className="col-md-3">
        <div className="text-center">
          <img src="https://png.pngitem.com/pimgs/s/150-1503945_transparent-user-png-default-user-image-png-png.png" class="avatar img-circle" alt="avatar"/>
          <h6>Upload a different photo...</h6>
          
          <input type="file" className="form-control"/>
        </div>
      </div> */}
      
      <div className="col-md-9 personal-info">
       
        
        <form className="form-horizontal mt-4 " role="form" onSubmit={handleSubmit(updateAdmin)}>
<div className="form-group">
            <label className="profile-label">FirstName:</label>
            <div className="col-md-8">
              <input className="form-control" type="text" placeholder='FirstName'
              defaultValue={storeAdmin.firstName}
              {...register('firstName', { required: "First Name is required",
                minLength: {
                  value: 2,
                  message: "FirstName must contain two charecters"
                }
              })}
              />
              <p className='error-msg'>{errors.firstName?.message}</p>
            </div>
            <label className="profile-label-ln ">LastName:</label>
            <div className="col-md-8">
              <input className="form-control" type="text" placeholder='lastName'
              defaultValue={storeAdmin.lastName}
              {...register('lastName', { required: "Last Name is required",
                minLength: {
                  value: 2,
                  message: "LastName must contain two charecters"
                }
              })}
              />
              <p className='error-msg'>{errors.lastName?.message}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="profile-label-em ">Email:</label>
            <div className="col-lg-8">
             <input
  className="form-control"
  type="text"
  placeholder="Email"
  defaultValue={storeAdmin.email}
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
          </div>
         
          <div className="form-group">
            <label className="col-md-3 control-label"></label>
            <div className="col-md-8">
              <input type="submit" className="btn btn-primary" value="Save Changes"/>
              <span></span>
              <Link to='/dashboard'>
              <input type="reset" className="btn btn-default bg-white ml-3" value="Cancel"/>
              </Link>
            </div>
          </div>
        </form>
      </div>
  </div>
</div>
</Card>
        </div>
    </>
    
  )
}

export default Profile
