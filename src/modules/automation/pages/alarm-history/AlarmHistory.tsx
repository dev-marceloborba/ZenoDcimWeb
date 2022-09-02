import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  AlarmTableViewModel,
  AlarmViewModel,
} from "modules/automation/models/alarm-model";
import HeroContainer from "modules/shared/components/HeroContainer";
import Row from "modules/shared/components/Row";
import addDaysToDate from "modules/utils/helpers/addDaysToDate";
import Tooltip from "@mui/material/Tooltip";
// import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useFindAllAlarmsMutation } from "modules/automation/services/alarm-service";
import { useMqttState } from "mqtt-react-hooks";
import DataTable, { ColumnHeader } from "modules/shared/components/DataTable";
import getTimeStampFormat from "modules/utils/helpers/timestampFormat";
import Loading from "modules/shared/components/Loading";
import { useModal } from "mui-modal-provider";
import AlarmAckModal from "./components/alarm-ack-modal/AlarmAckModal";

export default function AlarmHistory() {
  const [findAllAlarms, { data: alarms, isLoading }] =
    useFindAllAlarmsMutation();
  const [filters, setFilters] = useState<AlarmViewModel>({
    initialDate: addDaysToDate(new Date(), -7),
    finalDate: new Date(),
  });
  const [selectedAlarms, setSelectedAlarms] = useState<AlarmTableViewModel[]>(
    []
  );
  const { client } = useMqttState();
  const { showModal } = useModal();

  const handleChangeInitialDate = (date: Date | null) => {
    setFilters({ ...filters, initialDate: date });
  };

  const handleChangeFinalDate = (date: Date | null) => {
    setFilters({ ...filters, finalDate: date });
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

  const handleOnAckSelection = () => {
    selectedAlarms.forEach((alarm) => {
      const data = {
        id: alarm.id,
        parameterId: alarm.parameterId,
        alarmRuleId: alarm.ruleId,
      };
      client?.publish("/alarms-recognized", JSON.stringify(data), {
        retain: false,
      });
    });
  };

  useEffect(() => {
    async function fetchAlarms() {
      await findAllAlarms({
        initialDate: filters.initialDate,
        finalDate: filters.finalDate,
      }).unwrap();
    }
    fetchAlarms();
  }, [filters.finalDate, filters.initialDate, findAllAlarms]);

  return (
    <HeroContainer title="Histórico de alarmes">
      <Row sx={{ mb: 2 }} justifyContent="space-between">
        <div>
          <DateTimePicker
            label="Data inicial"
            value={filters.initialDate}
            onChange={() => {}}
            renderInput={(params) => <TextField {...params} />}
            onAccept={handleChangeInitialDate}
          />
          <DateTimePicker
            label="Data final"
            value={filters.finalDate}
            onChange={() => {}}
            renderInput={(params) => <TextField sx={{ ml: 2 }} {...params} />}
            onAccept={handleChangeFinalDate}
          />
        </div>

        <div style={{ marginLeft: "auto" }}>
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
        </div>
      </Row>
      <DataTable
        title="Alarmes"
        rows={alarms ?? []}
        columns={columns}
        options={{
          onSelectedItems: (items) => setSelectedAlarms(items),
        }}
      />
      <Loading open={isLoading} />
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
