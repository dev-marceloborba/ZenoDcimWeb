import React from "react";
import Card from "@mui/material/Card";
import Table from "app/hooks/useTable";

const FireSytemEventsTable: React.FC = () => {
  const columns = [
    {
      label: "Equipamento",
      name: "equipment",
      align: "left",
    },
    {
      label: "Evento",
      name: "event",
      align: "right",
    },
    {
      label: "Severidade",
      name: "severity",
      align: "right",
    },
    {
      label: "Data de entrada",
      name: "dateIn",
      align: "right",
    },
  ];

  return (
    <Card>
      <Table rows={[]} columns={columns} />
    </Card>
  );
};

export default FireSytemEventsTable;
