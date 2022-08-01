import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLogin from "modules/user/pages/user-login/UserLogin";
import UserAdmin from "modules/user/pages/user-admin/UserAdmin";
import { UserDetailsPath, UserHelpPath, UserSettingsPath } from "./paths";
import UserDetails from "../pages/user-details/UserDetails";
import UserHelp from "../pages/user-help/UserHelp";

const UserRoutes: React.FC = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<UserLogin />} /> */}
      {/* <Route path={UserSettingsPath} element={<UserAdmin />} /> */}
      <Route index element={<UserAdmin />} />
      <Route path={UserDetailsPath} element={<UserDetails />} />
      <Route path={UserHelpPath} element={<UserHelp />} />
    </Routes>
  );
};

export default UserRoutes;
