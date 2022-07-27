import React from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";

import { useLayout } from "app/hooks/useLayout";
import ListItemLink, {
  ListItemLinkProps,
} from "modules/shared/components/ListItemLink";

// icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PeopleIcon from "@mui/icons-material/People";
import VideocamIcon from "@mui/icons-material/Videocam";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import EngineeringIcon from "@mui/icons-material/Engineering";
import SettingsIcon from "@mui/icons-material/Settings";
import { HomePath } from "modules/paths";
import { AutomationPath } from "modules/home/routes/paths";
import {
  AccessControlPath,
  AutomationSettingsPath,
  EnergyClimTelecomPath,
  EquipmentConnectivityPath,
  FireSystemPath,
} from "modules/automation/routes/paths";

const Sidenav: React.FC = () => {
  const { drawerOpened } = useLayout();

  if (drawerOpened) {
    return (
      <Box
        sx={{
          position: "absolute",
          left: 0,
          top: 0,
        }}
      >
        <Drawer
          anchor="left"
          variant="permanent"
          open={false}
          sx={{
            ".MuiPaper-root": {
              mt: "4rem",
              width: "230px",
            },
          }}
        >
          <List sx={{ height: "100%" }}>
            {menuItems.map((props, index) => (
              <ListItemLink key={index} {...props} />
            ))}
          </List>
        </Drawer>
      </Box>
    );
  } else {
    return <></>;
  }
};

const menuItems: ListItemLinkProps[] = [
  {
    primary: "Dashboard",
    icon: <DashboardIcon />,
    items: [
      { primary: "Energia", to: "/zeno/dashboard/energy" },
      { primary: "Incêndio", to: "/zeno/dashboard/fire-system" },
      { primary: "Climatização", to: "/zeno/dashboard/climate" },
      { primary: "Controle de acesso", to: "/zeno/dashboard/access-control" },
    ],
  },
  {
    to: "/zeno/alarms",
    primary: "Alarmes",
    icon: <EventNoteIcon />,
  },
  {
    primary: "Clientes",
    icon: <PeopleIcon />,
    items: [
      { primary: "Contratos", to: "/zeno/clients/contracts" },
      { primary: "Agenda", to: "/zeno/clients/schedule" },
      { primary: "Ordem de serviço", to: "/zeno/clients/service-order" },
      { primary: "Eventos e multas", to: "/zeno/clients/events-and-injuries" },
      { primary: "Capacidade", to: "/zeno/clients/capacity" },
      { primary: "Entrada de equipamento", to: "/zeno/clients/new-equipment" },
    ],
  },
  {
    to: "/zeno/cameras",
    primary: "Câmeras",
    icon: <VideocamIcon />,
  },
  {
    primary: "Automação",
    icon: <LineStyleIcon />,
    items: [
      {
        primary: "Energia, Clima e Telecom",
        to: `/${HomePath}/${AutomationPath}/${EnergyClimTelecomPath}`,
      },
      // {
      //   primary: "Incêndio",
      //   to: `/${HomePath}/${AutomationPath}/${FireSystemPath}`,
      // },
      // {
      //   primary: "Controle de acesso",
      //   to: `/${HomePath}/${AutomationPath}/${AccessControlPath}`,
      // },
      {
        primary: "Conectividade de equipamentos",
        to: `/${HomePath}/${AutomationPath}/${EquipmentConnectivityPath}`,
      },
      {
        primary: "Configurações de automação",
        to: `/${HomePath}/${AutomationPath}/${AutomationSettingsPath}`,
      },
    ],
  },
  {
    primary: "Manutenção",
    icon: <EngineeringIcon />,
    items: [
      { primary: "Agendamento", to: "/zeno/maintenance/schedule" },
      { primary: "Eventos de manutenção", to: "/zeno/maintenance/events" },
      { primary: "Registrar manutenção", to: "/zeno/maintenance/register" },
    ],
  },
  {
    to: "/zeno/settings",
    primary: "Configurações",
    icon: <SettingsIcon />,
  },
];

export default Sidenav;
