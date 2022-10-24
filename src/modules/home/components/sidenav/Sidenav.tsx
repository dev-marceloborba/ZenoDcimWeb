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
import StorageIcon from "@mui/icons-material/Storage";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PeopleIcon from "@mui/icons-material/People";
import VideocamIcon from "@mui/icons-material/Videocam";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import EngineeringIcon from "@mui/icons-material/Engineering";
import SettingsIcon from "@mui/icons-material/Settings";

import { HomePath } from "modules/paths";
import { AutomationPath, AlarmsPath } from "modules/home/routes/paths";
import {
  AccessControlPath,
  AutomationSettingsPath,
  EnergyClimTelecomPath,
  EquipmentConnectivityPath,
  FireSystemPath,
  MeasureHistoryPath,
} from "modules/automation/routes/paths";
import {
  AlarmHistoryPath,
  AlarmRealtimePath,
  AlarmStatisticsPath,
} from "modules/alarms/routes/paths";
import { datacenterPaths } from "modules/datacenter/routes/paths";

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
    primary: "Datacenter",
    icon: <StorageIcon />,
    items: [
      {
        primary: "Configuração de infraestrutura",
        to: `/zeno/datacenter/${datacenterPaths.settings.fullPath}`,
      },
      // {
      //   primary: "Sites",
      //   to: "/zeno/datacenter/sites",
      // },
      // {
      //   primary: "Prédios",
      //   to: "/zeno/datacenter/buildings",
      // },
      // {
      //   primary: "Salas",
      //   to: "/zeno/datacenter/rooms",
      // },
    ],
  },
  {
    to: "/zeno/alarms",
    primary: "Alarmes",
    icon: <EventNoteIcon />,
    items: [
      {
        primary: "Histórico",
        to: `/${HomePath}/${AlarmsPath}/${AlarmHistoryPath}`,
      },
      {
        primary: "Tempo real",
        to: `/${HomePath}/${AlarmsPath}/${AlarmRealtimePath}`,
      },
      {
        primary: "Estatísticas",
        to: `/${HomePath}/${AlarmsPath}/${AlarmStatisticsPath}`,
      },
    ],
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
        primary: "Histórico de medições",
        to: `/${HomePath}/${AutomationPath}/${MeasureHistoryPath}`,
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
      {
        primary: "Histórico de ordem de serviço",
        to: "/zeno/maintenance/events",
      },
      { primary: "Abrir ordem de serviço", to: "/zeno/maintenance/register" },
    ],
  },
  {
    to: "/zeno/settings",
    primary: "Configurações",
    icon: <SettingsIcon />,
  },
];

export default Sidenav;
