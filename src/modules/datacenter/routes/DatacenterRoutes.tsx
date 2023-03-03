import { RouteObject, useRoutes } from "react-router-dom";
import DataCenterSettingsPage from "../pages/datacenter-settings-page/DataCenterSettingsPage";
import InfrastructurePage from "../pages/infrastructure-page/InfrastructurePage";
import OcupationPage from "../pages/ocupation-page/OcupationPage";
import RackDetailsPage from "../pages/rack-occupation-page/rack-details-page/RackDetailsPage";
import RackOccupationPage from "../pages/rack-occupation-page/RackOccupationPage";
import { datacenterPaths } from "./paths";

export const datacenterRoutes: RouteObject[] = [
  {
    path: datacenterPaths.settings.fullPath,
    element: <DataCenterSettingsPage />,
    title: "Configurações de infraestrutura",
  },
  {
    path: datacenterPaths.infraSettings.fullPath,
    element: <InfrastructurePage />,
    title: "Configurações de infraestrutura",
  },
  {
    path: datacenterPaths.racks.fullPath,
    element: <RackOccupationPage />,
    title: "Rack",
  },
  {
    path: datacenterPaths.rackDetails.fullPath,
    element: <RackDetailsPage />,
    title: "Detalhes do rack",
  },
  {
    path: datacenterPaths.ocupation,
    element: <OcupationPage />,
    title: "Ocupação do Datacenter",
  },
];

const DatacenterRoutes = () => useRoutes(datacenterRoutes);

export default DatacenterRoutes;
