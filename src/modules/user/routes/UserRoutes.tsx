import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLogin from "modules/user/pages/user-login/UserLogin";
import UserAdmin from "modules/user/pages/user-admin/UserAdmin";
import { UserDetailsPath, UserSettingsPath } from "./paths";
import UserDetails from "../pages/user-details/UserDetails";

const UserRoutes: React.FC = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<UserLogin />} /> */}
      {/* <Route path={UserSettingsPath} element={<UserAdmin />} /> */}
      <Route index element={<UserAdmin />} />
      <Route path={UserDetailsPath} element={<UserDetails />} />
    </Routes>
  );
};

export default UserRoutes;
