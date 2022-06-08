import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import BuildingDropdown from "modules/automation/components/BuildingDropdown";
import FloorDropdown from "modules/automation/components/FloorDropdown";
import PageTitle from "modules/shared/components/PageTitle";
import { equipmentConnectivity } from "app/data/equipment-connectivity";
import ConnectivityCard from "modules/automation/components/ConnectivityCard";
import HeroContainer from "modules/shared/components/HeroContainer";
import Row from "modules/shared/components/Row";

const EquipmentConectivity: React.FC = () => (
  <HeroContainer>
    <PageTitle>Conectividade de equipamentos</PageTitle>
    <Row sx={{ maxWidth: "480px", mt: 2 }}>
      <BuildingDropdown />
      <FloorDropdown sx={{ ml: 2 }} />
    </Row>

    <Grid sx={{ mt: 2 }} container spacing={2}>
      {equipmentConnectivity.map((area, index) => (
        <Grid key={index} item md={6}>
          <ConnectivityCard {...area} />
        </Grid>
      ))}
    </Grid>
  </HeroContainer>
);

export default EquipmentConectivity;
