import React from "react";
import Dropdown, { ItemProps } from "app/components/Dropdown";
import { useAutomationFilters } from "./AutomationFiltersProvider";
import { SxProps, Theme } from "@mui/material";

type BuildingDropdownProps = {
  sx?: SxProps<Theme>;
};


const BuildingDropdown: React.FC<BuildingDropdownProps> = ({sx}) => {
  const { handleBuilding, building } = useAutomationFilters()
  const items: ItemProps[] = [
    {
      label: "Data Hall",
      value: "Data Hall",
    },
    {
      label: "Predio 1",
      value: "Predio 1",
    },
  ];

  return (
    <Dropdown
      label="Prédio"
      items={items}
      value={building}
      callback={handleBuilding}
      sx={sx}
    />
  );
};

export default BuildingDropdown;
