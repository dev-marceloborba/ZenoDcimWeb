import { RouteObject, useRoutes } from "react-router-dom";
import DataCenterSettingsPage from "../pages/datacenter-settings-page/DataCenterSettingsPage";
import RackAdminPage from "../pages/rack-admin-page/RackAdminPage";
import RackDetailsPage from "../pages/rack-details-page/RackDetailsPage";
import RackEquipmentsAdminPage from "../pages/rack-equipments-admin-page/RackEquipmentsAdminPage";
import { datacenterPaths } from "./paths";

export const datacenterRoutes: RouteObject[] = [
  {
    path: datacenterPaths.settings.fullPath,
    element: <DataCenterSettingsPage />,
    title: "Configurações de infraestrutura",
  },
  {
    path: datacenterPaths.racks.fullPath,
    element: <RackAdminPage />,
    title: "Rack",
  },
  {
    path: datacenterPaths.rackDetails.fullPath,
    element: <RackDetailsPage />,
    title: "Detalhes do rack",
  },
  {
    path: datacenterPaths.rackEquipments.fullPath,
    element: <RackEquipmentsAdminPage />,
    title: "Equipamentos do rack",
  },
];

const DatacenterRoutes = () => useRoutes(datacenterRoutes);

export default DatacenterRoutes;
