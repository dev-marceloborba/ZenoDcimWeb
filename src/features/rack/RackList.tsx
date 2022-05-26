import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import DataTable, { ColumnHeader } from "app/components/DataTable";
import { useFindAllRacksQuery } from "app/services/rack";
import ButtonLink from "app/components/ButtonLink";
import Loading from "app/components/Loading";

const Racks: React.FC = () => {
  const { data: racks, isLoading } = useFindAllRacksQuery();

  return (
    <Container maxWidth="xl">
      <Toolbar />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <ButtonLink to="/zeno/racks/new" variant="contained">
          Novo rack
        </ButtonLink>
      </Box>
      <DataTable title="Racks" columns={columns} rows={racks ?? []} />
      <Loading open={isLoading} />
    </Container>
  );
};

export default Racks;

const columns: ColumnHeader[] = [
  {
    label: "Localização",
    name: "localization",
  },
  {
    label: "Capacidade",
    name: "size",
  },
  {
    label: "Tipo equipamento",
    name: "equipmentType",
  },
  {
    label: "Equipamento",
    name: "name",
  },
  {
    label: "Modelo",
    name: "model",
  },
  {
    label: "Fabricante",
    name: "manufactor",
  },
  {
    label: "Número serial",
    name: "serialNumber",
  },
  {
    label: "Posição inicial",
    name: "initialPosition",
  },
  {
    label: "Posição final",
    name: "finalPosition",
  },
];
