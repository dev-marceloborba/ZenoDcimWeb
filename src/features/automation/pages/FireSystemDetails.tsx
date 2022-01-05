import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import PageTitle from "app/components/PageTitle";
import BuildingDropdown from "../components/BuildingDropdown";
import FloorDropdown from "../components/FloorDropdown";
import ZoneDropdown from "../components/ZoneDropdown";
import LoopDropdown from "../components/LoopDropdown";
import FireSytemEventsTable from "../components/FireSystemEventsTable";

const FireSystemDetails: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Toolbar />
      <PageTitle>Incêndio - Eventos</PageTitle>

      <Box sx={{ display: "flex", mt: 2 }}>
        <BuildingDropdown />
        <FloorDropdown sx={{ ml: 1, mr: 1 }} />
        <ZoneDropdown sx={{ mr: 1 }} />
        <LoopDropdown />
      </Box>

      <Box sx={{width: '100%', mt: 2}}>
        <FireSytemEventsTable />
      </Box>
    </Container>
  );
};

export default FireSystemDetails;
