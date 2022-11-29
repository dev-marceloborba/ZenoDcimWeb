import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import Events from "modules/maintenance/pages/events/Events";
import Register from "modules/maintenance/pages/register/MaintenanceRegisterPage";
import Schedule from "modules/maintenance/pages/schedule/Schedule";
import WorkOrderDetailsPage from "../pages/work-order-details-page/WorkOrderDetailsPage";
import SupplierRegistryPage from "../pages/supplier-registry-page/SupplierRegistryPage";
import { maintenancePaths } from "./paths";

export const maintenanceRoutes: RouteObject[] = [
  {
    path: maintenancePaths.schedule.fullPath,
    element: <Schedule />,
    title: "Agendar manutenção",
  },
  {
    path: maintenancePaths.events.fullPath,
    element: <Events />,
    title: "Eventos de manutenção",
  },
  {
    path: maintenancePaths.register.fullPath,
    element: <Register />,
    title: "Formulário de manutenção",
  },
  {
    path: maintenancePaths.eventDetails.fullPath,
    element: <WorkOrderDetailsPage />,
    title: "Detalhes da ordem",
  },
  {
    path: maintenancePaths.suppliers.fullPath,
    element: <SupplierRegistryPage />,
    title: "Registro de fornecedor",
  },
];

const MaintenanceRoutes: React.FC = () => useRoutes(maintenanceRoutes);

export default MaintenanceRoutes;
