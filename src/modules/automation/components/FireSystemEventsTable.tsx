import React from "react";
import Card from "@mui/material/Card";
import DataTable, { ColumnHeader } from "app/components/DataTable";

const FireSytemEventsTable: React.FC = () => {
  return (
    <Card>
      <DataTable title="Eventos de incêndio" rows={[]} columns={columns} />
    </Card>
  );
};

export default FireSytemEventsTable;

const columns: ColumnHeader[] = [
  {
    label: "Equipamento",
    name: "equipment",
  },
  {
    label: "Evento",
    name: "event",
  },
  {
    label: "Severidade",
    name: "severity",
  },
  {
    label: "Data de entrada",
    name: "dateIn",
  },
];
