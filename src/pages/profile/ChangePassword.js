import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import TopNavBar from '../../components/TopNavBar';
import { useForm } from 'react-hook-form';
import { apiPut } from '../../services/httpServices';
import { pathObj } from '../../services/apiPath';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'react-bootstrap';

const ChangePassword = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const changeAdminPassword = async (data) => {
    const payloadData = {
      email: data.email,
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };

    try {
      const response = await apiPut(pathObj.CHANGE_ADMIN_PASSWORD, payloadData);
      if (response.data?.status === 200) {
        navigate("/dashboard");
        reset();
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const watchPassword = watch("newPassword", "");

  const validatePassword = (value) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return regex.test(value);
  };

  return (
    <>
      <Sidebar />
      <TopNavBar />
      <div className="container">
      <Card className="bg-light text-white change-password-card">
        <h1>Change Password</h1>
        <div className="change-password-admin row mt-20">
          <div className="col-md-9 personal-info">
            <form className="form-horizontal mt-4" role="form" onSubmit={handleSubmit(changeAdminPassword)}>
              <div className="form-group-pass">
                <div className="col-lg-8">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Email"
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

<div className="form-group-pass">
  <div className="col-md-8">
    <div className="input-group">
      <input
        className="form-control"
        type={showOldPassword ? 'text' : 'password'}
        placeholder='Old Password'
        {...register('oldPassword', {
          required: "Please Enter Your Old Password",
          minLength: {
            value: 8,
            message: "Password must contain at least 8 characters"
          },
          validate: (value) =>
            validatePassword(value) ||
            "Password must contain at least one uppercase letter, one lowercase letter, one symbol, and one number",
        
        })}
      />
      <div className="input-group-append" onClick={toggleOldPasswordVisibility} style={{ cursor: 'pointer' }}>
        <span className="input-group-text">
          <FontAwesomeIcon icon={showOldPassword ? faEyeSlash : faEye} />
        </span>
      </div>
    </div>
    <p className='error-msg'>{errors.oldPassword?.message}</p>
  </div>
</div>
              <div className="form-group-pass">
                <div className="col-md-8">
                  <div className="input-group">
                    <input
                      className="form-control"
                      type={showNewPassword ? 'text' : 'password'}
                      placeholder='New Password'
                      {...register('newPassword', {
                        required: "New Password is required",
                        minLength: {
                          value: 8,
                          message: "New Password must contain at least 8 characters"
                        },
                        validate: (value) =>
                          validatePassword(value) ||
                          "Password must contain at least one uppercase letter, one lowercase letter, one symbol, and one number",
                      
                      })}
                    />
                    <div className="input-group-appendc" onClick={toggleNewPasswordVisibility} style={{ cursor: 'pointer' }}>
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
                      </span>
                    </div>
                  </div>
                  <p className='error-msg'>{errors.newPassword?.message}</p>
                </div>
              </div>

              <div className="form-group-pass">
                <div className="col-lg-8">
                <div className="input-group">

                  <input
                    className="form-control"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    {...register('confirm_password', {
                      required: "Confirm password is required",
                      validate: (value) =>
                        value === watchPassword ||
                        "Passwords do not match",
                    })}
                    />
                     <div className="input-group-appendc" onClick={toggleConfirmPasswordVisibility} style={{ cursor: 'pointer' }}>
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                      </span>
                    </div>
                    </div>
                  <p className="error-msg">{errors.confirm_password?.message}</p>
                </div>
              </div>

              <div className="form-group">
                <div className="col-md-8">
                  <input type="submit" className="btn btn-primary" value="Save Changes" />
                  <span></span>
                  <Link to='/dashboard'>
                  <input type="reset" className="btn btn-default" value="Cancel" />
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
        </Card>
      </div>
    </>
  );
};

export default ChangePassword;
