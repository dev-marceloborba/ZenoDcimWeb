import { useEffect, useState } from "react";
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
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsIcon from "@mui/icons-material/Notifications";
import useAutomationRealtime from "modules/automation/data/hooks/useAutomationRealtime";
import {
  getAlarmStatusFromEnum,
  getAlarmTypeFromEnum,
} from "modules/alarms/utils/alarmUtils";
import AlarmIndicator from "modules/alarms/components/alarm-indicator/AlarmIndicator";
import Dropdown from "modules/shared/components/dropdown/Dropdown";
import AlarmLegend from "modules/alarms/components/alarm-legend/AlarmLegend";

export default function AlarmRealtime() {
  const [selectedAlarms, setSelectedAlarms] = useState<AlarmTableViewModel[]>(
    []
  );
  const [filters, setFilters] = useState<AlarmFilters>({
    priority: 4,
    type: 4,
  });
  const [filteredAlarms, setFilteredAlarms] = useState<any[]>([]);
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

  const handleChangeFilters = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilters((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  console.log(alarms);

  useEffect(() => {
    if (filters.priority === 4 && filters.type === 4) {
      setFilteredAlarms(alarms);
    } else if (filters.priority === 4 && filters.type !== 4) {
      setFilteredAlarms(alarms.filter((x: any) => x.type === filters.type));
    } else if (filters.priority !== 4 && filters.type === 4) {
      setFilteredAlarms(
        alarms.filter((x: any) => x.priority === filters.priority)
      );
    } else {
      setFilteredAlarms(
        alarms.filter(
          (x) => x.type === filters.type && x.priority === filters.priority
        )
      );
    }
  }, [alarms, filters.priority, filters.type]);

  return (
    <HeroContainer title="Alarmes em tempo real">
      <Stack
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
      </Stack>

      {/* <div>
        <p>Alarmes ativos</p>
        <span>{activeAlarms}</span>
      </div> */}
      {/* <Tooltip title="Reconhecer seleção">
        <IconButton
          disabled={selectedAlarms?.length < 1}
          onClick={() => handleModalConfirmation()}
        >
          <NotificationsIcon />
        </IconButton>
      </Tooltip> */}

      {/* <Tooltip title="Reconhecer todos">
        <IconButton>
          <NotificationsActiveIcon />
        </IconButton>
      </Tooltip> */}
      <DataTable
        title="Alarmes"
        columns={columns}
        rows={filteredAlarms}
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
    renderComponent: (row) => <AlarmIndicator status="highSeverity" />,
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

type AlarmFilters = {
  priority: number;
  type: number;
};
