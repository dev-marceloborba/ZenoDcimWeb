import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import { building01 } from "app/data/bms";
import EquipmentCard from "../components/EquipmentCard";
import PageTitle from "app/components/PageTitle";
import EtcFilters, {
  FilterData,
  useFilters,
  EtcFiltersProvider,
} from "../components/EtcFilters";

const EtcDetails: React.FC = () => {
  const { floors } = building01;
  const { rooms } = floors[0];
  const { equipments } = rooms[0];

  // const { filter } = useFilters();

  // console.log(filter)

  const [filter, setFilter] = React.useState<FilterData>({
    energy: true,
    clim: false,
    telecom: false,
  });

  const handleEnergyFilter = () => {
    const { energy } = filter;
    setFilter((prevState) => ({ ...prevState, energy: !energy }));
  };

  const handleClimFilter = () => {
    const { clim } = filter;
    setFilter((prevState) => ({ ...prevState, clim: !clim }));
  };

  const handleTelecomFilter = () => {
    const { telecom } = filter;
    setFilter((prevState) => ({ ...prevState, telecom: !telecom }));
  };

  return (
    // <EtcFiltersProvider>
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
        <EtcFilters
          handleEnergyFilter={handleEnergyFilter}
          handleClimFilter={handleClimFilter}
          handleTelecomFilter={handleTelecomFilter}
          filter={filter}
        />
      </Box>

      <Grid sx={{ mt: 2 }} container>
        {equipments.map((equipment, index) => (
          <Grid key={index} item md={6}>
            <EquipmentCard {...equipment} {...filter} showGroupTitle />
          </Grid>
        ))}
      </Grid>
    </Container>
    // </EtcFiltersProvider>
  );
};

export default EtcDetails;
