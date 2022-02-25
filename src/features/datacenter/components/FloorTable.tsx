import React, { useState } from "react";
import Table from "app/hooks/useTable";
import Dropdown from "app/components/Dropdown";
import Column from "app/components/Column";
import {
  BuildingResponse,
  useListBuildingsQuery,
  useListFloorQuery,
} from "app/services/datacenter";

const columns = [
  {
    name: "id",
    label: "Id",
    align: "left",
  },
  {
    name: "name",
    label: "Andar",
    align: "right",
  },
];

const FloorTable: React.FC = () => {
  const { data: buildings } = useListBuildingsQuery();
  const { data: floors } = useListFloorQuery();
  const [selectedBuilding, setSelectedBulding] = useState<BuildingResponse>(
    {} as BuildingResponse
  );
  return (
    <Column>
      <Dropdown
        items={
          buildings?.map((building) => ({
            label: building.name,
            value: building.id,
          })) ?? []
        }
        value={selectedBuilding.id}
        callback={(id) => console.log(id)}
      />
      <Table rows={floors} columns={columns} showActions />
    </Column>
  );
};

export default FloorTable;
