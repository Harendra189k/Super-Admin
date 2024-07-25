import React from 'react'
import Login from '../pages/users/Login';
import ForgotPassword from '../pages/auth/ForgotPassword';
import Sidebar from '../components/sidebar/Sidebar';
import Home from '../pages/admin/Home';
import { useTranslation } from 'react-i18next';
const UseChange = ({ data }) => {
  const { t } = useTranslation();
  return t(data);
};
const AdminRoutes = {
  // All common routes
  path: "/",
  element: <Sidebar />,
  children: [
    {
      path: "/dashboard",
      element: <Home />,
      name: (
        <>
          <UseChange data="NAV_DASHBOARD" />
        </>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
   
    {
      path: "/",
      element: <Home />,
      name: (
        <>
          <UseChange data="NAV_DASHBOARD" />
        </>
      ),
    },

  ],
};
export default AdminRoutes
