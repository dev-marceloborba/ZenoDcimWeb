import React from "react";
import { Routes, Route } from "react-router-dom";
import ZenoHome from "modules/home/pages/zeno-home/ZenoHome";
import AutomationRoot from "modules/automation/AutomationRoot";
import UserRoot from "modules/user/UserRoot";
import { AutomationPath, SettingsPath } from "./paths";

const HomeRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ZenoHome />}>
        <Route path={`${AutomationPath}/*`} element={<AutomationRoot />} />
        <Route path={`${SettingsPath}/*`} element={<UserRoot />} />
      </Route>
    </Routes>
  );
};

export default HomeRoutes;
