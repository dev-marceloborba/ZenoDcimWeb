import BuildingAdmin from "modules/automation/pages/building-admin/BuildingAdmin";
import FloorForm from "modules/automation/pages/floor-admin/components/floor-form/FloorForm";
import FloorAdmin from "modules/automation/pages/floor-admin/FloorAdmin";
import RoomForm from "modules/automation/pages/room-admin/components/room-form/RoomForm";
import RoomAdmin from "modules/automation/pages/room-admin/RoomAdmin";
import SiteForm from "modules/automation/pages/site-admin/components/site-form/SiteForm";
import SiteAdmin from "modules/automation/pages/site-admin/SiteAdmin";
import { RouteObject, useRoutes } from "react-router-dom";
import BuildingForm from "../pages/building-form/BuildingForm";
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
  {
    path: datacenterPaths.siteManagement.fullPath,
    element: <SiteAdmin />,
    title: "Site",
  },
  {
    path: datacenterPaths.siteForm.fullPath,
    element: <SiteForm />,
    title: "Formulário de site",
  },
  {
    path: datacenterPaths.buildingManagement.fullPath,
    element: <BuildingAdmin />,
    title: "Prédios",
  },
  {
    path: datacenterPaths.buildingForm.fullPath,
    element: <BuildingForm />,
    title: "Formulário de prédio",
  },
  {
    path: datacenterPaths.floorManagement.fullPath,
    element: <FloorAdmin />,
    title: "Andares",
  },
  {
    path: datacenterPaths.floorForm.fullPath,
    element: <FloorForm />,
    title: "Formulário de andar",
  },
  {
    path: datacenterPaths.roomManagement.fullPath,
    element: <RoomAdmin />,
    title: "Salas",
  },
  {
    path: datacenterPaths.roomForm.fullPath,
    element: <RoomForm />,
    title: "Formulário de sala",
  },
];

const DatacenterRoutes = () => useRoutes(datacenterRoutes);

export default DatacenterRoutes;
