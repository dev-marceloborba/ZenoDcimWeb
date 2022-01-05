import React from "react";

// import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import Toolbar from "@mui/material/Toolbar";

import PageTitle from "app/components/PageTitle";
import RoomCard from "../components/RoomCard";
import ButtonLink from "app/components/ButtonLink";
import FloorDropdown from "../components/FloorDropdown";
import FireSystemCard from "../components/FireSystemCard";

import { fireSystem } from "app/data/fire-system";
import Center from "app/components/Center";

const FireSystem: React.FC = () => {
  const { groups } = fireSystem;
  return (
    <Container maxWidth="xl">
      <Toolbar />
      <PageTitle>Incêndio</PageTitle>
      
      <FloorDropdown sx={{mt: 2, maxWidth: '280px'}} />
      
      <Grid sx={{mt: 1}} container spacing={1}>
          {groups.map((group, index) => (
            <Grid key={index} item md={6}>
            <RoomCard title={group.name}>
              <Grid container spacing={1} justifyContent="space-between">
                {group.categories.map((category, index) => (
                  <Grid key={index} item>
                    <FireSystemCard {...category} />
                  </Grid>
                ))}
              </Grid>
              <Center>
                <ButtonLink to="/zeno/fire-system/details">Detalhes</ButtonLink>
              </Center>
            </RoomCard>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default FireSystem;
