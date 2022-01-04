import React from "react";
import Dropdown, { ItemProps } from "app/components/Dropdown";
import { useAutomationFilters } from "./AutomationFiltersProvider";

const FloorDropdown: React.FC = () => {
  const { handleFloor, floor } = useAutomationFilters()
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
      label: 'Andar 3',
      value: 'floor3'
    },
    { 
        label: 'Andar 4',
        value: 'floor4'
      }
  ];

  
  return (
    <Dropdown
      label="Andar"
      items={items}
      value={floor}
      callback={handleFloor}
      sx={{ ml: 2 }}
    />
  );
};

export default FloorDropdown;
