import React, { useState } from 'react';
import OButton from "../../components/reusable/OButton";
import Loader from '../../layout/Loader';
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from 'react-router-dom';
import { apiPost } from '../../services/httpServices';
import { pathObj } from '../../services/apiPath';

const ForgotPassword = () => {
    const { t } = useTranslation();
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    // function forgetPassword(){
    //     axios.post('http://192.168.1.79:5000/api/prime/admin-forgotpassword', {email: email})
    //     .then(function(response){
    //         console.log(response)
    //         navigate("/reset-password-verify",{state:email})
    //     })
    //     .catch(function(err){
    //       if (err.response && err.response.status === 401) {
    //         alert(err.response.data.message);
    //       }
    //         console.log(err)
    //     })
    //   }

      const forgetPassword = async (data) => {
        const payloadData = { email:email};
        try {
          const response = await apiPost(pathObj.FORGOT_PASSWORD, payloadData);
          console.log(response, "response===");
          if (response.status === 200) {
            navigate("/reset-password-verify",{state:email});
          } else {
            console.log("Something went wrong");
          }
        } catch (error) {
          console.error(error);
        }
      };
      

    const validateEmail = () => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError(t("O_EMAIL_REQUIRED"));
            return false;
        } else if (!re.test(email)) {
            setEmailError(t("O_EMAIL_INVALID"));
            return false;
        } else {
            setEmailError('');
            return true;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateEmail()) {
            // console.log('Email is valid:', email);
            forgetPassword()
        } else {
            console.log('Form has errors');
        }
    };

    return (
        <div className="contanier-forgot bg-gradient-to-r from-gradientFrom to-gradientTo h-full flex">
            <Loader />
            
                <div className="login-form-forgot bg-white max-w-lg m-auto mt-10 sm:mt-16 md:mt-28 rounded-[20px] overflow-hidden">
                
                    <form
                        className="sm:py-12 sm:px-11 py-8 px-7 dark:bg-slate-900"
                        onSubmit={handleSubmit}
                    >
                        <h1 className="text-center text-[40px] font-bold mb-6 dark:text-white">
                            {t("FORGOT_PASSWORD")}
                        </h1>
                        <div className="relative z-0 mb-6 w-full group">
                            <input
                                type="text"
                                name="email"
                                id="email"
                                className={`dark:text-white block py-3 px-3 w-full text-sm text-gray-900 bg-transparent border-2 rounded-lg border-[#DFDFDF] appearance-none dark:text-black dark:border-[#DFDFDF] focus:outline-none focus:ring-0 peer ${emailError && 'border-red-500'}`}
                                placeholder=" "
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label
                                htmlFor="email"
                                className={`dark:bg-slate-900 dark:text-white peer-focus:font-normal absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-3 bg-white p-2 z-10 origin-[2] peer-focus:left-0 peer-focus:text-[#A5A5A5] peer-focus:text-lg peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 ${email && 'text-[#A5A5A5] -translate-y-8 scale-75'}`}
                            >
                                {t("O_EMAIL_ID")}
                                <span className="text-red-500">*</span>
                            </label>
                            {emailError && <p className="errorrr text-red-500 text-sm mt-1">{emailError}</p>}
                        </div>

                        <div className="text-center mt-8">
                            <OButton
                            //  onClick={forgetPassword}
                                label={<>{t("O_SUBMIT")}</>}
                                type="submit"
                            />
                        </div>
                        <div className="text-center mt-4">
                             <Link
                to="/"
                className="ml-auto hover:underline text-sm font-medium dark:text-white"
              >
                {" "}
                {t("FORGOT_PASSWORD_BACK_TO")}{" "}
                <span className=" text-[#6236FF] hover:text-[#9D36FF]">
                  {" "}
                  {t("FORGOT_PASSWORD_LOGIN")}{" "}
                </span>{" "}
              </Link>
                        </div>
                    </form>
            </div>
            
        </div>
    );
};

export default ForgotPassword;
