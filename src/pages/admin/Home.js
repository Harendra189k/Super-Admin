import React, { useEffect, useState } from 'react'
// import OCountUp from "../../components/OCountUp";
import earning from "../../assets/images/earning.jpg";
import { useTranslation } from "react-i18next";
import Sidebar from '../../components/sidebar/Sidebar';
import { FaUserTie } from "react-icons/fa";
import TopNavBar from '../../components/TopNavBar';
import OCountUp from '../../components/OCountUp';
import { MdOutlineSportsSoccer } from "react-icons/md";
import { FaRunning } from "react-icons/fa";
import { GiBabyfootPlayers, GiTrumpetFlag } from "react-icons/gi";
import { RiTeamFill } from "react-icons/ri";
import { apiGet } from '../../services/httpServices';
import { pathObj } from '../../services/apiPath';
import { LuLoader2 } from 'react-icons/lu';


const Home = () => {

    const { t } = useTranslation();
    const [ dashboardDetails, setDashboardDetails] = useState({})
    const [loader,setLoader]=useState(false)

    const countData = async (data) => {
      setLoader(GiTrumpetFlag)
      try {
        const response = await apiGet(pathObj.GET_COUNT);
    
        if (response.status === 200) {
          setDashboardDetails(response.data);
          setLoader(false)
        } else {
          console.log('Something went wrong');
          setLoader(false)
        }
    
      } catch (error) {
        console.error(error);
        setLoader(false)
      }
    };
    useEffect(() => {
      countData();
    }, []);

  return (
    <>
    <Sidebar />
    <TopNavBar />
    <div className="py-4 px-4 md:px-8 dark:bg-slate-900 home-adj">
      <div className="sale_report grid pt-10 3xl:grid-cols-4 gap-y-10 gap-4 gap-x-10 2xl:grid-cols-4 sm:grid-cols-2 mb-7 ">
        <div className="text-center relative  sm:text-left px-3 md:px-4 xl:px-6 lg:px-5 rounded-lg py-4 md:py-8 border">
          <h3 className="text-center mb-0 text-slate-900 font-bold md:text-3xl sm:text-lg dark:text-white">
            <OCountUp value={dashboardDetails?.coach} />
            <span className="text-base text-neutral-400 font-normal block pt-3 ">{t("VIEW_NO_OF_COACHES")}</span>
          </h3>
          <span className="text-4xl ml-auto sm:mr-0  mt-2 sm:mt-0 absolute right-[-10px] top-[-30px] p-3 border z-10 bg-white">
            <FaUserTie /> 
          </span>
        </div>

        <div className="text-center relative  sm:text-left px-3 md:px-4 xl:px-6 lg:px-5 rounded-lg py-4 md:py-8 border">
          <h3 className="text-center mb-0 text-slate-900 font-bold md:text-3xl sm:text-lg dark:text-white">
            <OCountUp value={dashboardDetails?.athlete} />

            <span className="text-base text-neutral-400 font-normal block pt-3 ">{t("VIEW_NO_OF_ATHLETES")}</span>
          </h3>
          <span className="text-4xl ml-auto sm:mr-0  mt-2 sm:mt-0 absolute right-[-10px] top-[-30px] p-3 border z-10 bg-white">
          <FaRunning />

          </span>
        </div>
        <div className="text-center relative  sm:text-left px-3 md:px-4 xl:px-6 lg:px-5 rounded-lg py-4 md:py-8 border">
          <h3 className="text-center mb-0 text-slate-900 font-bold md:text-3xl sm:text-lg dark:text-white">
          <OCountUp value={dashboardDetails?.totalSports} />
            <span className="text-base text-neutral-400 font-normal block pt-3 ">{t("TOTAL_NUMBER_OF_SPORTS")}</span>
          </h3>
          <span className="text-4xl ml-auto sm:mr-0  mt-2 sm:mt-0 absolute right-[-10px] top-[-30px] p-3 border z-10 bg-white">
            <MdOutlineSportsSoccer />

          </span>
        </div>
        <div className="text-center relative  sm:text-left px-3 md:px-4 xl:px-6 lg:px-5 rounded-lg py-4 md:py-8 border">
          <h3 className="text-center mb-0 text-slate-900 font-bold md:text-3xl sm:text-lg dark:text-white">
          <OCountUp value={dashboardDetails?.addTeam} />
            <span className="text-base text-neutral-400 font-normal block pt-3 ">{t("TOTAL_NUMBER_OF_TEAMS")}</span>
          </h3>
          <span className="text-4xl ml-auto sm:mr-0  mt-2 sm:mt-0 absolute right-[-10px] top-[-30px] p-3 border z-10 bg-white">
            <RiTeamFill />

          </span>
        </div>

        <div className="text-center relative  sm:text-left px-3 md:px-4 xl:px-6 lg:px-5 rounded-lg py-4 md:py-8 border">
          <h3 className="text-center mb-0 text-slate-900 font-bold md:text-3xl sm:text-lg dark:text-white">
          <OCountUp value={dashboardDetails?.addPlayer} />
            <span className="text-base text-neutral-400 font-normal block pt-3 ">{t("TOTAL_NUMBER_OF_PLAYERS")}</span>
          </h3>
          <span className="text-4xl ml-auto sm:mr-0  mt-2 sm:mt-0 absolute right-[-10px] top-[-30px] p-3 border z-10 bg-white">
            <GiBabyfootPlayers />

          </span>
        </div>
    
      {loader && <LuLoader2 className="loader-home " />}
      </div>
    </div>
    <div className="dark:bg-gray-800 py-7 px-4 md:px-8 bg-[#F9F9F9] border-solid border-2 border-gray m-10 rounded-md">       
    </div>
  </>
  )
}

export default Home
