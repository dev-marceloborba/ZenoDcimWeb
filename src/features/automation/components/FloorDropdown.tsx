import React from "react";
import Dropdown, { ItemProps } from "app/components/Dropdown";
import { useAutomationFilters } from "./AutomationFiltersProvider";
import { SxProps, Theme } from "@mui/material";

type FloorDropdownProps = {
  sx?: SxProps<Theme>;
};

const FloorDropdown: React.FC<FloorDropdownProps> = ({ sx }) => {
  const { handleFloor, floor } = useAutomationFilters();
  const items: ItemProps[] = [
    {
      label: "Andar 1",
      value: "floor1",
    },
    {
      label: "Andar 2",
      value: "floor2",
    },
    {
      label: "Andar 3",
      value: "floor3",
    },
    {
      label: "Andar 4",
      value: "floor4",
    },
  ];

  return (
    <Dropdown
      label="Andar"
      items={items}
      value={floor}
      callback={handleFloor}
      sx={sx}
    />
  );
};

export default FloorDropdown;
