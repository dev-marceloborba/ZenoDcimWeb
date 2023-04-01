import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import Register from "modules/maintenance/pages/register/MaintenanceRegisterPage";
import Schedule from "modules/maintenance/pages/schedule/Schedule";
import WorkOrderDetailsPage from "../pages/work-order-details-page/WorkOrderDetailsPage";
import SupplierRegistryPage from "../pages/supplier-registry-page/SupplierRegistryPage";
import { maintenancePaths } from "./paths";
import WorkOrderMenuPage from "../pages/work-order-menu-page/WorkOrderMenuPage";
import WorkOrderHistoryPage from "../pages/work-order-history-page/WorkOrderHistoryPage";
import WorkOrderTimelinePage from "../pages/work-order-timeline-page/WorkOrderTimelinePage";
import WorkOrderPlansPage from "../pages/work-order-plans-page/WorkOrderPlansPage";
import NewWorkOrderPage from "../pages/new-work-order-page/NewWorkOrderPage";

export const maintenanceRoutes: RouteObject[] = [
  {
    path: maintenancePaths.schedule.fullPath,
    element: <Schedule />,
    title: "Agendar manutenção",
  },
  {
    path: maintenancePaths.queryWorkOrders.fullPath,
    element: <WorkOrderHistoryPage />,
    title: "Ordens de serviço",
  },
  {
    path: maintenancePaths.register.fullPath,
    element: <Register />,
    title: "Formulário de manutenção",
  },
  {
    path: maintenancePaths.workOrderDetails.fullPath,
    element: <WorkOrderDetailsPage />,
    title: "Detalhes da ordem",
  },
  {
    path: maintenancePaths.suppliers.fullPath,
    element: <SupplierRegistryPage />,
    title: "Registro de fornecedor",
  },
  {
    path: maintenancePaths.menu.fullPath,
    element: <WorkOrderMenuPage />,
    title: "Manutenção",
  },
  {
    path: maintenancePaths.maintenancePlans.fullPath,
    element: <WorkOrderPlansPage />,
    title: "Planos de manutenção",
  },
  {
    path: maintenancePaths.workOrderTimeline.fullPath,
    element: <WorkOrderTimelinePage />,
    title: "Linha do tempo",
  },
  {
    path: maintenancePaths.initWorkOrder.fullPath,
    element: <NewWorkOrderPage />,
    title: "Nova ordem de serviço",
  },
];

const MaintenanceRoutes: React.FC = () => useRoutes(maintenanceRoutes);

export default MaintenanceRoutes;
