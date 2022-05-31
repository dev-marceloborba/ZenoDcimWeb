import React from "react";
import Grid from "@mui/material/Grid";
import PageTitle from "modules/shared/components/PageTitle";
import RoomCard from "modules/automation/components/RoomCard";
import ButtonLink from "modules/shared/components/ButtonLink";
import FloorDropdown from "modules/automation/components/FloorDropdown";
import FireSystemCard from "modules/automation/components/FireSystemCard";

import { fireSystem } from "app/data/fire-system";
import Center from "app/components/Center";
import FireSystemEvents from "modules/automation/components/FireSystemEvents";
import HeroContainer from "app/components/HeroContainer";

const FireSystem: React.FC = () => {
  const { groups, events } = fireSystem;

  return (
    <HeroContainer>
      <PageTitle>Incêndio</PageTitle>
      <FloorDropdown sx={{ mt: 2, maxWidth: "280px" }} />
      <Grid sx={{ mt: 1 }} container spacing={1}>
        {groups.map((group, groupIndex) => (
          <Grid key={groupIndex} item md={6}>
            <RoomCard title={group.name}>
              <Grid container spacing={1} justifyContent="space-between">
                {group.categories.map((category, index) => (
                  <Grid key={index}>
                    <FireSystemCard {...category} />
                    {/* {groupIndex === 1 ? (
                <FireSystemEvents events={events} />
              ) : (
                <FireSystemCard {...category} />
              )} */}
                  </Grid>
                ))}
              </Grid>
              <Center>
                <ButtonLink to="/zeno/automation/fire-system/details">
                  Detalhes
                </ButtonLink>
              </Center>
            </RoomCard>
          </Grid>
        ))}
      </Grid>
    </HeroContainer>
  );
};

export default FireSystem;
