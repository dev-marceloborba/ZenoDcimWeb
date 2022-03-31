import React from "react";
import Dropdown from "app/components/Dropdown";
import { useAutomationFilters } from "./AutomationFiltersProvider";
import { SxProps, Theme } from "@mui/material";

type BuildingDropdownProps = {
  sx?: SxProps<Theme>;
};

const BuildingDropdown: React.FC<BuildingDropdownProps> = ({ sx }) => {
  const { handleBuilding, building, buildings } = useAutomationFilters();

  return (
    <Dropdown
      label="Prédio"
      items={
        buildings?.map((x) => ({
          label: x.name,
          value: x.id,
        })) ?? []
      }
      value={building}
      callback={handleBuilding}
      sx={sx}
    />
  );
};

export default BuildingDropdown;
