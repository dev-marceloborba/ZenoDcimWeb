import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import { useAutomationFilters } from "modules/automation/hooks/useAutomationFilters";

const EtcFilters: React.FC = () => {
  const { groups, toogleEnergyGroup, toogleClimGroup, toogleTelecomGroup } =
    useAutomationFilters();

  return (
    <Box sx={{ display: "flex" }}>
      <Tooltip title="Filtro pela categoria Energia">
        <Chip
          variant={groups.energy ? "filled" : "outlined"}
          onClick={toogleEnergyGroup}
          label="Energia"
        />
      </Tooltip>

      <Tooltip title="Filtro pela categoria Clima">
        <Chip
          variant={groups.clim ? "filled" : "outlined"}
          onClick={toogleClimGroup}
          label="Clima"
          sx={{ ml: 1 }}
        />
      </Tooltip>

      <Tooltip title="Filtro pela categoria Telecomunicações">
        <Chip
          variant={groups.telecom ? "filled" : "outlined"}
          onClick={toogleTelecomGroup}
          label="Telecom"
          sx={{ ml: 1 }}
        />
      </Tooltip>
    </Box>
  );
};

export default EtcFilters;
