import { useState } from "react";
import {
  AlarmTableViewModel,
  EAlarmType,
} from "modules/automation/models/alarm-model";
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
import AlarmLegend from "modules/alarms/components/alarm-legend/AlarmLegend";
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
import { EAlarmPriority } from "modules/automation/models/alarm-rule-model";
import useAlarmFilter from "./reducer/useAlarmFilter";
import { useAuth } from "app/hooks/useAuth";

export default function AlarmRealtime() {
  const { currentUser } = useAuth();
  const [selectedAlarms, setSelectedAlarms] = useState<AlarmTableViewModel[]>(
    []
  );
  // const [filteredAlarms, setFilteredAlarms] = useState<any[]>([]);
  const { showModal } = useModal();
  const { alarms, publish, status, activeAlarms } = useAutomationRealtime();
  const { changeAlarmType, filters, priorities } = useAlarmFilter(alarms);
  // const { changeAlarmPriority, changeAlarmType, filteredAlarms, filters } =
  //   useAlarmFilter(alarms);

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
              selected: filters.alarmType === 4,
              onClick: () => changeAlarmType(4),
            },
            {
              legend: "Alarmes",
              icon: <NotificationsActiveIcon />,
              selected: filters.alarmType === EAlarmType.ALARM,
              onClick: () => changeAlarmType(EAlarmType.ALARM),
            },
            {
              legend: "Eventos",
              icon: <NotificationsOffIcon />,
              selected: filters.alarmType === EAlarmType.EVENT,
              onClick: () => changeAlarmType(EAlarmType.EVENT),
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
              // selected: filters.alarmPriorityByGroup.high,
              // onClick: () => changeAlarmPriority(EAlarmPriority.HIGH),
            },
            {
              legend: "Severidade média",
              icon: <DetailsIcon />,
              selected: filters.alarmPriority.medium,
              onClick: () => priorities.toggleMediumPriority(),
              // selected: filters.alarmPriorityByGroup.medium,
              // onClick: () => changeAlarmPriority(EAlarmPriority.MEDIUM),
            },
            {
              legend: "Severidade baixa",
              icon: <ChangeHistoryIcon />,
              selected: filters.alarmPriority.low,
              onClick: () => priorities.toggleLowPriority(),
              // selected: filters.alarmPriorityByGroup.low,
              // onClick: () => changeAlarmPriority(EAlarmPriority.LOW),
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
            },
            {
              legend: "Reconhecer alarmes",
              icon: <CheckBoxOutlinedIcon />,
            },
            {
              legend: "Reconhecer eventos",
              icon: <CheckIcon />,
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
            },
          ]}
          color="rgba(0,98,189, 0.35)"
        />
      </Stack>
      {/* <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        position="relative"
      >
        <Stack direction="row" width={500} alignItems="center">
          <Dropdown
            name="priority"
            label="Prioridade"
            value={filters.priority}
            onChange={handleChangeFilters}
            items={[
              {
                value: 4,
                label: "Todas",
              },
              {
                value: 0,
                label: "Baixa",
              },
              {
                value: 1,
                label: "Média",
              },
              {
                value: 2,
                label: "Alta",
              },
            ]}
          />
          <Dropdown
            name="type"
            label="Tipo"
            value={filters.type}
            onChange={handleChangeFilters}
            items={[
              { value: 4, label: "Todos" },
              { value: 0, label: "Alarme" },
              { value: 1, label: "Evento" },
            ]}
            sx={{ ml: 1 }}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={handleModalConfirmation}
            sx={{ ml: 1 }}
          >
            Reconhecer alarmes
          </Button>
        </Stack>
        <div
          style={{
            position: "absolute",
            top: -70,
            right: 100,
          }}
        >
          <AlarmLegend />
        </div>
      </Stack> */}
      <DataTable
        title="Alarmes"
        columns={columns}
        rows={filters.filteredAlarms}
        // rows={filteredAlarms}
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
  // {
  //   name: "parameter",
  //   label: "Parâmetro",
  // },

  // {
  //   name: "outDate",
  //   label: "Data de saída",
  //   customFunction: (row) => getTimeStampFormat(row),
  // },
  // {
  //   name: "recognizedDate",
  //   label: "Data de reconhecimento",
  //   customFunction: (row) => getTimeStampFormat(row),
  // },
];
