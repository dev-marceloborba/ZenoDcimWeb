import React from "react";
import Table from "app/hooks/useTable";
import {
  useDeleteRoomMutation,
  useListRoomQuery,
} from "app/services/datacenter";

const columns = [
  {
    name: "id",
    label: "Id",
    align: "left",
  },
  {
    name: "name",
    label: "Nome",
    align: "right",
  },
];

const RoomTable: React.FC = () => {
  const { data: rooms, isLoading } = useListRoomQuery();
  const [deleteRoom] = useDeleteRoomMutation();

  return (
    <Table
      columns={columns}
      rows={rooms}
      showActions
      handleDelete={async (row: any) => await deleteRoom(row.id).unwrap()}
    />
  );
};

export default RoomTable;
