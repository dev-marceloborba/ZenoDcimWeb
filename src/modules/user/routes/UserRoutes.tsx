import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLogin from "modules/user/pages/user-login/UserLogin";
import UserAdmin from "modules/user/pages/user-admin/UserAdmin";

const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLogin />} />
      <Route path="settings" element={<UserAdmin />} />
    </Routes>
  );
};

export default UserRoutes;
