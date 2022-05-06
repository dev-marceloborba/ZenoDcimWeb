import React from "react";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import DataTable, { ColumnHeader } from "app/components/DataTable";
import { DoorControlEvent, EDoorStatus } from "app/data/access-control";

type AccessControlDoorEventsTableProps = {
  events: DoorControlEvent[];
};

const AccessControlDoorEventsTable: React.FC<
  AccessControlDoorEventsTableProps
> = ({ events }) => {
  return (
    <Card>
      <DataTable
        title="Controle de portas"
        columns={columns}
        rows={events}
        options={{
          onRowClick: (row) => console.log(row),
        }}
      />
    </Card>
  );
};

export default AccessControlDoorEventsTable;

const columns: ColumnHeader[] = [
  {
    label: "Prédio",
    name: "building",
  },
  {
    label: "Local",
    name: "place",
  },
  {
    label: "Sala",
    name: "room",
  },
  {
    label: "Porta",
    name: "door",
  },
  {
    label: "Data de reconhecimento",
    name: "ackedDate",
  },
  {
    label: "Status",
    name: "status",
    renderComponent: (row: any) => <AccessControlDoorStatus status={row} />,
  },
];

type AccessControlDoorStatusProps = Pick<DoorControlEvent, "status">;

const AccessControlDoorStatus: React.FC<AccessControlDoorStatusProps> = ({
  status,
}) => {
  return (
    <Chip
      label="Aberta"
      color="error"
      sx={{ width: 90 }}
      {...(status === EDoorStatus.CLOSE && {
        label: "Fechada",
        color: "primary",
      })}
    />
  );
};
