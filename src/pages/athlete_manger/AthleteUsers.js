import React from 'react'
import { useTranslation } from "react-i18next";

import genderIcon from "../../assets/icons/icon/gender.svg";
import dobIcon from "../../assets/icons/icon/dob.svg";
import upcCodeIcon from "../../assets/icons/icon/upcCode.svg";
import locationIcon from "../../assets/icons/icon/location.svg";
import cityIcon from "../../assets/icons/icon/city.svg";
import buildingIcon from "../../assets/icons/icon/building.svg";

const AthleteUsers = () => {

    const { t } = useTranslation();


  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="border border-1 border-[#E1DEDE] rounded-md p-6 ps-3">
        <ul>
          <div>
            <li className="mb-4">
              <div className="flex items-center">
                <figure className="bg-[#F2F2F2] w-[42px] h-[41px] rounded-full flex items-center justify-center mr-3">
                  <img src={dobIcon} alt="" />
                </figure>
                <figcaption className="w-[calc(100%_-_41px)]">
                  <span className="block text-[#5C5C5C] dark:text-white">{t("USER_DOB")}</span>
                  <strong className="dark:text-slate-400">
                    {/* {helpers.ternaryCondition(item?.dob, dayjs(item?.dob).format("D MMM YYYY"), "N/A")} */}
                    </strong>
                </figcaption>
              </div>
            </li>
          </div>

          <div>
            <li className="mb-4">
              <div className="flex items-center">
                <figure className="bg-[#F2F2F2] w-[42px] h-[41px] rounded-full flex items-center justify-center mr-3">
                  <img src={genderIcon} alt="" />
                </figure>
                <figcaption className="w-[calc(100%_-_41px)]">
                  <span className="block text-[#5C5C5C] dark:text-white">{t("GENDER")}</span>
                  <strong className="dark:text-slate-400">
                    {/* {helpers.ternaryCondition(item?.gender, startCase(item?.gender), "N/A")} */}
                    </strong>
                </figcaption>
              </div>
            </li>
          </div>
          <div>
            <li className="mb-4">
              <div className="flex items-center">
                <figure className="bg-[#F2F2F2] w-[42px] h-[41px] rounded-full flex items-center justify-center mr-3">
                  <img src={upcCodeIcon} alt="" />
                </figure>
                <figcaption className="w-[calc(100%_-_41px)]">
                  <span className="block text-[#5C5C5C] dark:text-white">{t("ACCOUNT_NUMBER")}</span>
                  {/* <strong className="dark:text-slate-400">{helpers.ternaryCondition(item?.accountNumber, item?.accountNumber, "N/A")}</strong> */}
                </figcaption>
              </div>
            </li>
          </div>
          <div>
            <li className="mb-4">
              <div className="flex items-center">
                <figure className="bg-[#F2F2F2] w-[42px] h-[41px] rounded-full flex items-center justify-center mr-3">
                  <img src={upcCodeIcon} alt="" />
                </figure>
                <figcaption className="w-[calc(100%_-_41px)]">
                  <span className="block text-[#5C5C5C] dark:text-white">{t("CARD_NUMBER")}</span>
                  {/* <strong className="dark:text-slate-400">{helpers.ternaryCondition(item?.cardNumber, item?.cardNumber, "N/A")}</strong> */}
                </figcaption>
              </div>
            </li>
          </div>
        </ul>
      </div>
      <div className="border border-1 border-[#E1DEDE] rounded-md p-6 ps-3">
        <ul>
          <div>
            <li className="mb-4">
              <div className="flex items-center">
                <figure className="bg-[#F2F2F2] w-[42px] h-[41px] rounded-full flex items-center justify-center mr-3">
                  <img src={locationIcon} alt="" />
                </figure>
                <figcaption className="w-[calc(100%_-_41px)]">
                  <span className="block text-[#5C5C5C] dark:text-white">{t("WALLET_BALANCE")}</span>
                  {/* <strong className="dark:text-slate-400">{helpers.ternaryCondition(item?.walletAmount, item?.walletAmount, "N/A")}</strong> */}
                </figcaption>
              </div>
            </li>
          </div>
          <div>
            <li className="mb-4">
              <div className="flex items-center">
                <figure className="bg-[#F2F2F2] w-[42px] h-[41px] rounded-full flex items-center justify-center mr-3">
                  <img src={cityIcon} alt="" />
                </figure>
                <figcaption className="w-[calc(100%_-_41px)]">
                  <span className="block text-[#5C5C5C] dark:text-white">{t("JOINED_DATE")}</span>
                  {/* <strong className="dark:text-slate-400">{helpers.getDateAndTime(item?.joinDate, startCase(item?.joinDate), "N/A")}</strong> */}
                </figcaption>
              </div>
            </li>
          </div>
          <div>
            <li className="mb-4">
              <div className="flex items-center">
                <figure className="bg-[#F2F2F2] w-[42px] h-[41px] rounded-full flex items-center justify-center mr-3">
                  <img src={buildingIcon} alt="" />
                </figure>
                <figcaption className="w-[calc(100%_-_41px)]">
                  <span className="block text-[#5C5C5C] dark:text-white">{t("KYC_STATUS")}</span>
                  {/* <strong className="dark:text-slate-400">{helpers.ternaryCondition(item?.kycStatus, startCase(item?.kycStatus), "N/A")}</strong> */}
                </figcaption>
              </div>
            </li>
          </div>
          <div>
            <li className="mb-4">
              <div className="flex items-center">
                <figure className="bg-[#F2F2F2] w-[42px] h-[41px] rounded-full flex items-center justify-center mr-3">
                  <img src={buildingIcon} alt="" />
                </figure>
                <figcaption className="w-[calc(100%_-_41px)]">
                  <span className="block text-[#5C5C5C] dark:text-white">{t("INVESTMENT_QUESTIONS")}</span>
                  <strong className="dark:text-slate-400 text-decoration: underline">
                    {/* <Link to="/users/investmentQuestion" state={{ ...item }}>
                      View
                    </Link> */}
                  </strong>
                </figcaption>
              </div>
            </li>
          </div>
        </ul>
      </div>

    </div>
  )
}

export default AthleteUsers
