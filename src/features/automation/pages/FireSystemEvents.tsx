import React from "react";
import Box from "@mui/material/Box";
import PageTitle from "app/components/PageTitle";
import BuildingDropdown from "../components/BuildingDropdown";
import FloorDropdown from "../components/FloorDropdown";
import ZoneDropdown from "../components/ZoneDropdown";
import LoopDropdown from "../components/LoopDropdown";
import FireSytemEventsTable from "../components/FireSystemEventsTable";
import HeroContainer from "app/components/HeroContainer";

const FireSystemEvents: React.FC = () => {
  return (
    <HeroContainer>
      <PageTitle>Incêndio - Eventos</PageTitle>

      <Box sx={{ display: "flex", mt: 2 }}>
        <BuildingDropdown />
        <FloorDropdown sx={{ ml: 1, mr: 1 }} />
        <ZoneDropdown sx={{ mr: 1 }} />
        <LoopDropdown />
      </Box>

      <Box sx={{ width: "100%", mt: 2 }}>
        <FireSytemEventsTable />
      </Box>
    </HeroContainer>
  );
};

export default FireSystemEvents;
