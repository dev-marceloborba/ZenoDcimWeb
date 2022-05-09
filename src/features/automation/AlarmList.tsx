import React from "react";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import DataTable, { ColumnHeader } from "app/components/DataTable";

const AlarmList: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Toolbar />
      <DataTable title={"Alarmes"} columns={columns} rows={[]} />
    </Container>
  );
};

export default AlarmList;

const columns: ColumnHeader[] = [
  {
    name: "name",
    label: "Nome",
  },
  {
    name: "dateIn",
    label: "Data de entrada",
  },
  {
    name: "dateOut",
    label: "Data de saída",
  },
  {
    name: "dateOut",
    label: "Data de saída",
  },
  {
    name: "acked",
    label: "Reconhecido",
  },
  {
    name: "priority",
    label: "Prioridade",
  },
];
