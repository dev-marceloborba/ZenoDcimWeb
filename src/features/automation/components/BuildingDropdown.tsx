import React from "react";
import Dropdown, { ItemProps } from "app/components/Dropdown";

const BuildingDropdown: React.FC = () => {
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

  const [selectedItem, setSelectedItem] = React.useState<string>(
    items[0].value
  );

  return (
    <Dropdown
      label="Prédio"
      items={items}
      value={selectedItem}
      callback={(value) => setSelectedItem(value)}
    />
  );
};

export default BuildingDropdown;
