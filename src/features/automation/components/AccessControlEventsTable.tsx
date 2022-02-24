import React from "react";
import Card from "@mui/material/Card";
import Table from "app/hooks/useTable";
import Typography from "@mui/material/Typography";
import { AccessEvent } from "app/data/access-control";

type AccessControlEventsTableProps = {
  events: AccessEvent[];
};

const AccessControlEventsTable: React.FC<AccessControlEventsTableProps> = ({
  events,
}) => {
  const columns = [
    {
      label: "Nome",
      name: "name",
      align: "left",
    },
    {
      label: "N° de cadastro",
      name: "registerNumber",
      align: "right",
    },
    {
      label: "Prédio",
      name: "building",
      align: "right",
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
      label: "Data de reconhecimento",
      name: "ackedDate",
      align: "right",
    },
  ];
  return (
    <Card sx={{ mt: 2 }}>
      <Typography variant="h5" sx={{ ml: 2, mt: 1, mb: 1 }}>
        Eventos de acesso
      </Typography>
      <Table columns={columns} rows={events} showActions />
    </Card>
  );
};

export default AccessControlEventsTable;
