import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";

import HeroContainer from "modules/shared/components/HeroContainer";
import useRouter from "modules/core/hooks/useRouter";
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

type CardSectionProps = {
  title: string;
  description: string;
  path?: string;
};

const CardSection: React.FC<CardSectionProps> = ({
  title,
  description,
  path,
}) => {
  const { navigate } = useRouter();

  const handleCardDetails = () => {
    navigate(path ?? "", { state: null });
  };

  return (
    <Card sx={{ cursor: "pointer" }} onClick={handleCardDetails}>
      <CardHeader title={title} subheader={description} />
      <CardContent></CardContent>
    </Card>
  );
};
