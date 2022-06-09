import React from "react";
import Card from "@mui/material/Card";
import DataTable, { ColumnHeader } from "modules/shared/components/DataTable";
import { AccessEvent } from "app/data/access-control";

type AccessControlEventsTableProps = {
  events: AccessEvent[];
};

const AccessControlEventsTable: React.FC<AccessControlEventsTableProps> = ({
  events,
}) => {
  return (
    <Card sx={{ mt: 2 }}>
      <DataTable
        title="Eventos de acesso"
        columns={columns}
        rows={events}
        options={{
          onRowClick: (row) => console.log(row),
        }}
      />
    </Card>
  );
};

export default AccessControlEventsTable;

const columns: ColumnHeader[] = [
  {
    label: "Nome",
    name: "name",
  },
  {
    label: "N° de cadastro",
    name: "registerNumber",
  },
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
    label: "Data de reconhecimento",
    name: "ackedDate",
  },
];
