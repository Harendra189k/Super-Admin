import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { apiGet } from "../../services/httpServices";
import { pathObj } from "../../services/apiPath";

const pickerClasses = [
  "cursor-pointer",
  "bg-calendar dark:bg-calendarDark",
  "bg-[right_10px_top_10px]",
  "bg-[length:18px_18px]",
  "bg-no-repeat",
  "flex",
  "flex-row-reverse",
  "border",
  "outline-none",
  "text-gray-900",
  "text-sm",
  "rounded-lg",
  "block",
  // "w-full",
  "p-2",
  "dark:bg-gray-700",
  "dark:placeholder-gray-400",
  "dark:text-white",
  "dark:focus:ring-blue-500",
  "dark:focus:border-blue-500",
  "w-48",
];

const DatePickerStatic = ({ props, onFilter, privacyPolicyData, setRecords }) => {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reset, setRest] = useState("");
  const [searchText, setSearchText] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchText(value);
    onFilter(value);
  };
  const handleReset = () => {
    setStartDate("");
    setEndDate("");
  };

  const FilterDataByDate = async (data) => {
    try {
      const payload = {
        startDate: startDate,
        endDate: endDate,
      };
      const response = await apiGet(pathObj.FILTER_DATA_BY_DATE_STATIC, payload);
      console.log(response.data);
      setRecords(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // <div className='sm:flex items-center text-center sm:text-left px-3 md:px-4 xl:px-7 lg:px-5  md:py-5 py-4 md:py-8 border'>
    <>
      <div className="datepickerr relative flex items-center mb-3">
        <label className="mx-2 text-[#B8BBBF] text-xs whitespace-nowrap">
          {t("O_FROM")}
        </label>
        <Flatpickr
          className={pickerClasses.join(" ")}
          name="start_date"
          placeholder={t("O_START_DATE")}
          onChange={([date]) => setStartDate(date)}
          value={startDate}
          options={{
            maxDate: endDate,
            dateFormat: "m/d/Y",
          }}
        />

        <div className="dpicker relative flex items-center mb-3">
          <label className="mx-2 text-[#B8BBBF] text-xs whitespace-nowrap">
            {t("O_TO")}
          </label>
          <Flatpickr
            className={pickerClasses.join(" ")}
            name="end_date"
            placeholder={t("O_END_DATE")}
            onChange={([date]) => setEndDate(date)}
            value={endDate}
            options={{
              minDate: startDate,
              dateFormat: "m/d/Y",
            }}
          />
        </div>
        <div>
          <button
            className="date-reset-btn bg-gradientTo text-sm px-8 ml-3 mb-3 py-2 rounded-lg items-center border border-transparent text-white hover:bg-DarkBlue sm:w-auto w-1/2"
            onClick={FilterDataByDate}
          >
            Filter
          </button>
        </div>
        <div>
          <button className="date-reset-btn bg-gradientTo text-sm px-8 ml-3 mb-3 py-2 rounded-lg items-center border border-transparent text-white hover:bg-DarkBlue sm:w-auto w-1/2" onClick={() => {
              privacyPolicyData();
              handleReset();
            }}>
            Reset
          </button>
        </div>

        <input
          type="search"
          id="default-search"
          className="search-field block w-full p-2 outline-none text-sm text-gray-900 2xl:min-w-[250px] xl:min-w-[300px] rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search by Title"
          value={searchText}
          onChange={handleChange}
          title=""
          required
        />

      </div>
    </>
    // </div>
  );
};

export default DatePickerStatic;
