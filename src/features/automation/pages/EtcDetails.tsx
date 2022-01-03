import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { BmsEquipment, EEquipmentStatus, Floor } from "app/types/bms";
import { building01 } from "app/data/bms";
import EquipmentCard from "../components/EquipmentCard";

type FilterData = {
  energy: boolean;
  clim: boolean;
  telecom: boolean;
};

const EtcDetails: React.FC = () => {
  const [filter, setFilter] = React.useState<FilterData>({
    energy: true,
    clim: true,
    telecom: false,
  });

  const { floors } = building01
  const {rooms} = floors[0]
  const { equipments } = rooms[0]

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
    <Container maxWidth="xl">
      <Toolbar />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>Energia, Clima e Telecom</Typography>
        <Box sx={{ display: "flex" }}>
          <Typography>Sala 1</Typography>
          <Typography sx={{ ml: 2 }}>Data Hall</Typography>
        </Box>
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

      <Grid sx={{mt: 2}} container>
          {
              equipments.map((equipment, index) => (
                <Grid key={index} item md={6}>
                    <EquipmentCard {...equipment} {...filter} />
                </Grid>   
              ))
          }
          
      </Grid>
    </Container>
  );
};

export default EtcDetails;
