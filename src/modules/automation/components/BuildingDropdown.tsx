import React from "react";
import Dropdown from "modules/shared/components/Dropdown";
import { SxProps, Theme } from "@mui/material";
import useAutomationFilters from "../data/hooks/useAutomationFilters";

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
