import React, { useState, useMemo } from "react";
import Grid from "@mui/material/Grid";
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
// import { FloorResponse } from "app/services/datacenter";

const Etc: React.FC = () => {
  const { groups, buildings, building, floor } = useAutomationFilters();
  // const [currentFloor, setCurrentFloor] = useState<FloorResponse>(
  //   {} as FloorResponse
  // );

  const floors = useMemo(
    () =>
      buildings
        ?.find((x) => x.id === building)
        ?.floors?.find((x) => x.id === floor)?.rooms ?? [],
    [building, buildings, floor]
  );

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
        {floors?.map((room, index) => (
          <Grid key={index} item md={6}>
            <RoomCard title={room.name}>
              <Grid container spacing={1} justifyContent="space-between">
                {room.equipments?.map((equipment, index) => (
                  <Grid key={index}>
                    {/* <EquipmentCard {...equipment} {...groups} /> */}
                  </Grid>
                ))}
              </Grid>
              <Center>
                <ButtonLink
                  to={`/zeno/automation/etc/details/${room.id}`}
                  sx={{ mt: 1 }}
                >
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
