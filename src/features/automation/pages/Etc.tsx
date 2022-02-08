import React from "react";
import Grid from "@mui/material/Grid";
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
import HeroContainer from "app/components/HeroContainer";
import Row from "app/components/Row";

const Etc: React.FC = () => {
  const { groups, floor } = useAutomationFilters();
  const [currentFloor, setCurrentFloor] = React.useState<Floor>({} as Floor);
  const { floors } = building01;

  React.useEffect(() => {
    const floorEquipments =
      floor === "Todos" ? floors[0] : floors.filter((x) => x.name === floor)[0];
    setCurrentFloor(floorEquipments);
  }, [floor, floors]);

  return (
    <HeroContainer>
      <PageTitle>Energia, Clima e Telecom</PageTitle>
      <Row
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Row sx={{ width: "640px" }}>
          <BuildingDropdown />
          <FloorDropdown sx={{ ml: 2 }} />
        </Row>
        <EtcFilters />
      </Row>
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
    </HeroContainer>
  );
};

export default Etc;
