import { useEffect } from "react";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Button from "@mui/material/Button";
import { useFindAllAlarmsMutation } from "modules/automation/services/alarm-service";
import DataTable, {
  ColumnHeader,
} from "modules/shared/components/datatable/DataTable";
import Loading from "modules/shared/components/Loading";
import getTimeStampFormat from "modules/utils/helpers/timestampFormat";
import { AlarmTableViewModel } from "modules/automation/models/alarm-model";
import { useMqttState } from "mqtt-react-hooks";

type AlarmTableProps = {
  initialDate: Date;
  finalDate: Date;
};

const AlarmTable: React.FC<AlarmTableProps> = ({ initialDate, finalDate }) => {
  const [findAllAlarms, { data: alarms, isLoading }] =
    useFindAllAlarmsMutation();
  const { client } = useMqttState();

  const handleOnAck = (alarm: AlarmTableViewModel) => {
    const data = {
      id: alarm.id,
      alarmRuleId: alarm.ruleId,
    };
    client?.publish("/alarms-recognized", JSON.stringify(data), {
      retain: false,
    });
  };

  useEffect(() => {
    async function fetchAlarms() {
      await findAllAlarms({ initialDate, finalDate }).unwrap();
    }
    fetchAlarms();
  }, [finalDate, findAllAlarms, initialDate]);

  return (
    <>
      <DataTable title="Alarmes" rows={alarms ?? []} columns={columns} />
      {/* <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Prédio</TableCell>
                <TableCell align="right">Andar</TableCell>
                <TableCell align="right">Sala</TableCell>
                <TableCell align="right">Equipamento</TableCell>
                <TableCell align="right">Parâmetro</TableCell>
                <TableCell align="right">Regra</TableCell>
                <TableCell align="right">Valor</TableCell>
                <TableCell align="right">Data de entrada</TableCell>
                <TableCell align="right">Data de saída</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Ação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alarms?.map((alarm, index) => (
                <TableRow key={index}>
                  <TableCell>{alarm.building}</TableCell>
                  <TableCell align="right">{alarm.floor}</TableCell>
                  <TableCell align="right">{alarm.room}</TableCell>
                  <TableCell align="right">{alarm.equipment}</TableCell>
                  <TableCell align="right">{alarm.parameter}</TableCell>
                  <TableCell align="right">{alarm.rule}</TableCell>
                  <TableCell align="right">{alarm.value}</TableCell>
                  <TableCell align="right">
                    {getTimeStampFormat(alarm.inDate.toISOString())}
                  </TableCell>
                  <TableCell align="right">
                    {getTimeStampFormat(alarm.outDate.toISOString())}
                  </TableCell>
                  <TableCell align="right">
                    {alarm.acked ? "Reconhecido" : "Não reconhecido"}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => handleOnAck(alarm)}
                      variant="outlined"
                    >
                      Reconhecer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card> */}
      <Loading open={isLoading} />
    </>
  );
};

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

export default AlarmTable;
