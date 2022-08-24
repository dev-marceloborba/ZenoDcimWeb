import { useFindAllAlarmsMutation } from "modules/automation/services/alarm-service";
import DataTable, { ColumnHeader } from "modules/shared/components/DataTable";
import Loading from "modules/shared/components/Loading";
import getTimeStampFormat from "modules/utils/helpers/timestampFormat";
import { useEffect } from "react";

type AlarmTableProps = {
  initialDate: Date;
  finalDate: Date;
};

const AlarmTable: React.FC<AlarmTableProps> = ({ initialDate, finalDate }) => {
  const [findAllAlarms, { data: alarms, isLoading }] =
    useFindAllAlarmsMutation();

  useEffect(() => {
    async function fetchAlarms() {
      await findAllAlarms({ initialDate, finalDate }).unwrap();
    }
    fetchAlarms();
  }, [finalDate, findAllAlarms, initialDate]);

  console.log(alarms);

  return (
    <>
      <DataTable title="Alarmes" rows={rows} columns={columns} />
      <Loading open={isLoading} />
    </>
  );
};

type AlarmData = {
  building: string;
  floor: string;
  room: string;
  equipment: string;
  parameter: string;
  value: number;
  rule: string;
  inDate: Date;
  outDate: Date;
  acked: boolean;
};

const rows: Array<AlarmData> = [
  {
    building: "Data Hall 1",
    floor: "Andar 1",
    room: "Transformador A",
    equipment: "Disjuntor 1",
    parameter: "Tensão",
    value: 1200,
    rule: "Tensão muito alta",
    inDate: new Date(),
    outDate: new Date(),
    acked: false,
  },
  //   {
  //     building: "Data Hall 1",
  //     floor: "Andar 1",
  //     room: "Transformador A",
  //     equipment: "Disjuntor 1",
  //     parameter: "Corrente",
  //     value: 400,
  //     rule: "Corrente muito alta",
  //     inDate: new Date().toLocaleDateString(),
  //     outDate: new Date().toLocaleDateString(),
  //     acked: true,
  //   },
];

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
    name: "acked",
    label: "Reconhecido",
    customFunction: (row) => (row ? "Reconhecido" : "Não reconhecido"),
  },
];

export default AlarmTable;
