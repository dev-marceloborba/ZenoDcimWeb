import React, { useState } from "react";
import Table from "app/hooks/useTable";
import {
  useDeleteRoomMutation,
  useListBuildingsQuery,
  // useListRoomQuery,
} from "app/services/datacenter";
import Dropdown from "app/components/Dropdown";
import Row from "app/components/Row";
import Loading from "app/components/Loading";
import ButtonLink from "app/components/ButtonLink";
import {
  BuildingResponse,
  FloorResponse,
  RoomResponse,
} from "app/models/data-center.model";

const columns = [
  // {
  //   name: "id",
  //   label: "Id",
  //   align: "left",
  // },
  {
    name: "name",
    label: "Nome",
    align: "left",
  },
];

const RoomTable: React.FC = () => {
  const { data: buildings, isLoading } = useListBuildingsQuery();
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingResponse>();
  const [selectedFloor, setSelectedFloor] = useState<FloorResponse>();
  const [floors, setFloors] = useState<FloorResponse[]>([]);
  const [rooms, setRooms] = useState<RoomResponse[]>([]);
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
          to="/zeno/automation/management/room/new"
          sx={{ marginLeft: "auto" }}
        >
          Criar sala
        </ButtonLink>
      </Row>
      <Table
        columns={columns}
        rows={rooms}
        showActions
        handleDelete={async (row: any) => await deleteRoom(row.id).unwrap()}
      />
      <Loading open={isLoading} />
    </>
  );
};

export default RoomTable;
