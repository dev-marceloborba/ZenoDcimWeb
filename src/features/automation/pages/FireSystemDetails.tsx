import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import PageTitle from "app/components/PageTitle";
import BuildingDropdown from "../components/BuildingDropdown";
import FloorDropdown from "../components/FloorDropdown";
import Typography from "@mui/material/Typography";
import BmsIndicator from "app/components/BmsIndicator";
import Table from 'app/hooks/useTable'
import { EEquipmentStatus, EParameterStatus } from "app/types/bms";
import { fireSystem} from 'app/data/fire-system'

const FireSystemDetails: React.FC = () => {
  const { events } = fireSystem
  const columns = [
    {
      label: 'Equipamento',
      name: 'equipment',
      align: 'left'
    },
    {
      label: 'Evento',
      name: 'event',
      align: 'right'
    },
    {
      label: 'Severidade',
      name: 'priority',
      align: 'right'
    },
    {
      label: 'Data',
      name: 'date',
      align: 'right'
    },
  ]
  return (
    <Container maxWidth="xl">
      <Toolbar />
      <PageTitle>Incêndio - Eventos</PageTitle>

      <Box sx={{ display: "flex", mt: 2, maxWidth: 480 }}>
        <BuildingDropdown />
        <FloorDropdown sx={{ ml: 1, mr: 1 }} />
      </Box>

      <Card sx={{ p: 2, mt: 2 }}>
        <Typography variant="h5">Laço 1</Typography>
        <Box sx={{ display: "flex", justifyContent: 'space-between' }}>
          <Box sx={{width: '220px'}}>
            <BmsIndicator
              status={EEquipmentStatus.ONLINE}
              parameterStatus={EParameterStatus.NORMAL}
              description="Detector de fumaça 1"
            />
            <BmsIndicator
              status={EEquipmentStatus.ONLINE}
              parameterStatus={EParameterStatus.NORMAL}
              description="Detector de fumaça 1"
            />
            <BmsIndicator
              status={EEquipmentStatus.ONLINE}
              parameterStatus={EParameterStatus.NORMAL}
              description="Detector de fumaça 1"
            />
            <BmsIndicator
              status={EEquipmentStatus.ONLINE}
              parameterStatus={EParameterStatus.NORMAL}
              description="Detector de fumaça 1"
            />
            <BmsIndicator
              status={EEquipmentStatus.ONLINE}
              parameterStatus={EParameterStatus.NORMAL}
              description="Detector de fumaça 1"
            />
            <BmsIndicator
              status={EEquipmentStatus.ONLINE}
              parameterStatus={EParameterStatus.NORMAL}
              description="Detector de fumaça 1"
            />
            <BmsIndicator
              status={EEquipmentStatus.ONLINE}
              parameterStatus={EParameterStatus.NORMAL}
              description="Detector de fumaça 1"
            />
            <BmsIndicator
              status={EEquipmentStatus.ONLINE}
              parameterStatus={EParameterStatus.NORMAL}
              description="Detector de fumaça 1"
            />
          </Box>
          <Box sx={{ml: 0, width: '80%'}}>
            <Table columns={columns} rows={events} />
          </Box>
        </Box>
      </Card>
    </Container>
  );
};

export default FireSystemDetails;
