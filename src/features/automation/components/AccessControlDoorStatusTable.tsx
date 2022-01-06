import React from "react";
import Card from "@mui/material/Card";
import Table from "app/hooks/useTable";
import { DoorControlEvent } from "app/data/access-control";

type AccessControlDoorEventsTableProps = {
  events: DoorControlEvent[];
};

const AccessControlDoorEventsTable: React.FC<
  AccessControlDoorEventsTableProps
> = ({ events }) => {
  const columns = [
    {
      label: "Prédio",
      name: "building",
      align: "left",
    },
    {
      label: "Local",
      name: "place",
      align: "right",
    },
    {
      label: "Sala",
      name: "room",
      align: "right",
    },
    {
      label: "Porta",
      name: "door",
      align: "right",
    },
    {
      label: "Data de reconhecimento",
      name: "ackedDate",
      align: "right",
    },
    {
      label: "Status",
      name: "status",
      align: "right",
      Component: <div style={{ color: "red" }}>Ola deu certo</div>,
    },
  ];
  return (
    <Card>
      <Table columns={columns} rows={events} />
    </Card>
  );
};

export default AccessControlDoorEventsTable;
