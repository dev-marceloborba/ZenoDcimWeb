import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLogin from "modules/user/pages/user-login/UserLogin";

const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLogin />} />
    </Routes>
  );
};

export default UserRoutes;
