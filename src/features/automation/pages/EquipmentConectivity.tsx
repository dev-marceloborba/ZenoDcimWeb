import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import BuildingDropdown from "../components/BuildingDropdown";
import FloorDropdown from "../components/FloorDropdown";
import PageTitle from "app/components/PageTitle";
import { equipmentConnectivity } from "app/data/equipment-connectivity";
import ConnectivityCard from "../components/ConnectivityCard";
import HeroContainer from "app/components/HeroContainer";

const EquipmentConectivity: React.FC = () => {
  return (
    <HeroContainer>
      <PageTitle>Conectivade de equipamentos</PageTitle>
      <Box sx={{ display: "flex", maxWidth: "480px", mt: 2 }}>
        <BuildingDropdown />
        <FloorDropdown sx={{ ml: 2 }} />
      </Box>

      <Grid sx={{ mt: 2 }} container spacing={2}>
        {equipmentConnectivity.map((area, index) => (
          <Grid key={index} item md={6}>
            <ConnectivityCard {...area} />
          </Grid>
        ))}
      </Grid>
    </HeroContainer>
  );
};

export default EquipmentConectivity;
