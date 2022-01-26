import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PageTitle from "app/components/PageTitle";
import BuildingDropdown from "../components/BuildingDropdown";
import FloorDropdown from "../components/FloorDropdown";
import ConnectivityFlowDiagram from "../components/ConnectivityFlowDiagram";

const RackEquipmentConnectivity: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Toolbar />
      <PageTitle>Conectividade de equipamento</PageTitle>
      <Box sx={{ display: "flex", mt: 2, mb: 2, maxWidth: "640px" }}>
        <BuildingDropdown />
        <FloorDropdown sx={{ ml: 2 }} />
      </Box>

      <Typography variant="h4">Telecomunicações</Typography>

      <Box sx={{ width: "1200px", height: "900px" }}>
        <ConnectivityFlowDiagram />
      </Box>
    </Container>
  );
};

export default RackEquipmentConnectivity;
