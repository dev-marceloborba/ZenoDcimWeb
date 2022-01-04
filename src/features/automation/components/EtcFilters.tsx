import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { useAutomationFilters } from "./AutomationFiltersProvider";

const EtcFilters: React.FC = () => {
  const {
    groups,
    handleToggleEnergyGroup,
    handleToggleClimGroup,
    handleToggleTelecomGroup,
  } = useAutomationFilters();

  return (
    <Box sx={{ display: "flex" }}>
      <Chip
        variant={groups.energy ? "filled" : "outlined"}
        onClick={handleToggleEnergyGroup}
        label="Energia"
      />
      <Chip
        variant={groups.clim ? "filled" : "outlined"}
        onClick={handleToggleClimGroup}
        label="Clima"
        sx={{ ml: 1 }}
      />

      <Chip
        variant={groups.telecom ? "filled" : "outlined"}
        onClick={handleToggleTelecomGroup}
        label="Telecom"
        sx={{ ml: 1 }}
      />
    </Box>
  );
};

export default EtcFilters;
