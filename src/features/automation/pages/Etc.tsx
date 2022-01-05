import React from "react";
import Box from "@mui/material/Box";
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
import EtcFilters from "../components/EtcFilters";
import { useAutomationFilters } from "../components/AutomationFiltersProvider";
import Center from "app/components/Center";

const Etc: React.FC = () => {
  const { groups, floor } = useAutomationFilters();

  const [currentFloor, setCurrentFloor] = React.useState<Floor>({} as Floor);

  const { floors } = building01;

  React.useEffect(() => {
    setCurrentFloor(floors.filter((x) => x.name === floor)[0]);
  }, [floor, floors]);

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
          <FloorDropdown sx={{ ml: 2 }} />
        </Box>

        <EtcFilters />
      </Box>

      <Grid sx={{ mt: 1 }} container spacing={1}>
        {currentFloor?.rooms?.map((room, index) => (
          <Grid key={index} item md={6}>
            <RoomCard title={room.name}>
              <Grid container spacing={1} justifyContent="space-between">
                {room.equipments.map((equipment, index) => (
                  <Grid key={index}>
                    <EquipmentCard {...equipment} {...groups} />
                  </Grid>
                ))}
              </Grid>
              <Center>
                <ButtonLink to="/zeno/automation/etc/details" sx={{ mt: 1 }}>
                  Ver mais
                </ButtonLink>
              </Center>
            </RoomCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Etc;
