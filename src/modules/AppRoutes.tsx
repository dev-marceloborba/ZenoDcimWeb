import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./shared/components/Loading";
import HomeRoot from "./home/HomeRoot";
import { HomePath } from "./paths";
import UserLogin from "./user/pages/user-login/UserLogin";
import { alarmRoutes } from "./alarms/routes/AlarmsRoutes";
import { automationRoutes } from "./automation/routes/AutomationRoutes";
import { datacenterRoutes } from "./datacenter/routes/DatacenterRoutes";
import { maintenanceRoutes } from "./maintenance/routes/MaintenanceRoutes";
import { userRoutes } from "./user/routes/UserRoutes";

export const appRoutes = [
  ...alarmRoutes.map((r) => ({
    ...r,
    path: r.index ? "/zeno/alarms" : "/zeno/alarms/" + r.path,
  })),
  ...automationRoutes.map((r) => ({
    ...r,
    path: r.index ? "/zeno/automation" : "/zeno/automation/" + r.path,
  })),
  ...datacenterRoutes.map((r) => ({
    ...r,
    path: r.index ? "/zeno/datacenter" : "/zeno/datacenter/" + r.path,
  })),
  ...maintenanceRoutes.map((r) => ({
    ...r,
    path: r.index ? "/zeno/maintenance" : "/zeno/maintenance/" + r.path,
  })),
  ...userRoutes.map((r) => ({
    ...r,
    path: r.index ? "/zeno/settings" : "/zeno/settings/" + r.path,
  })),
];

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<Loading open={true} />}>
      <BrowserRouter>
        <Routes>
          {/* <Route path="*" element={<UserRoot />} /> */}
          <Route path="*" element={<UserLogin />} />
          <Route path={`${HomePath}/*`} element={<HomeRoot />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default AppRoutes;
