import React, { useState } from "react";
import DataTable from "modules/shared/components/DataTable";
import Dropdown from "modules/shared/components/Dropdown";
import Column from "modules/shared/components/Column";
import Loading from "modules/shared/components/Loading";
import Row from "modules/shared/components/Row";
import ButtonLink from "modules/shared/components/ButtonLink";
import { useFindAllBuildingsQuery } from "modules/datacenter/services/building-service";
import { useDeleteFloorMutation } from "modules/datacenter/services/floor-service";
import { FloorModel } from "modules/datacenter/models/datacenter-model";
import compositePathRoute from "modules/utils/compositePathRoute";
import { HomePath } from "modules/paths";
import { AutomationPath } from "modules/home/routes/paths";
import { FloorFormPath } from "modules/automation/routes/paths";

const FloorTable: React.FC = () => {
  const { data: buildings, isLoading } = useFindAllBuildingsQuery();
  const [deleteFloor] = useDeleteFloorMutation();
  const [selectedBuilding, setSelectedBuliding] = useState<string>("");
  const [filteredBuilding, setFilteredBuilding] = useState<FloorModel[]>([]);

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
          to={compositePathRoute([HomePath, AutomationPath, FloorFormPath])}
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
