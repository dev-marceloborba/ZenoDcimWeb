import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLogin from "modules/user/pages/user-login/UserLogin";
import UserAdmin from "modules/user/pages/user-admin/UserAdmin";
import {
  CompanyFormPath,
  UserCreatePath,
  UserDetailsPath,
  UserEditPath,
  UserFormPath,
  UserHelpPath,
  UserSettingsPath,
} from "./paths";
import UserDetails from "../pages/user-details/UserDetails";
import UserHelp from "../pages/user-help/UserHelp";
import CreateUser from "../pages/create-user/CreateUser";
import CompanyForm from "../pages/company-form/CompanyForm";

const UserRoutes: React.FC = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<UserLogin />} /> */}
      {/* <Route path={UserSettingsPath} element={<UserAdmin />} /> */}
      <Route index element={<UserAdmin />} />
      <Route path={UserDetailsPath} element={<UserDetails />} />
      <Route path={UserHelpPath} element={<UserHelp />} />
      <Route path={UserCreatePath} element={<CreateUser />} />
      <Route path={UserEditPath} element={<CreateUser />} />
      <Route path={CompanyFormPath} element={<CompanyForm />} />
    </Routes>
  );
};

export default UserRoutes;
