import BuildingResolver from "modules/automation/routes/resolvers/BuildingResolver";
import RoomResolver from "modules/automation/routes/resolvers/RoomResolver";
import SiteResolver from "modules/automation/routes/resolvers/SiteResolver";
import { RouteObject, useRoutes } from "react-router-dom";
import DataCenterSettingsPage from "../pages/datacenter-settings-page/DataCenterSettingsPage";
import InfrastructurePage from "../pages/infrastructure-page/InfrastructurePage";
import OccupationBuildingLevelPage from "../pages/ocupation-page/OccupationBuildingLevelPage";
import OccupationRackLevelPage from "../pages/ocupation-page/OccupationRackLevelPage";
import OccupationRoomLevelPage from "../pages/ocupation-page/OccupationRoomLevelPage";
import OccupationSiteLevelPage from "../pages/ocupation-page/OccupationSiteLevelPage";
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
    element: <OccupationSiteLevelPage />,
    title: "Ocupação do Datacenter",
  },
  {
    path: datacenterPaths.buildingOccupation,
    element: <OccupationBuildingLevelPage />,
    resolver: SiteResolver
  },
  {
    path: datacenterPaths.roomOccupation,
    element: <OccupationRoomLevelPage />,
    resolver: BuildingResolver
  },
  {
    path: datacenterPaths.rackOccupation,
    element: <OccupationRackLevelPage />,
    resolver: RoomResolver
  },
];

const DatacenterRoutes = () => useRoutes(datacenterRoutes);

export default DatacenterRoutes;
