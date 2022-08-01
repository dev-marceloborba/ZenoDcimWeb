import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import EtcFilters from "modules/automation/components/EtcFilters";

// icons
import AddIcon from "@mui/icons-material/Add";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import ParameterIcon from "@mui/icons-material/Thermostat";

import HeroContainer from "modules/shared/components/HeroContainer";
import Row from "modules/shared/components/Row";
// import AccessButton from "modules/shared/components/AccessButton";

import compositePathRoute from "modules/utils/compositePathRoute";
import { HomePath } from "modules/paths";
import { AutomationPath } from "modules/home/routes/paths";
import {
  EquipmentFormPath,
  EquipmentParametersAssociationPath,
  EquipmentRulesPath,
} from "modules/automation/routes/paths";
import EquipmentTable from "./components/equipment-table/EquipmentTable";
import { EquipmentParameterModel } from "modules/automation/models/automation-model";
import AccessButton from "modules/shared/components/access-button/AccessButtonv2";
import useRouter from "modules/core/hooks/useRouter";

const EquipmentAdmin: React.FC = () => {
  const [selectedEquipment, setSelectedEquipment] =
    useState<EquipmentParameterModel | null>(null);
  const { navigate } = useRouter();
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
            label="Associar parâmetros"
            // to={compositePathRoute([
            //   HomePath,
            //   AutomationPath,
            //   EquipmentParametersAssociationPath,
            // ])}
            mode="regularButton"
            onClick={() => {
              if (selectedEquipment) {
                navigate(
                  compositePathRoute([
                    HomePath,
                    AutomationPath,
                    EquipmentParametersAssociationPath,
                  ]),
                  {
                    state: {
                      selectedEquipment,
                    },
                  }
                );
              }
            }}
          />
        </Tooltip>

        <Tooltip title="Regras de alarmes">
          <AccessButton
            label="Regras"
            mode="regularButton"
            onClick={() => {
              if (selectedEquipment) {
                navigate(
                  compositePathRoute([
                    HomePath,
                    AutomationPath,
                    EquipmentRulesPath,
                  ]),
                  {
                    state: {
                      data: selectedEquipment,
                    },
                  }
                );
              }
            }}
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
        <EquipmentTable
          handleSelectedEquipment={(equipment) =>
            setSelectedEquipment(equipment)
          }
        />
      </Row>
    </HeroContainer>
  );
};

export default EquipmentAdmin;
