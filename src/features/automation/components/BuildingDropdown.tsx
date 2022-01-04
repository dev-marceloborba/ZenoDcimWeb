import React from "react";
import Dropdown, { ItemProps } from "app/components/Dropdown";
import { useAutomationFilters } from "./AutomationFiltersProvider";

const BuildingDropdown: React.FC = () => {
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
    />
  );
};

export default BuildingDropdown;
