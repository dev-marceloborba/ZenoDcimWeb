import React from "react";
import Dropdown, { ItemProps } from "app/components/Dropdown";

const FloorDropdown: React.FC = () => {
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

  const [selectedItem, setSelectedItem] = React.useState<string>(
    items[0].value
  );

  return (
    <Dropdown
      label="Andar"
      items={items}
      value={selectedItem}
      callback={(value) => {
          setSelectedItem(value)
      }}
      sx={{ ml: 2 }}
    />
  );
};

export default FloorDropdown;
