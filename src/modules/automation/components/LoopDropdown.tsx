import React from "react";
import Dropdown, { ItemProps } from "app/components/Dropdown";
import { useAutomationFilters } from "./AutomationFiltersProvider";
import { SxProps, Theme } from "@mui/material";

type BuildingDropdownProps = {
  sx?: SxProps<Theme>;
};


const LoopDropdown: React.FC<BuildingDropdownProps> = ({sx}) => {
  const { handleLoop, loop } = useAutomationFilters()
  const items: ItemProps[] = [
    {
      label: "Laço 1",
      value: "loop1",
    },
    {
      label: "Laço 2",
      value: "loop2",
    },
  ];

  return (
    <Dropdown
      label="Laço"
      items={items}
      value={loop}
      callback={handleLoop}
      sx={sx}
    />
  );
};

export default LoopDropdown;
