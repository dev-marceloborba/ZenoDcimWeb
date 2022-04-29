import React, { useState } from "react";
import DataTable from "app/components/DataTable";
import {
  useDeleteEquipmentMutation,
  useListBuildingsQuery,
} from "app/services/datacenter";
import Row from "app/components/Row";
import Dropdown from "app/components/Dropdown";
import Loading from "app/components/Loading";
import ButtonLink from "app/components/ButtonLink";
import {
  BuildingResponse,
  EquipmentResponse,
  FloorResponse,
  RoomResponse,
} from "app/models/data-center.model";

const EquipmentTable: React.FC = () => {
  const { data: buildings, isLoading } = useListBuildingsQuery();
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingResponse>();
  const [selectedFloor, setSelectedFloor] = useState<FloorResponse>();
  const [selectedRoom, setSelectedRoom] = useState<FloorResponse>();
  const [floors, setFloors] = useState<FloorResponse[]>([]);
  const [rooms, setRooms] = useState<RoomResponse[]>([]);
  const [equipments, setEquipments] = useState<EquipmentResponse[]>([]);
  const [deleteEquipment] = useDeleteEquipmentMutation();

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

  const onChangeRoom = (roomId: string) => {
    var _selectedRoom = rooms.find((x) => x.id === roomId);
    setEquipments(_selectedRoom?.equipments ?? []);
    setSelectedRoom(_selectedRoom);
  };

  return (
    <>
      <Row
        sx={{
          alignItems: "center",
          mt: 2,
          mb: 2,
          "& .MuiFormControl-root": {
            maxWidth: "240px",
          },
          "& .MuiFormControl-root:not(:first-child)": {
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
        <Dropdown
          label="Sala"
          items={
            rooms?.map((x) => ({
              label: x.name,
              value: x.id,
            })) ?? []
          }
          value={selectedRoom?.id ?? ""}
          defaultValue=""
          callback={onChangeRoom}
        />
        <ButtonLink
          variant="contained"
          to="/zeno/automation/management/equipment/new"
          sx={{ marginLeft: "auto" }}
        >
          Criar equipamento
        </ButtonLink>
      </Row>
      <DataTable
        title="Equipamentos"
        columns={columns}
        rows={equipments}
        options={{ onRowClick: (row) => console.log(row) }}
      />
      <Loading open={isLoading} />
    </>
  );
};

export default EquipmentTable;

const columns = [
  {
    name: "class",
    label: "Classe",
    align: "left",
  },
  {
    name: "component",
    label: "Componente",
    align: "right",
  },
  {
    name: "componentCode",
    label: "Código do componente",
    align: "right",
  },
  {
    name: "description",
    label: "Descrição",
    align: "right",
  },
];
