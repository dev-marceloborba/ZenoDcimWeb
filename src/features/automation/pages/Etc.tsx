import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import { Floor } from "app/types/bms";

import { building01 } from "app/data/bms";
import EquipmentCard from "../components/EquipmentCard";
import PageTitle from "app/components/PageTitle";
import RoomCard from "../components/RoomCard";
import ButtonLink from "app/components/ButtonLink";
import BuildingDropdown from "../components/BuildingDropdown";
import FloorDropdown from "../components/FloorDropdown";

type FilterData = {
  energy: boolean;
  clim: boolean;
  telecom: boolean;
};

const Etc: React.FC = () => {
  const [filter, setFilter] = React.useState<FilterData>({
    energy: true,
    clim: false,
    telecom: false,
  });
  const [currentFloor, setCurrentFloor] = React.useState<Floor>({} as Floor);

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

  // const { floors } = building01;

  // React.useEffect(() => {
  //   setCurrentFloor(floors.filter((x) => x.name === floor)[0]);
  // }, [floor, floors]);

  return (
    <Container maxWidth="xl">
      <Toolbar />
      <PageTitle>Energia, Clima e Telecom</PageTitle>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Box sx={{ display: "flex", width: "640px" }}>
          <BuildingDropdown />

          <FloorDropdown />
        </Box>

        <Box sx={{ display: "flex" }}>
          <Chip
            variant={filter.energy ? "filled" : "outlined"}
            onClick={handleEnergyFilter}
            label="Energia"
          />
          <Chip
            variant={filter.clim ? "filled" : "outlined"}
            onClick={handleClimFilter}
            label="Clima"
            sx={{ ml: 1 }}
          />

          <Chip
            variant={filter.telecom ? "filled" : "outlined"}
            onClick={handleTelecomFilter}
            label="Telecom"
            sx={{ ml: 1 }}
          />
        </Box>
      </Box>

      <Grid sx={{ mt: 1 }} container spacing={1}>
        {currentFloor?.rooms?.map((room, index) => (
          <Grid key={index} item md={6}>
            <RoomCard title={room.name}>
              <Grid container spacing={1} justifyContent="space-between">
                {room.equipments.map((equipment, index) => (
                  <Grid key={index}>
                    <EquipmentCard {...equipment} {...filter} />
                  </Grid>
                ))}
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ButtonLink to="/zeno/automation/etc/details" sx={{ mt: 1 }}>
                  Ver mais
                </ButtonLink>
              </Box>
            </RoomCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Etc;
