import React from "react";
import Dropdown, { ItemProps } from "app/components/Dropdown";
import { useAutomationFilters } from "./AutomationFiltersProvider";
import { SxProps, Theme } from "@mui/material";

type BuildingDropdownProps = {
  sx?: SxProps<Theme>;
};


const ZoneDropdown: React.FC<BuildingDropdownProps> = ({sx}) => {
  const { handleZone, zone } = useAutomationFilters()
  const items: ItemProps[] = [
    {
      label: "Zona 1",
      value: "zone1",
    },
    {
      label: "Zona 2",
      value: "zone2",
    },
  ];

  return (
    <Dropdown
      label="Zona"
      items={items}
      value={zone}
      callback={handleZone}
      sx={sx}
    />
  );
};

export default ZoneDropdown;
