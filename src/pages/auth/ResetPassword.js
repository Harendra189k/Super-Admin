import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../layout/Loader';
import { useForm } from 'react-hook-form';
import { pathObj } from '../../services/apiPath';
import { apiPut } from '../../utiles/apiFetch';

const RestPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const resetPassword = async (data) => {
        const payloadData = { email: location.state, password: data.password };
        try {
            const response = await apiPut(pathObj.RESET_PASSWORD, payloadData);
            if (response.data?.status === 200) {
                navigate("/");
            } else {
                console.log("Something went wrong");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { t } = useTranslation();
    const watchPassword = watch("password", "");

    const validatePassword = (value) => {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
        return regex.test(value);
    };

    return (
        <div className="login-form bg-gradient-to-r from-gradientFrom to-gradientTo h-screen flex">
            <Loader />
            <div className="bg-white max-w-lg m-auto mt-10 sm:mt-16 md:mt-28 rounded-[20px] overflow-hidden">
                <form
                    className="sm:py-12 sm:px-11 py-8 px-7 dark:bg-slate-900"
                    style={{ width: '500px' }}
                    method="post"
                    onSubmit={handleSubmit(resetPassword)}
                >
                    <h6 className="text-center font-bold text-4xl mb-5">Reset Password</h6>

                    <div className="relative z-0 mb-6 w-full group">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            className="dark:text-white block py-3 px-3 w-full text-sm text-gray-900 bg-transparent border-2 rounded-lg border-[#DFDFDF] appearance-none dark:text-black dark:border-[#DFDFDF] focus:outline-none focus:ring-0 peer"
                            placeholder=" "
                            autoComplete="new-password"
                            {...register('password', {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "New Password must contain at least 8 characters"
                                },
                                validate: value =>
                                    validatePassword(value) ||
                                    "Password must contain at least one uppercase letter, one lowercase letter, one symbol, and one number",
                            })}
                        />
                        <p className='error-msg'>{errors.password?.message}</p>
                        <label
                            htmlFor="password"
                            className="dark:bg-slate-900 dark:text-white peer-focus:font-normal absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-3 bg-white p-2 z-10 origin-[2] peer-focus:left-0 peer-focus:text-[#A5A5A5] peer-focus:text-lg peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                        >
                            {t('NEW_PASSWORD')}
                            <span className="text-red-500">*</span>
                        </label>
                        <span className="dark:text-white password_view cursor-pointer absolute top-[18px] right-[20px]" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                        </span>
                    </div>

                    <div className="relative z-0 mb-6 w-full group">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            className="dark:text-white block py-3 px-3 w-full text-sm text-gray-900 bg-transparent border-2 rounded-lg border-[#DFDFDF] appearance-none dark:text-black dark:border-[#DFDFDF] focus:outline-none focus:ring-0 peer"
                            placeholder=" "
                            autoComplete="new-password"
                            {...register('confirmPassword', {
                                required: "Confirm Password is required",
                                validate: value =>
                                    value === watchPassword ||
                                    "Passwords do not match",
                            })}
                        />
                        <p className='error-msg'>{errors.confirmPassword?.message}</p>
                        <label
                            htmlFor="confirmPassword"
                            className="dark:bg-slate-900 dark:text-white peer-focus:font-normal absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-3 bg-white p-2 z-10 origin-[2] peer-focus:left-0 peer-focus:text-[#A5A5A5] peer-focus:text-lg peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                        >
                            {t('CONFIRM_NEW_PASSWORD')}
                            <span className="text-red-500">*</span>
                        </label>
                        <span className="dark:text-white password_view cursor-pointer absolute top-[18px] right-[20px]" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                        </span>
                    </div>

                    <div className="text-center mt-8">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            {t('CHANGE_PASSWORD')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RestPassword;

// import React, { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import Loader from '../../layout/Loader';
// import { useForm } from 'react-hook-form';
// import { pathObj } from '../../services/apiPath';
// import { apiPut } from '../../utiles/apiFetch';

// const RestPassword = () => {
//     const navigate = useNavigate()

//     const location = useLocation()
//     const {
//         register,
//         handleSubmit,
//         watch,
//         formState:{errors}
//     } = useForm()


//     const resetPassword = async (data) => {
//         const payloadData = {email:location.state,password:data.password};
//         try {
//           const response = await apiPut(pathObj.RESET_PASSWORD, payloadData);
//           if (response.data?.status === 200) {
//             navigate("/");
//           } else {
//             console.log("Something went wrong");
//           }
//         } catch (error) {
//           console.error(error);
//         }
//       };
    

//   const [icon, setIcon] = useState(true);
//   const [iconb, setIconB] = useState(true);
//   const { t } = useTranslation();
  
//   const changeIcon = () => {
//     setIcon(!icon);
//   };
//   const changeIconB = () => {
//     setIconB(!iconb);
//   };
//   const validatePassword = (value) => {
//     const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
//     return regex.test(value);
//   };
//   const watchPassword = watch("newPassword", "");


//   return (
//     <div className="login-form bg-gradient-to-r from-gradientFrom to-gradientTo h-screen flex">
//       <Loader />
//       <div className=" bg-white max-w-lg m-auto mt-10 sm:mt-16 md:mt-28 rounded-[20px] overflow-hidden">
//         <form
//           className="sm:py-12 sm:px-11 py-8 px-7 dark:bg-slate-900"
//           style={{ width: '500px' }}
//           method="post"
//           onSubmit={handleSubmit(resetPassword)}
//         >
//           <h6 className="text-center font-bold text-4xl mb-5">Reset Password</h6>
         
//           <div className="relative z-0 mb-6 w-full group">
//             <input
//               type={icon ? 'password' : 'text'}
//               name="password"
//               id="password"
//               maxLength={40}
//               className="dark:text-white block py-3 px-3 w-full text-sm text-gray-900 bg-transparent border-2 rounded-lg border-[#DFDFDF] appearance-none dark:text-black dark:border-[#DFDFDF]  focus:outline-none focus:ring-0  peer"
//               placeholder=" "
//               autoComplete="new-password"
//               {...register('password', {required:"Password is Required",
//                 minLength: {
//                   value: 8,
//                   message: "New Password must contain at least 8 characters"
//                 },
//                 validate: (value) =>
//                   validatePassword(value) ||
//                   "Password must contain at least one uppercase letter, one lowercase letter, one symbol, and one number",
//               })}
//             />
//            <p className='error-msg'>{errors.password?.message}</p>
//             <label
//               htmlFor="password"
//               className="dark:bg-slate-900 dark:text-white peer-focus:font-normal absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-3 bg-white p-2 z-10 origin-[2] peer-focus:left-0 peer-focus:text-[#A5A5A5] peer-focus:text-lg  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
//             >
//               {t('NEW_PASSWORD')}
//               <span className="text-red-500">*</span>
//             </label>
//             {icon ? (
//               <span className="dark:text-white password_view cursor-pointer absolute top-[18px] right-[20px]" onClick={changeIcon}>
//                 <AiFillEyeInvisible />
//               </span>
//             ) : (
//               <span className="dark:text-white password_view absolute top-[18px] right-[20px]" onClick={changeIcon}>
//                 <AiFillEye />
//               </span>
//             )}
//           </div>

//           <div className="relative z-0 mb-6 w-full group">
//             <input
//               type={iconb ? 'password' : 'text'}
//               name="confirmPassword"
//               id="confirmPassword"
//               maxLength={40}
//               className="dark:text-white block py-3 px-3 w-full text-sm text-gray-900 bg-transparent border-2 rounded-lg border-[#DFDFDF] appearance-none dark:text-black dark:border-[#DFDFDF]  focus:outline-none focus:ring-0  peer"
//               placeholder=" "
//               autoComplete="new-password"
//               {...register('confirmPassword', {required:"Confirm Password is Required",
//                 validate: (value) =>
//                   value === watchPassword ||
//                   "Passwords do not match",
//                 })}
//             />
//             <p className='error-msg'>{errors.confirmPassword?.message}</p>
//             <label
//               htmlFor="password"
//               className="dark:bg-slate-900 dark:text-white peer-focus:font-normal absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-3 bg-white p-2 z-10 origin-[2] peer-focus:left-0 peer-focus:text-[#A5A5A5] peer-focus:text-lg  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
//             >
//               {t('CONFIRM_NEW_PASSWORD')}
//               <span className="text-red-500">*</span>
//             </label>
//             {iconb ? (
//               <span className="dark:text-white password_view cursor-pointer absolute top-[18px] right-[20px]" onClick={changeIconB}>
//                 <AiFillEyeInvisible />
//               </span>
//             ) : (
//               <span className="dark:text-white password_view absolute top-[18px] right-[20px]" onClick={changeIconB}>
//                 <AiFillEye />
//               </span>
//             )}
//           </div>
//           <div className="flex items-start mb-8">
        
//           </div>
//           <div className="text-center mt-8">
//             <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
//               {t('CHANGE_PASSWORD')}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RestPassword;
