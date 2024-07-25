import ForgotPassword from "../pages/auth/ForgotPassword";
import Login from "../pages/users/Login";

const MainRoutes = {
  // All common routes
  path: "/",
  children: [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
  ],
};

export default MainRoutes;
