import React, { useState } from "react";
import Table from "app/hooks/useTable";
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

const columns = [
  // {
  //   name: "id",
  //   label: "Id",
  //   align: "left",
  // },
  {
    name: "name",
    label: "Andar",
    align: "left",
  },
];

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
          label="Andar"
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
      <Table
        rows={filteredBuilding}
        columns={columns}
        showActions
        handleDelete={async (row: any) => await deleteFloor(row.id).unwrap()}
      />
      <Loading open={isLoading} />
    </Column>
  );
};

export default FloorTable;
