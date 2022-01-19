import React from "react";
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from "@mui/material/Container";
import Divider from '@mui/material/Divider'
import Toolbar from "@mui/material/Toolbar";
import Typography from '@mui/material/Typography';
import PageTitle from "app/components/PageTitle";
import EtcFilters from "../components/EtcFilters";
import BuildingDropdown from "../components/BuildingDropdown";
import FloorDropdown from "../components/FloorDropdown";


// icons
import AddIcon from '@mui/icons-material/Add';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';

const AutomationRegisterManagement: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Toolbar />
      <PageTitle>Cadastros de automação</PageTitle>
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <Typography variant="h6">Equipamentos de Energia</Typography>
        <EtcFilters />
      </Box>

      <Box sx={{mt: 2, maxWidth: '480px'}}>
        <BuildingDropdown />
        <FloorDropdown />
      </Box>

      <Divider />

      <Box sx={{display: 'flex'}}>
        <Button variant="text" startIcon={<AddIcon />}>Novo equipamento</Button>
        <Button variant="text" startIcon={<CallSplitIcon />}>Nova conexão</Button>
        <Button variant="text" startIcon={<AccountBalanceIcon />}>Novo prédio</Button>
        <Button variant="text" startIcon={<StoreMallDirectoryIcon />}>Nova sala</Button>
      </Box>


    </Container>
  );
};

export default AutomationRegisterManagement;
