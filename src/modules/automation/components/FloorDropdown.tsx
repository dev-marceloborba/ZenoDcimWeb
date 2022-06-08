import React from "react";
import Dropdown from "modules/shared/components/Dropdown";
import { SxProps, Theme } from "@mui/material";
import useAutomationFilters from "../data/hooks/useAutomationFilters";

type FloorDropdownProps = {
  sx?: SxProps<Theme>;
};

const FloorDropdown: React.FC<FloorDropdownProps> = ({ sx }) => {
  const { handleFloor, floor, building, buildings } = useAutomationFilters();
  const floors = buildings?.find((x) => x.id === building)?.floors;

  return (
    <Dropdown
      label="Andar"
      items={
        floors?.map((x) => ({
          label: x.name,
          value: x.id,
        })) ?? []
      }
      value={floor}
      callback={handleFloor}
      sx={sx}
    />
  );
};

export default FloorDropdown;
