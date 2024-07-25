import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../layout/Loader';
import axios from 'axios';
import { apiPost } from '../../services/httpServices';
import { pathObj } from '../../services/apiPath';


const Login = () => {
  const navigate = useNavigate();

  const [icon, setIcon] = useState(true);
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);


  const handleCheckboxChange = (e) => {
    setRememberMe(e.target.checked);
  };

  useEffect(() => {
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
      localStorage.setItem('rememberedPassword', password);
    } else {
      localStorage.removeItem('rememberedEmail');
      localStorage.removeItem('rememberedPassword');
    }
  }, [rememberMe, email, password]);

  useEffect(() => {
    const storedEmail = localStorage.getItem('rememberedEmail');
    const storedPassword = localStorage.getItem('rememberedPassword');

    if (rememberMe && storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
    }
  }, [rememberMe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validate({ email, password });
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      adminLogin();
      console.log('Email:', email);
      console.log('Password:', password);
      // Proceed with login logic here
    } else {
      console.log('Form has errors. Please fix them.');
    }
  };

  const validate = (data) => {
    let errors = {};

    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Email address is invalid';
    }

    if (!data.password.trim()) {
      errors.password = 'Password is required';
    } else if (data.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    } else if (!/[A-Z]/.test(data.password)) {
      errors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(data.password)) {
      errors.password = 'Password must contain at least one lowercase letter';
    } else if (!/\d/.test(data.password)) {
      errors.password = 'Password must contain at least one number';
    } else if (!/[@$!%*?&]/.test(data.password)) {
      errors.password = 'Password must contain at least one special character';
    }

    return errors;
  };

  const changeIcon = () => {
    setIcon(!icon);
  };


  const adminLogin = async (data) => {
    const payloadData =  {email, password}
    try {
      const response = await apiPost(pathObj.LOGIN, payloadData)
      if (response.status === 200) {
        navigate("/dashboard");
        localStorage.setItem("token", response.data.token)
    } else {
        console.log('Something went wrong')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="login-form bg-gradient-to-r from-gradientFrom to-gradientTo h-screen">
      <Loader />
      <div className=" bg-white max-w-lg m-auto mt-10 sm:mt-16 md:mt-28 rounded-[20px] overflow-hidden">
        <form
          className="sm:py-12 sm:px-11 py-8 px-7 dark:bg-slate-900"
          style={{ width: '500px' }}
          onSubmit={handleSubmit}
          method="post"
        >
          <h6 className="text-center font-bold text-4xl">Super Coach</h6>
          <h1 className="text-center text-[40px] font-bold dark:text-white">{t('LOGIN_LETS_START')}!</h1>
          <h2 className="text-center text-lg text-[#A5A5A5] sm:mb-12 mb-6">{t('LOGIN_ONLY_FEW_MINUTES')}</h2>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              id="email"
              className="dark:text-white block py-3 px-3 w-full text-sm text-gray-900 bg-transparent border-2 rounded-lg border-[#DFDFDF] appearance-none dark:text-black dark:border-[#DFDFDF]  focus:outline-none focus:ring-0  peer"
              placeholder=" "
              name="email"
              value={email}
              onChange={handleChange}
            />
            {errors.email && <p className="errorrr">{errors.email}</p>}

            <label
              htmlFor="email"
              className="dark:text-white peer-focus:font-normal absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-3 bg-white dark:bg-slate-900 p-2 z-10 origin-[2] peer-focus:left-0 peer-focus:text-[#A5A5A5] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              {t('O_EMAIL_ID')}
              <span className="text-red-500">*</span>
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type={icon ? 'password' : 'text'}
              name="password"
              id="password"
              maxLength={40}
              className="dark:text-white block py-3 px-3 w-full text-sm text-gray-900 bg-transparent border-2 rounded-lg border-[#DFDFDF] appearance-none dark:text-black dark:border-[#DFDFDF]  focus:outline-none focus:ring-0  peer"
              placeholder=" "
              autoComplete="new-password"
              value={password}
              onChange={handleChange}
            />
            {errors.password && <p className="errorrr">{errors.password}</p>}
            <label
              htmlFor="password"
              className="dark:bg-slate-900 dark:text-white peer-focus:font-normal absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-3 bg-white p-2 z-10 origin-[2] peer-focus:left-0 peer-focus:text-[#A5A5A5] peer-focus:text-lg  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              {t('O_PASSWORD')}
              <span className="text-red-500">*</span>
            </label>
            {icon ? (
              <span className="dark:text-white password_view cursor-pointer absolute top-[18px] right-[20px]" onClick={changeIcon}>
                <AiFillEyeInvisible />
              </span>
            ) : (
              <span className="dark:text-white password_view absolute top-[18px] right-[20px]" onClick={changeIcon}>
                <AiFillEye />
              </span>
            )}
          </div>
          <div className="flex items-start mb-8">
            <div className="flex items-center h-5">
              <div>
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 bg-gray-50 rounded border border-[#DFDFDF] focus:ring-3 focus:ring-[#DFDFDF]"
                />
              </div>
              <label htmlFor="remember" className="ml-2 text-sm text-black dark:text-white">
                {t('LOGIN_REMEMBER_ME')}
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="ml-auto text-[#6236FF] hover:text-[#9D36FF] hover:underline text-sm font-medium"
            >
              {t('LOGIN_FORGOT_PASSWORD')}
            </Link>
          </div>
          <div className="text-center mt-8">
            <button type="submit" className="date-login-btn bg-gradientTo text-sm px-8 mb-3 py-2 rounded-lg items-center border border-transparent text-white hover:bg-DarkBlue sm:w-auto w-1/2">
              {t('LOGIN_LOGIN')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
