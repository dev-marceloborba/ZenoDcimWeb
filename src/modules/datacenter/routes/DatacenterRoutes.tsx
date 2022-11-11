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
  },
  {
    path: datacenterPaths.racks.fullPath,
    element: <RackAdminPage />,
  },
  {
    path: datacenterPaths.rackDetails.fullPath,
    element: <RackDetailsPage />,
  },
  {
    path: datacenterPaths.rackEquipments.fullPath,
    element: <RackEquipmentsAdminPage />,
  },
];

const DatacenterRoutes = () => useRoutes(datacenterRoutes);

export default DatacenterRoutes;
