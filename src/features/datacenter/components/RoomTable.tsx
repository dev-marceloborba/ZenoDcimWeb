import React from "react";
import Table from "app/hooks/useTable";
import { useListRoomQuery } from "app/services/datacenter";

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
  return <Table columns={columns} rows={rooms} showActions />;
};

export default RoomTable;
