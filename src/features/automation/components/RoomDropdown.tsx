import React from "react";
import Dropdown from "app/components/Dropdown";
import { useAutomationFilters } from "./AutomationFiltersProvider";
import { SxProps, Theme } from "@mui/material";

type RoomDropdownProps = {
  sx?: SxProps<Theme>;
};

const RoomDropdown: React.FC<RoomDropdownProps> = ({ sx }) => {
  const { handleRoom, buildings, building, floor, room } =
    useAutomationFilters();
  const rooms =
    buildings
      ?.find((x) => x.id === building)
      ?.floors?.find((x) => x.id === floor)?.rooms ?? [];

  return (
    <Dropdown
      label="Sala"
      items={
        rooms?.map((x) => ({
          label: x.name,
          value: x.id,
        })) ?? []
      }
      value={room}
      callback={handleRoom}
      sx={sx}
    />
  );
};

export default RoomDropdown;
