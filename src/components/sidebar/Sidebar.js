import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import Dashboard from "../../assets/images/sidebar_icon1.svg";
import Home from '../../pages/admin/Home';
import Logout from "../../assets/images/logout.svg";
import { RiTeamFill } from 'react-icons/ri';
import { FaRunning, FaUserTie } from 'react-icons/fa';
import { GiBabyfootPlayers } from 'react-icons/gi';
import { FaFileCircleXmark } from "react-icons/fa6";
import logo from '../../assets/images/logo.png'

const classNames = require("classnames");

const Sidebar = () => {

    const { t } = useTranslation();
    const navigate = useNavigate()

    const generateNavLink = (to, label, icon) => (
            <NavLink
            to={to}

            className={({ isActive }) =>
                classNames("flex items-center px-4 lg:px-7 py-4 hover:bg-sideBarNavActiveColor hover:text-gradientTo", {
                "bg-white": isActive,
                "text-black": isActive,
                active: isActive,
                })
            }
            //   onClick={() => updatePageName(t(label))}
            >
            {icon && <span className="mr-2">{icon}</span>}
            {t(label)}
            
            </NavLink>
      );

      const andOperator = (condition, text) => {
        return condition && text;
      };

      const checkSidebarPermission = (arg) => {
        // if (!user) {
        //   return false;
        // }
        // const localPermissions = [...user?.permission];
    
        // if (user?.permission?.length === 0) {
        //   return true;
        // }
        // const perIndex = localPermissions?.findIndex((item) => item?.manager === arg);
        // if (perIndex < 0) {
        //   return false;
        // }
        // if (localPermissions?.[perIndex]?.view) {
        //   return true;
        // }
    
        // return false;
      };

      const logoutUser = () => {
        navigate("/");
        localStorage.removeItem("token");
  // setUser(null);
  window.location.reload(true)
      };

      const handleLogout = () => {
        if (window.confirm("Are you sure to logout?")) {
          logoutUser();
        }
      };


  return (
    <>
    <div
    className={`sidebar lg:block z-10  bg-gradient-to-t from-gradpurple to-gradientFrom w-[220px] xl:w-[280px] fixed h-full overflow-y-auto`}
    // onClick={handleSidebar}
  >
    <div className="text-sideBarNavColor">
      
      {/* <Link to="/dashboard">  */}
      <a className={`px-2 py-6 w-full text-center flex justify-center `}>
        {/* <img src={logoImage} className="inline max-w-[187px]" alt="" style={{ filter: "brightness(0) invert(1)" }} /> */}
        <img className='sidebar-img' src={logo}></img>
        <h6 className="text-center font-bold text-2xl">Super Coach</h6>
        </a>
      {/* </Link> */}
      <div className="profile text-center">
        <small className="block text-sm">Welcome</small>
        <strong className="block text-lg overflow-hidden text-ellipsis px-2 whitespace-nowrap "></strong>
      </div>

      <nav className="pt-4 pb-5 flex flex-col justify-center font-normal text-xs overflow-y-auto">
        {/* {checkSidebarPermission("dashboard") && ( */}
         {generateNavLink("/dashboard", "NAV_DASHBOARD", <img src={Dashboard} title={t("NAV_DASHBOARD")} className="team-manager-icon" alt=""  />)}
         {generateNavLink("/coach-manager", "NAV_COACH_MANAGER", <FaUserTie className='team-manager-icon' />)}
         {generateNavLink("/athlete-manager", "NAV_ATHLETE_MANAGER", <FaRunning className='team-manager-icon'/>)}

         
         {generateNavLink("/team-manager", "NAV_TEAM_MANAGER", <RiTeamFill className='team-manager-icon' />

//  <img src={Dashboard} title={t("NAV_TEAM_MANAGER")} className="max-w-[18px]" alt="" />
)}
         {generateNavLink("/player-manager", "NAV_PLAYER_MANAGER", <GiBabyfootPlayers className='team-manager-icon'/>)}
{generateNavLink("/static-content", "NAV_STATIC_CONTENT", <FaFileCircleXmark  className='team-manager-icon'/>)}
        
         <a onClick={handleLogout} className="flex items-center px-4 lg:px-7 py-4 hover:bg-sideBarNavActiveColor hover:text-gradientTo">
            <span className="mr-2">
              <img src={Logout} className="team-manager-icon" title={t("NAV_LOGOUT")} alt="logout" />
            </span>
            {t("NAV_LOGOUT")}
          </a>
      </nav>
    </div>
  </div>

  </>
  )
}

export default Sidebar
