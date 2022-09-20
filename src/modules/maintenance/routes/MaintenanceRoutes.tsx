import React from "react";
import { Route, Routes } from "react-router-dom";
import Events from "modules/maintenance/pages/events/Events";
import Register from "modules/maintenance/pages/register/MaintenanceRegisterPage";
import Schedule from "modules/maintenance/pages/schedule/Schedule";
import WorkOrderDetailsPage from "../pages/work-order-details-page/WorkOrderDetailsPage";
import SupplierRegistryPage from "../pages/supplier-registry-page/SupplierRegistryPage";

const MaintenanceRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="schedule" element={<Schedule />} />
      <Route path="events" element={<Events />} />
      <Route path="register" element={<Register />} />
      <Route path="events/details" element={<WorkOrderDetailsPage />} />
      <Route path="suppliers" element={<SupplierRegistryPage />} />
    </Routes>
  );
};

export default MaintenanceRoutes;
