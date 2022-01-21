import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PageTitle from "app/components/PageTitle";
import EtcFilters from "../components/EtcFilters";
import BuildingDropdown from "../components/BuildingDropdown";
import FloorDropdown from "../components/FloorDropdown";
import Table from "app/hooks/useTable";

// icons
import AddIcon from "@mui/icons-material/Add";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";

import { automationManagement } from "app/data/automation-management";

const AutomationRegisterManagement: React.FC = () => {
  const columns = [
    {
      name: "name",
      label: "Componente",
      align: "left",
    },
    {
      name: "building",
      label: "Prédio",
      align: "right",
    },
    {
      name: "floor",
      label: "Andar",
      align: "right",
    },
    {
      name: "room",
      label: "Sala",
      align: "right",
    },
    {
      name: "status",
      label: "Status",
      align: "right",
    },
    {
      name: "alarms",
      label: "Alarmes",
      align: "right",
    },
    {
      name: "createdAt",
      label: "Data de criação",
      align: "right",
    },
  ];

  const energyData = automationManagement.filter(
    (area) => area.group === "Energia"
  )[0];
  const { equipments } = energyData;

  return (
    <Container maxWidth="xl">
      <Toolbar />
      <PageTitle>Cadastros de automação</PageTitle>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Typography variant="h6">Equipamentos de Energia</Typography>
        <EtcFilters />
      </Box>

      <Box sx={{ mt: 2, display: "flex", maxWidth: "480px" }}>
        <BuildingDropdown />
        <FloorDropdown sx={{ ml: 2 }} />
      </Box>

      <Divider sx={{ mt: 2 }} />

      <Box sx={{ display: "flex", mt: 2 }}>
        <Button
          variant="text"
          startIcon={<AddIcon />}
          component={RouterLink}
          to="/zeno/automation/management/equipment"
        >
          Novo equipamento
        </Button>
        <Button variant="text" startIcon={<CallSplitIcon />}>
          Nova conexão
        </Button>
        <Button variant="text" startIcon={<AccountBalanceIcon />}>
          Novo prédio
        </Button>
        <Button variant="text" startIcon={<StoreMallDirectoryIcon />}>
          Nova sala
        </Button>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Table columns={columns} rows={equipments} />
      </Box>
    </Container>
  );
};

export default AutomationRegisterManagement;
