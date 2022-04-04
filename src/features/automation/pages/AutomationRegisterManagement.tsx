import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import PageTitle from "app/components/PageTitle";
import EtcFilters from "../components/EtcFilters";
import BuildingDropdown from "../components/BuildingDropdown";
import FloorDropdown from "../components/FloorDropdown";
import RoomDropdown from "../components/RoomDropdown";
import Table from "app/hooks/useTable";

// icons
import AddIcon from "@mui/icons-material/Add";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";

import HeroContainer from "app/components/HeroContainer";
import Row from "app/components/Row";
import AccessButton from "app/components/AccessButton";
import { useAutomationFilters } from "../components/AutomationFiltersProvider";
import { EquipmentData } from "app/data/automation-management";

const AutomationRegisterManagement: React.FC = () => {
  const { buildings, building, floor, room } = useAutomationFilters();
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

  const equipments =
    buildings
      ?.find((x) => x.id === building)
      ?.floors?.find((x) => x.id === floor)
      ?.rooms?.find((x) => x.id === room)?.equipments ?? [];

  console.log(equipments);

  return (
    <HeroContainer>
      <PageTitle>Cadastros de automação</PageTitle>
      <Row
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Typography variant="h6">Equipamentos de Energia</Typography>
        <EtcFilters />
      </Row>

      <Row sx={{ mt: 2, maxWidth: "480px" }}>
        <BuildingDropdown />
        <FloorDropdown sx={{ ml: 2 }} />
        <RoomDropdown sx={{ ml: 2 }} />
      </Row>

      <Divider sx={{ mt: 2 }} />

      <Row sx={{ mt: 2 }}>
        <Button
          variant="text"
          startIcon={<AddIcon />}
          component={RouterLink}
          to="/zeno/automation/management/equipment"
        >
          Novo equipamento
        </Button>
        <AccessButton
          startIcon={<CallSplitIcon />}
          label="Nova conexão"
          to="/zeno"
        />
        <AccessButton
          startIcon={<AccountBalanceIcon />}
          label="Novo prédio"
          to="/zeno/automation/management/building"
        />
        <AccessButton
          startIcon={<StoreMallDirectoryIcon />}
          label="Nova sala"
          to="/zeno/automation/management/building"
        />
      </Row>

      <Row sx={{ mt: 4 }}>
        <Table
          columns={columns}
          rows={equipments?.map<EquipmentData>((x) => ({
            building,
            floor,
            alarms: x.alarms,
            createdAt: new Date().toLocaleDateString(),
            room: room,
            status: x.status.toString(),
            name: x.component,
          }))}
        />
      </Row>
    </HeroContainer>
  );
};

export default AutomationRegisterManagement;
