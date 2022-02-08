import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import BuildingDropdown from "../components/BuildingDropdown";
import FloorDropdown from "../components/FloorDropdown";
import PageTitle from "app/components/PageTitle";
import { equipmentConnectivity } from "app/data/equipment-connectivity";
import ConnectivityCard from "../components/ConnectivityCard";
import HeroContainer from "app/components/HeroContainer";
import Row from "app/components/Row";

const EquipmentConectivity: React.FC = () => (
  <HeroContainer>
    <PageTitle>Conectivade de equipamentos</PageTitle>
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
