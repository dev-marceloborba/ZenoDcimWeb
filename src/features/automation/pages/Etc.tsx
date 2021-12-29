import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import BmsIndicator from "app/components/BmsIndicator";
import { BmsEquipment, EEquipmentStatus } from "app/types/bms";

import { building01 } from "app/data/bms";

const Etc: React.FC = () => {
  const [building, setBuilding] = React.useState("");
  const [floor, setFloor] = React.useState("");
  const [filter, setFilter] = React.useState({
    energy: true,
    clim: false,
    telecom: false,
  });

  const { floors } = building01;
  const { rooms } = floors[0];

  const handleBuildingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBuilding(event.target.value);
  };

  const handleFloorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFloor(event.target.value);
  };

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

  React.useEffect(() => {

  }, [floor])

  return (
    <Container maxWidth="xl">
      <Toolbar />
      <Typography variant="h4">Energia, Clima e Telecom</Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Box sx={{ display: "flex", width: "640px" }}>
          <TextField
            variant="outlined"
            label="Prédio"
            select
            fullWidth
            value={building}
            onChange={handleBuildingChange}
          >
            <MenuItem value={"datahall"}>Data Hall</MenuItem>
          </TextField>

          <TextField
            variant="outlined"
            label="Andar"
            select
            fullWidth
            value={floor}
            onChange={handleFloorChange}
            sx={{ ml: 2 }}
          >
            <MenuItem value={"floor1"}>Andar 1</MenuItem>
            <MenuItem value={"floor2"}>Andar 2</MenuItem>
            <MenuItem value={"floor3"}>Andar 3</MenuItem>
            <MenuItem value={"floor4"}>Andar 4</MenuItem>
          </TextField>
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
        {rooms.map((room, index) => (
          <Grid key={index} item md={6}>
            <RoomCard title={room.name}>
              {/* <Grid container spacing={1} justifyContent="space-around"> */}
              <Grid container spacing={1} justifyContent="space-between">
                {/* <Grid container spacing={1}> */}
                {room.equipments.map((equipment, index) => (
                  <Grid key={index}>
                    <EquipmentCard {...equipment} />
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
                <Button variant="outlined" sx={{ mt: 1 }}>
                  Ver mais
                </Button>
              </Box>
            </RoomCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

type RoomCardProps = {
  title: string;
};

const RoomCard: React.FC<RoomCardProps> = ({ title, children }) => {
  return (
    <Card sx={{ p: 1 }}>
      <Typography variant="h6">{title}</Typography>
      {children}
    </Card>
  );
};

type EquipmentCardProps = BmsEquipment;

const EquipmentCard: React.FC<EquipmentCardProps> = ({ ...props }) => {
  const { name, status, groups } = props;

  const energy = groups.filter((group) => group.name === "Energia")[0];

  return (
    <Card sx={{ p: 4, m: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">{name}</Typography>
        <Typography
          sx={{ color: status === EEquipmentStatus.ONLINE ? "green" : "red" }}
        >
          {status === EEquipmentStatus.ONLINE ? "Online" : "Offline"}
        </Typography>
      </Box>

      {energy.informations.map((information, index) => (
        <BmsIndicator key={index} {...information} status={status} />
      ))}
    </Card>
  );
};

export default Etc;
