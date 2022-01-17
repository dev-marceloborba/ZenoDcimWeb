import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import BuildingDropdown from "../components/BuildingDropdown";
import FloorDropdown from "../components/FloorDropdown";
import PageTitle from "app/components/PageTitle";

const EquipmentConectivity: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <PageTitle>Conectivade de equipamento</PageTitle>
      <Box sx={{ display: "flex", maxWidth: '480px', mt: 2 }}>
        <BuildingDropdown  />
        <FloorDropdown sx={{ml: 2}} />
      </Box>
    </Container>
  );
};

export default EquipmentConectivity;
