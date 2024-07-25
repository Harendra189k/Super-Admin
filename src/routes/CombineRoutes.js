import { useRoutes } from "react-router-dom";
import { useContext } from "react";
// routes
import MainRoutes from "./MainRoutes";
import AdminRoutes from "./AdminRoutes";

export default function CombineRoutes() {
console.log(AdminRoutes,"AdminRoutes")
  const checkRoles = {
    admin: AdminRoutes,
    // "company": CompanyRoutes
  };
  console.log(useRoutes([AdminRoutes],"/"),"gdasjfgjkh")
  return useRoutes([AdminRoutes],"/");
}