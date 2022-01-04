import React from "react";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import { Floor } from "app/types/bms";

import { building01 } from "app/data/bms";
import EquipmentCard from "../components/EquipmentCard";
import PageTitle from "app/components/PageTitle";
import RoomCard from "../components/RoomCard";
import ButtonLink from "app/components/ButtonLink";
import FloorDropdown from "../components/FloorDropdown";
import FireSystemCard from "../components/FireSystemCard";

const FireSystem: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Toolbar />
      <PageTitle>Incêndio</PageTitle>
      <FloorDropdown />

      <Grid container spacing={1}>
          <Grid item md={6}>
              <RoomCard title="Laços">
                 <Grid container spacing={1} justifyContent="space-between">
                     <Grid item >
                         <FireSystemCard  />
                     </Grid>
                </Grid>   
              </RoomCard>
          </Grid>
      </Grid>
    </Container>
  );
};

export default FireSystem;
