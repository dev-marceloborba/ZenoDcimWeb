import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PageTitle from "app/components/PageTitle";
import BuildingDropdown from "../components/BuildingDropdown";
import FloorDropdown from "../components/FloorDropdown";
import ConnectivityFlowDiagram from "../components/ConnectivityFlowDiagram";
import HeroContainer from "app/components/HeroContainer";

const RackEquipmentConnectivity: React.FC = () => {
  return (
    <HeroContainer>
      <PageTitle>Conectividade de equipamento</PageTitle>
      <Box sx={{ display: "flex", mt: 2, mb: 2, maxWidth: "640px" }}>
        <BuildingDropdown />
        <FloorDropdown sx={{ ml: 2 }} />
      </Box>

      <Typography variant="h4">Telecomunicações</Typography>

      <Box sx={{ width: "1200px", height: "900px" }}>
        <ConnectivityFlowDiagram />
      </Box>
    </HeroContainer>
  );
};

export default RackEquipmentConnectivity;
