import React, { useState } from "react";
import DataTable from "app/components/DataTable";
import Dropdown from "app/components/Dropdown";
import Column from "app/components/Column";
import {
  useDeleteFloorMutation,
  useListBuildingsQuery,
} from "app/services/datacenter";
import Loading from "app/components/Loading";
import Row from "app/components/Row";
import ButtonLink from "app/components/ButtonLink";
import { FloorResponse } from "app/models/data-center.model";

const FloorTable: React.FC = () => {
  const { data: buildings, isLoading } = useListBuildingsQuery();
  const [deleteFloor] = useDeleteFloorMutation();
  const [selectedBuilding, setSelectedBuliding] = useState<string>("");
  const [filteredBuilding, setFilteredBuilding] = useState<FloorResponse[]>([]);

  const onApplyFilter = (id: string) => {
    const b = buildings?.find((building) => building.id === id);
    setFilteredBuilding(b?.floors ?? []);
    setSelectedBuliding(id);
  };

  return (
    <Column>
      <Row
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          mt: 2,
          mb: 2,
          " & .MuiTextField-root": {
            maxWidth: "300px",
          },
        }}
      >
        <Dropdown
          items={
            buildings?.map((building) => ({
              label: building.name,
              value: building.id,
            })) ?? []
          }
          label="Prédio"
          defaultValue={""}
          value={selectedBuilding}
          callback={onApplyFilter}
        />
        <ButtonLink
          variant="contained"
          to="/zeno/automation/management/floor/new"
        >
          Criar andar
        </ButtonLink>
      </Row>
      <DataTable
        title="Andares"
        rows={filteredBuilding ?? []}
        columns={columns}
        options={{
          onRowClick: (row) => console.log(row),
        }}
      />
      <Loading open={isLoading} />
    </Column>
  );
};

export default FloorTable;

const columns = [
  {
    name: "name",
    label: "Andar",
  },
];
