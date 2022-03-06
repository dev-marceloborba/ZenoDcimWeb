import React, { useState } from "react";
import Table from "app/hooks/useTable";
import {
  BuildingResponse,
  FloorResponse,
  RoomResponse,
  useDeleteRoomMutation,
  useListBuildingsQuery,
  // useListRoomQuery,
} from "app/services/datacenter";
import Dropdown from "app/components/Dropdown";
import Row from "app/components/Row";

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
  // const { data: rooms, isLoading } = useListRoomQuery();
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
          mt: 2,
          mb: 2,
          "& .MuiFormControl-root": {
            maxWidth: "240px",
          },
          "& .MuiFormControl-root:last-child": {
            marginLeft: "16px",
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
      </Row>
      <Table
        columns={columns}
        rows={rooms}
        showActions
        handleDelete={async (row: any) => await deleteRoom(row.id).unwrap()}
      />
    </>
  );
};

export default RoomTable;
