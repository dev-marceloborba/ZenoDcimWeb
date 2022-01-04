import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import { building01 } from "app/data/bms";
import EquipmentCard from "../components/EquipmentCard";
import PageTitle from "app/components/PageTitle";
import EtcFilters from "../components/EtcFilters";
import { useAutomationFilters } from "../components/AutomationFiltersProvider";

const EtcDetails: React.FC = () => {
  const { groups } = useAutomationFilters();
  const { floors } = building01;
  const { rooms } = floors[0];
  const { equipments } = rooms[0];

  return (
    <Container maxWidth="xl">
      <Toolbar />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <PageTitle>Energia, Clima e Telecom</PageTitle>
        <Box sx={{ display: "flex" }}>
          <PageTitle>Sala 1</PageTitle>
          <PageTitle sx={{ ml: 2 }}>Data Hall</PageTitle>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <EtcFilters />
      </Box>

      <Grid sx={{ mt: 2 }} container>
        {equipments.map((equipment, index) => (
          <Grid key={index} item md={6}>
            <EquipmentCard {...equipment} {...groups} showGroupTitle />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default EtcDetails;
