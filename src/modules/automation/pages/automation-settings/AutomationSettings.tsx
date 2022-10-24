import React from "react";
import Grid from "@mui/material/Grid";

import HeroContainer from "modules/shared/components/HeroContainer";
import compositePathRoute from "modules/utils/compositePathRoute";
import { HomePath } from "modules/paths";
import { AutomationPath } from "modules/home/routes/paths";
import {
  BuildingManagementPath,
  EquipmentManagementPath,
  FloorManagementPath,
  ParameterManagementPath,
  RoomManagementPath,
  SiteManagementPath,
} from "modules/automation/routes/paths";
import CardSection from "modules/shared/components/card-section/CardSection";

const AutomationSettings: React.FC = () => {
  return (
    <HeroContainer title="Configurações de automação">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {gridItems.map((item) => (
          <Grid key={item.description} item md={6} xs={12}>
            <CardSection {...item} />
          </Grid>
        ))}
      </Grid>
    </HeroContainer>
  );
};

export default AutomationSettings;

const gridItems = [
  {
    title: "Equipamentos",
    description: "Configure e gerencie os equipamentos do DCIM",
    path: compositePathRoute([
      HomePath,
      AutomationPath,
      EquipmentManagementPath,
    ]),
  },
  {
    title: "Parâmetros",
    description: "Configure e gerencie os parâmetros físicos do DCIM",
    path: compositePathRoute([
      HomePath,
      AutomationPath,
      ParameterManagementPath,
    ]),
  },
  {
    title: "Salas",
    description: "Configure e gerencie as salas do DCIM",
    path: compositePathRoute([HomePath, AutomationPath, RoomManagementPath]),
  },
  {
    title: "Andares",
    description: "Configure e gerencie os andares do DCIM",
    path: compositePathRoute([HomePath, AutomationPath, FloorManagementPath]),
  },
  {
    title: "Prédios",
    description: "Configure e gerencie os prédios do DCIM",
    path: compositePathRoute([
      HomePath,
      AutomationPath,
      BuildingManagementPath,
    ]),
  },
  {
    title: "Sites",
    description: "Configure e gerencie os sites(locais) do DCIM",
    path: compositePathRoute([HomePath, AutomationPath, SiteManagementPath]),
  },
];
