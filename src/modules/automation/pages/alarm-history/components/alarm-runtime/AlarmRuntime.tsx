import { AlarmTableViewModel } from "modules/automation/models/alarm-model";
import DataTable, { ColumnHeader } from "modules/shared/components/DataTable";
import HeroContainer from "modules/shared/components/HeroContainer";
import Loading from "modules/shared/components/Loading";
import getTimeStampFormat from "modules/utils/helpers/timestampFormat";
import { useMqttState, useSubscription } from "mqtt-react-hooks";
import { useModal } from "mui-modal-provider";
import { useEffect, useState } from "react";
import AlarmAckModal from "../alarm-ack-modal/AlarmAckModal";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function AlarmRuntime() {
  const [alarms, setAlarms] = useState<AlarmTableViewModel[]>([]);
  const [selectedAlarms, setSelectedAlarms] = useState<AlarmTableViewModel[]>(
    []
  );
  const { message } = useSubscription("/current-alarms");
  const { showModal } = useModal();
  const { client } = useMqttState();

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

  useEffect(() => {
    if (message?.message) {
      const payload = message.message.toString();
      const obj = JSON.parse(payload);
      console.log(obj);
      setAlarms(
        obj.map((alarm: any, index: number) => ({
          id: alarm.id,
          acked: false,
          building: "Data Hall 1",
          equipment: "Disjuntor 1",
          floor: "Andar 1",
          inDate: new Date(),
          outDate: new Date(),
          //   inDate: alarm?.inDate,
          //   outDate: alarm?.outDate,
          parameter: index === 0 ? "Corrente" : "Tensão",
          parameterId: "",
          room: "Transformador A",
          rule: alarm.name,
          ruleId: alarm.ruleId,
          status: alarm.status,
          value: alarm.value,
        }))
      );
    }
  }, [message, message?.message]);

  return (
    <HeroContainer title="Alarmes em tempo real">
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
        rows={alarms ?? []}
        options={{
          onSelectedItems: setSelectedAlarms,
        }}
      />
      <Loading open={alarms.length === 0} />
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
