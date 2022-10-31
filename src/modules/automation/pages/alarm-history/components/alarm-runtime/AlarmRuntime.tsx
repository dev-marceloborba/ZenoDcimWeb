import { useState } from "react";
import { AlarmTableViewModel } from "modules/automation/models/alarm-model";
import DataTable, {
  ColumnHeader,
} from "modules/shared/components/datatable/DataTable";
import HeroContainer from "modules/shared/components/HeroContainer";
import Loading from "modules/shared/components/Loading";
import getTimeStampFormat from "modules/utils/helpers/timestampFormat";
import { useModal } from "mui-modal-provider";
import AlarmAckModal from "../alarm-ack-modal/AlarmAckModal";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsIcon from "@mui/icons-material/Notifications";
import useAutomationRealtime from "modules/automation/data/hooks/useAutomationRealtime";

export default function AlarmRuntime() {
  const [selectedAlarms, setSelectedAlarms] = useState<AlarmTableViewModel[]>(
    []
  );
  const { showModal } = useModal();
  const { alarms, publish, status, activeAlarms } = useAutomationRealtime();

  const handleOnAckSelection = () => {
    selectedAlarms.forEach((alarm) => {
      const data = {
        id: alarm.id,
        alarmRuleId: alarm.ruleId,
      };
      publish("/alarms-recognized", JSON.stringify(data));
    });
  };

  const handleModalConfirmation = () => {
    const modal = showModal(AlarmAckModal, {
      onConfirm: () => {
        handleOnAckSelection();
        modal.hide();
      },
      onCancel: () => {
        modal.hide();
      },
    });
  };

  return (
    <HeroContainer title="Alarmes em tempo real">
      <div>
        <p>Alarmes ativos</p>
        <span>{activeAlarms}</span>
      </div>
      <Tooltip title="Reconhecer seleção">
        <IconButton
          disabled={selectedAlarms?.length < 1}
          onClick={() => handleModalConfirmation()}
        >
          <NotificationsIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Reconhecer todos">
        <IconButton>
          <NotificationsActiveIcon />
        </IconButton>
      </Tooltip>
      <DataTable
        title="Alarmes"
        columns={columns}
        rows={alarms}
        options={{
          onSelectedItems: setSelectedAlarms,
        }}
      />
      <Loading open={status === "loading"} />
    </HeroContainer>
  );
}

const columns: ColumnHeader[] = [
  {
    name: "building",
    label: "Prédio",
  },
  {
    name: "floor",
    label: "Andar",
  },
  {
    name: "room",
    label: "Sala",
  },
  {
    name: "equipment",
    label: "Equipamento",
  },
  {
    name: "parameter",
    label: "Parâmetro",
  },
  {
    name: "value",
    label: "Valor",
  },
  {
    name: "rule",
    label: "Regra",
  },
  {
    name: "inDate",
    label: "Data de entrada",
    customFunction: (row) => getTimeStampFormat(row),
  },
  {
    name: "outDate",
    label: "Data de saída",
    customFunction: (row) => getTimeStampFormat(row),
  },
  {
    name: "status",
    label: "Status",
    customFunction: (row) => {
      switch (row) {
        case 1:
          return "Inativo";
        case 2:
          return "Ativo";
        case 3:
          return "Reconhecido";
      }
    },
  },
];
