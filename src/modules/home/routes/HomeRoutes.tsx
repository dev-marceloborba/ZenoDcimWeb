import React from "react";
import { Routes, Route } from "react-router-dom";
import ZenoHome from "modules/home/pages/zeno-home/ZenoHome";
import AutomationRoot from "modules/automation/AutomationRoot";
import UserRoot from "modules/user/UserRoot";

const HomeRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ZenoHome />}>
        <Route path="automation/*" element={<AutomationRoot />} />
        <Route path="settings/*" element={<UserRoot />} />
      </Route>
    </Routes>
  );
};

export default HomeRoutes;
