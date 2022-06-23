import React, { useState } from "react";
import DataTable from "modules/shared/components/DataTable";
import Dropdown from "modules/shared/components/Dropdown";
import Row from "modules/shared/components/Row";
import Loading from "modules/shared/components/Loading";
import ButtonLink from "modules/shared/components/ButtonLink";

import {
  BuildingModel,
  FloorModel,
  RoomModel,
} from "modules/datacenter/models/datacenter-model";
import { useDeleteRoomMutation } from "modules/datacenter/services/room-service";
import { useFindAllBuildingsQuery } from "modules/datacenter/services/building-service";
import compositePathRoute from "modules/utils/compositePathRoute";
import { HomePath } from "modules/paths";
import { AutomationPath } from "modules/home/routes/paths";
import { RoomFormPath } from "modules/automation/routes/paths";

const RoomTable: React.FC = () => {
  const { data: buildings, isLoading } = useFindAllBuildingsQuery();
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingModel>();
  const [selectedFloor, setSelectedFloor] = useState<FloorModel>();
  const [floors, setFloors] = useState<FloorModel[]>([]);
  const [rooms, setRooms] = useState<RoomModel[]>([]);
  const [deleteRoom] = useDeleteRoomMutation();

  const onChangeBuilding = (buildingId: string) => {
    var _selectedBuilding = buildings?.find((x) => x.id === buildingId);
    setFloors(_selectedBuilding?.floors ?? []);
    setSelectedBuilding(_selectedBuilding);
  };

  const onChangeFloor = (floorId: string) => {
    var _selectedFloor = floors.find((x) => x.id === floorId);
    setRooms(_selectedFloor?.rooms ?? []);
    setSelectedFloor(_selectedFloor);
  };

  return (
    <>
      <Row
        sx={{
          alignItems: "center",
          mt: 2,
          mb: 2,
          "& .MuiTextField-root": {
            maxWidth: "240px",
          },
          "& .MuiTextField-root:first-child": {
            marginRight: "16px",
          },
        }}
      >
        <Dropdown
          label="Prédio"
          items={
            buildings?.map((x) => ({
              label: x.name,
              value: x.id,
            })) ?? []
          }
          value={selectedBuilding?.id ?? ""}
          defaultValue=""
          callback={onChangeBuilding}
        />
        <Dropdown
          label="Andar"
          items={
            floors?.map((x) => ({
              label: x.name,
              value: x.id,
            })) ?? []
          }
          value={selectedFloor?.id ?? ""}
          defaultValue=""
          callback={onChangeFloor}
        />

        <ButtonLink
          variant="contained"
          to={compositePathRoute([HomePath, AutomationPath, RoomFormPath])}
          sx={{ marginLeft: "auto" }}
        >
          Criar sala
        </ButtonLink>
      </Row>
      <DataTable
        title="Salas"
        columns={columns}
        rows={rooms ?? []}
        options={{ onRowClick: (row) => console.log(row) }}
      />
      <Loading open={isLoading} />
    </>
  );
};

export default RoomTable;

const columns = [
  {
    name: "name",
    label: "Nome",
  },
];
