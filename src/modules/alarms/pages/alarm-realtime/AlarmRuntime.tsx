import { useState } from "react";
import { AlarmTableViewModel } from "modules/automation/models/alarm-model";
import DataTable, {
  ColumnHeader,
} from "modules/shared/components/datatableV2/DataTable";
import HeroContainer from "modules/shared/components/HeroContainer";
import Loading from "modules/shared/components/Loading";
import getTimeStampFormat from "modules/utils/helpers/timestampFormat";
import { useModal } from "mui-modal-provider";
import AlarmAckModal from "./components/alarm-ack-modal/AlarmAckModal";
import Stack from "@mui/material/Stack";
import useAutomationRealtime from "modules/automation/data/hooks/useAutomationRealtime";
import {
  getAlarmStatusFromEnum,
  getAlarmStatusFromPriority,
  getAlarmTypeFromEnum,
} from "modules/alarms/utils/alarmUtils";
import AlarmIndicator from "modules/alarms/components/alarm-indicator/AlarmIndicator";
import AlarmGroupFilter from "modules/alarms/components/alarm-group-filter/AlarmGroupFilter";

// icones
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DetailsIcon from "@mui/icons-material/Details";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";

import DoneAllIcon from "@mui/icons-material/DoneAll";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CheckIcon from "@mui/icons-material/Check";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import useAlarmFilter from "./slices/useAlarmFilter";
import useAlarmFilter from "./reducer/useAlarmFilter";
import { useAuth } from "app/hooks/useAuth";
import useRouter from "modules/core/hooks/useRouter";

export default function AlarmRealtime() {
  const { currentUser } = useAuth();
  const [selectedAlarms, setSelectedAlarms] = useState<AlarmTableViewModel[]>(
    []
  );

  const { showModal } = useModal();
  const { alarms, publish, status, activeAlarms } = useAutomationRealtime();
  const { alarmFilters, filters, priorities } = useAlarmFilter(alarms);
  const { navigate } = useRouter();

  console.log(status);

  const handleOnAckSelection = () => {
    selectedAlarms.forEach((alarm) => {
      const data = {
        id: alarm.id,
        alarmRuleId: alarm.ruleId,
        operator: currentUser?.name,
      };
      publish("/alarms-recognized", JSON.stringify(data));
    });
  };

  const handleModalConfirmation = () => {
    if (status === "connected") {
      const modal = showModal(AlarmAckModal, {
        onConfirm: () => {
          handleOnAckSelection();
          modal.hide();
        },
        onCancel: () => {
          modal.hide();
        },
      });
    }
  };

  return (
    <HeroContainer title="Alarmes em tempo real">
      <Stack direction="row">
        <AlarmGroupFilter
          title="Tipo"
          alarmItems={[
            {
              legend: "Alarmes e eventos",
              icon: <NotificationsIcon />,
              selected: filters.alarmType.alarms_events,
              onClick: () => alarmFilters.toggleAlarmEventType(),
            },
            {
              legend: "Alarmes",
              icon: <NotificationsActiveIcon />,
              selected: filters.alarmType.alarms,
              onClick: () => alarmFilters.toggleAlarmType(),
            },
            {
              legend: "Eventos",
              icon: <NotificationsOffIcon />,
              selected: filters.alarmType.events,
              onClick: () => alarmFilters.toggleEventType(),
            },
          ]}
          color="rgba(0,98,189, 0.2)"
        />
        <AlarmGroupFilter
          title="Severidade"
          alarmItems={[
            {
              legend: "Severidade alta",
              icon: <WarningAmberIcon />,
              selected: filters.alarmPriority.high,
              onClick: () => priorities.toggleHighPriority(),
            },
            {
              legend: "Severidade média",
              icon: <DetailsIcon />,
              selected: filters.alarmPriority.medium,
              onClick: () => priorities.toggleMediumPriority(),
            },
            {
              legend: "Severidade baixa",
              icon: <ChangeHistoryIcon />,
              selected: filters.alarmPriority.low,
              onClick: () => priorities.toggleLowPriority(),
            },
          ]}
          color="rgba(0,98,189, 0.25)"
        />
        <AlarmGroupFilter
          title="Reconhecimento"
          alarmItems={[
            {
              legend: "Reconhecer todos",
              icon: <DoneAllIcon />,
              onClick: handleModalConfirmation,
              disabled: status === "offline",
            },
            {
              legend: "Reconhecer alarmes",
              icon: <CheckBoxOutlinedIcon />,
              disabled: status === "offline",
            },
            {
              legend: "Reconhecer eventos",
              icon: <CheckIcon />,
              disabled: status === "offline",
            },
          ]}
          color="rgba(0,98,189, 0.3)"
        />
        <AlarmGroupFilter
          title="Info"
          alarmItems={[
            {
              legend: "Informações",
              icon: <InfoOutlinedIcon />,
              onClick: () => navigate("/zeno/settings/user-help", {}),
            },
          ]}
          color="rgba(0,98,189, 0.35)"
        />
      </Stack>

      <DataTable
        title="Alarmes"
        columns={columns}
        rows={filters.filteredAlarms}
        options={{
          onSelectedItems: setSelectedAlarms,
        }}
        sx={{ mt: 2 }}
      />
      <Loading open={status === "loading"} />
    </HeroContainer>
  );
}

const columns: ColumnHeader[] = [
  {
    name: "priority",
    label: "Prioridade",
    renderComponent: (row) => (
      <AlarmIndicator status={getAlarmStatusFromPriority(row)} />
    ),
  },
  {
    name: "inDate",
    label: "Data",
    customFunction: (row) => getTimeStampFormat(row),
  },
  {
    name: "rule",
    label: "Alarme",
  },
  {
    name: "type",
    label: "Tipo",
    customFunction: getAlarmTypeFromEnum,
  },
  {
    name: "status",
    label: "Status",
    customFunction: getAlarmStatusFromEnum,
  },
  {
    name: "value",
    label: "Valor",
  },
  {
    name: "equipment",
    label: "Equipamento",
  },
  {
    name: "operator",
    label: "Operador",
  },
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
];
