import React from "react";
import Grid from "@mui/material/Grid";
import { building01 } from "app/data/bms";
import EquipmentCard from "../components/EquipmentCard";
import PageTitle from "app/components/PageTitle";
import EtcFilters from "../components/EtcFilters";
import { useAutomationFilters } from "../components/AutomationFiltersProvider";
import HeroContainer from "app/components/HeroContainer";
import Row from "app/components/Row";

const EtcDetails: React.FC = () => {
  const { groups } = useAutomationFilters();
  const { floors } = building01;
  const { rooms } = floors[0];
  const { equipments } = rooms[0];

  return (
    <HeroContainer>
      <Row sx={{ justifyContent: "space-between" }}>
        <PageTitle>Energia, Clima e Telecom</PageTitle>
        <Row sx={{}}>
          <PageTitle>Sala 1</PageTitle>
          <PageTitle sx={{ ml: 2 }}>Data Hall</PageTitle>
        </Row>
      </Row>
      <Row
        sx={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <EtcFilters />
      </Row>
      <Grid sx={{ mt: 2 }} container>
        {equipments.map((equipment, index) => (
          <Grid key={index} item md={6}>
            <EquipmentCard {...equipment} {...groups} showGroupTitle />
          </Grid>
        ))}
      </Grid>
    </HeroContainer>
  );
};

export default EtcDetails;
