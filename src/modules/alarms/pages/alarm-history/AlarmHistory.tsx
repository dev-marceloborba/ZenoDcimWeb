import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AlarmViewModel } from "modules/automation/models/alarm-model";
import HeroContainer from "modules/shared/components/HeroContainer";
import Row from "modules/shared/components/Row";
import addDaysToDate from "modules/utils/helpers/addDaysToDate";
import { useFindAllAlarmsMutation } from "modules/automation/services/alarm-service";
import DataTable, { ColumnHeader } from "modules/shared/components/DataTable";
import getTimeStampFormat from "modules/utils/helpers/timestampFormat";
import Loading from "modules/shared/components/Loading";

export default function AlarmHistory() {
  const [findAllAlarms, { data: alarms, isLoading }] =
    useFindAllAlarmsMutation();
  const [filters, setFilters] = useState<AlarmViewModel>({
    initialDate: addDaysToDate(new Date(), -7),
    finalDate: new Date(),
  });

  const handleChangeInitialDate = (date: Date | null) => {
    setFilters({ ...filters, initialDate: date });
  };

  const handleChangeFinalDate = (date: Date | null) => {
    setFilters({ ...filters, finalDate: date });
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
      </Row>
      <DataTable title="Alarmes" rows={alarms ?? []} columns={columns} />
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
    name: "recognizedDate",
    label: "Data de Reconhecimento",
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
