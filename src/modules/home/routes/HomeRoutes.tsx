import React from "react";
import { Routes, Route } from "react-router-dom";
import ZenoHome from "modules/home/pages/zeno-home/ZenoHome";
import DashboardsRoot from "modules/dashboards/DashboardsRoot";
import AlarmsRoot from "modules/alarms/AlarmsRoot";
import AutomationRoot from "modules/automation/AutomationRoot";
import CustomersRoot from "modules/customers/CustomersRoot";
import CamerasRoot from "modules/cameras/CamerasRoot";
import MaintenanceRoot from "modules/maintenance/MaintenanceRoot";
import UserRoot from "modules/user/UserRoot";
import {
  AutomationPath,
  SettingsPath,
  CustomersPath,
  DashboardsPath,
  AlarmsPath,
  CamerasPath,
  MaintenancePath,
} from "./paths";

const HomeRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ZenoHome />}>
        <Route path={`${AutomationPath}/*`} element={<AutomationRoot />} />
        <Route path={`${SettingsPath}/*`} element={<UserRoot />} />
        <Route path={`${CustomersPath}/*`} element={<CustomersRoot />} />
        <Route path={`${DashboardsPath}/*`} element={<DashboardsRoot />} />
        <Route path={`${AlarmsPath}/*`} element={<AlarmsRoot />} />
        <Route path={`${CamerasPath}/*`} element={<CamerasRoot />} />
        <Route path={`${MaintenancePath}/*`} element={<MaintenanceRoot />} />
      </Route>
    </Routes>
  );
};

export default HomeRoutes;
