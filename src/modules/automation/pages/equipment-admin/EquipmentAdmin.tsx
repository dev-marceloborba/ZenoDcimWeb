import React from "react";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import EtcFilters from "modules/automation/components/EtcFilters";
// import BuildingDropdown from "modules/automation/components/BuildingDropdown";
// import FloorDropdown from "modules/automation/components/FloorDropdown";
// import RoomDropdown from "modules/automation/components/RoomDropdown";

// icons
import AddIcon from "@mui/icons-material/Add";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import ParameterIcon from "@mui/icons-material/Thermostat";

import HeroContainer from "modules/shared/components/HeroContainer";
import Row from "modules/shared/components/Row";
import AccessButton from "modules/shared/components/AccessButton";

import compositePathRoute from "modules/utils/compositePathRoute";
import { HomePath } from "modules/paths";
import { AutomationPath } from "modules/home/routes/paths";
import { EquipmentFormPath } from "modules/automation/routes/paths";
import EquipmentTable from "./components/equipment-table/EquipmentTable";

const EquipmentAdmin: React.FC = () => {
  return (
    <HeroContainer title="Gestão de equipamentos">
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

      {/* <Row sx={{ mt: 2, maxWidth: "480px" }}>
        <BuildingDropdown />
        <FloorDropdown sx={{ ml: 2 }} />
        <RoomDropdown sx={{ ml: 2 }} />
      </Row> */}

      <Divider sx={{ mt: 2 }} />

      <Row sx={{ mt: 2 }}>
        <Tooltip title="Criar novo equipamento">
          <AccessButton
            startIcon={<AddIcon />}
            label="Novo equipamento"
            to={compositePathRoute([
              HomePath,
              AutomationPath,
              EquipmentFormPath,
            ])}
          />
        </Tooltip>

        <Tooltip title="Criar nova conexão">
          <AccessButton
            startIcon={<CallSplitIcon />}
            label="Nova conexão"
            to="/zeno"
          />
        </Tooltip>

        <Tooltip title="Associação com parâmetros">
          <AccessButton
            startIcon={<ParameterIcon />}
            label="Associar parâmetro"
            to="/zeno"
          />
        </Tooltip>
      </Row>

      <Row
        sx={{
          mt: 2,
          " & .MuiPaper-root": {
            width: "100%",
          },
        }}
      >
        <EquipmentTable />
      </Row>
    </HeroContainer>
  );
};

export default EquipmentAdmin;
