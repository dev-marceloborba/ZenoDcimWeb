import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  AlarmFilterViewModel,
  AlarmViewModel,
} from "modules/automation/models/alarm-model";
import HeroContainer from "modules/shared/components/HeroContainer";
import addDaysToDate from "modules/utils/helpers/addDaysToDate";
import {
  useFindAlarmStatisticsMutation,
  useFindAllAlarmsMutation,
} from "modules/automation/services/alarm-service";
import DataTable, {
  ColumnHeader,
} from "modules/shared/components/datatableV2/DataTable";
import getTimeStampFormat from "modules/utils/helpers/timestampFormat";
import Loading from "modules/shared/components/Loading";
import AlarmIndicator, {
  AlarmStatus,
} from "modules/alarms/components/alarm-indicator/AlarmIndicator";
import Tabs from "modules/shared/components/tabs/Tabs";
// import AutoCompleteDropdown from "modules/shared/components/autocomplete-dropdown/AutocompleteDropdown";
import Dropdown from "modules/shared/components/dropdown/Dropdown";
import Grid from "@mui/material/Grid";
import { EAlarmPriority } from "modules/automation/models/alarm-rule-model";
import Stack from "@mui/material/Stack";
import { AlarmStatisticsViewModel } from "modules/alarms/models/alarm-statistics.model";
import KpiCard from "modules/shared/components/kpi-card/KpiCard";
import Typography from "@mui/material/Typography";
import AlarmLegend from "modules/alarms/components/alarm-legend/AlarmLegend";

export default function AlarmHistory() {
  return (
    <HeroContainer title="Histórico de alarmes">
      <Tabs
        mode="horizontal"
        tabLabels={["Histórico de alarmes", "Estatísticas"]}
        tabItems={[
          {
            element: <HistorianTab />,
          },
          {
            element: <StatisticsTab />,
          },
        ]}
      />
    </HeroContainer>
  );
}

const HistorianTab: React.FC = () => {
  const [findAllAlarms, { data: alarms, isLoading }] =
    useFindAllAlarmsMutation();
  const [filters, setFilters] = useState<AlarmFilterViewModel>({
    initialDate: addDaysToDate(new Date(), -7),
    finalDate: new Date(),
    priority: 4,
    type: 4,
  });

  const handleChangeDates = (
    date: Date | null | undefined,
    interval: keyof Pick<AlarmFilterViewModel, "initialDate" | "finalDate">
  ) => setFilters((prevState) => ({ ...prevState, [interval]: date }));

  const handleChangeFilters = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilters((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  useEffect(() => {
    async function fetchAlarms() {
      await findAllAlarms({
        initialDate: filters.initialDate,
        finalDate: filters.finalDate,
        priority: filters.priority,
        type: filters.type,
      }).unwrap();
    }
    fetchAlarms();
  }, [
    filters.finalDate,
    filters.initialDate,
    filters.priority,
    filters.type,
    findAllAlarms,
  ]);

  return (
    <div style={{ width: "100%" }}>
      <Stack direction="row" position="relative">
        <Grid
          container
          direction="row"
          columnSpacing={1}
          rowSpacing={1}
          width="80%"
        >
          <Grid item md={3}>
            <Dropdown
              name="priority"
              label="Prioridade"
              value={filters.priority}
              onChange={handleChangeFilters}
              items={[
                { value: 4, label: "Todas" },
                { value: 0, label: "Muito baixa" },
                { value: 1, label: "Baixa" },
                { value: 2, label: "Alta" },
                { value: 3, label: "Muito alta" },
              ]}
            />
          </Grid>
          <Grid item md={3}>
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
            />
          </Grid>
          <Grid item md={3}>
            <DateTimePicker
              label="Data inicial"
              value={filters.initialDate}
              onChange={() => {}}
              renderInput={(params) => <TextField {...params} fullWidth />}
              onAccept={(d) => handleChangeDates(d, "initialDate")}
            />
          </Grid>
          <Grid item md={3}>
            <DateTimePicker
              label="Data final"
              value={filters.finalDate}
              onChange={() => {}}
              renderInput={(params) => <TextField {...params} fullWidth />}
              onAccept={(d) => handleChangeDates(d, "finalDate")}
            />
          </Grid>
        </Grid>
        <div
          style={{
            top: -100,
            right: 40,
            position: "absolute",
            width: "200px",
          }}
        >
          <AlarmLegend />
        </div>
      </Stack>
      <DataTable
        title="Alarmes"
        rows={alarms ?? []}
        columns={columns}
        options={{
          userPreferenceTable: "alarmHistoryTable",
          selectionMode: "hide",
        }}
      />
      <Loading open={isLoading} />
    </div>
  );
};

function getAlarmStatusFromPriority(priority: EAlarmPriority): AlarmStatus {
  switch (priority) {
    case EAlarmPriority.HIGH:
      return "highSeverity";
    case EAlarmPriority.MEDIUM:
      return "mediumSeverity";
    case EAlarmPriority.LOW:
      return "lowSeverity";
  }
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
    name: "value",
    label: "Valor",
  },
  {
    name: "type",
    label: "Tipo",
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
  {
    name: "equipment",
    label: "Equipamento",
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
  //   label: "Data de Reconhecimento",
  //   customFunction: (row) => getTimeStampFormat(row),
  // },
  // {
  //   name: "status",
  //   label: "Status",
  //   customFunction: (row) => {
  //     switch (row) {
  //       case 1:
  //         return "Inativo";
  //       case 2:
  //         return "Ativo";
  //       case 3:
  //         return "Reconhecido";
  //     }
  //   },
  // },
];

const StatisticsTab: React.FC = () => {
  const [filter, setFilter] = useState<AlarmStatisticsViewModel>({
    initialDate: addDaysToDate(new Date(), -7),
    finalDate: new Date(),
  });
  const [findAlarmStatistics, { data: statistics, isLoading }] =
    useFindAlarmStatisticsMutation();

  const handleChangeDates = (
    date: Date | null | undefined,
    interval: keyof Pick<AlarmStatisticsViewModel, "initialDate" | "finalDate">
  ) => setFilter((prevState) => ({ ...prevState, [interval]: date }));

  useEffect(() => {
    async function fetchStatistics() {
      await findAlarmStatistics(filter).unwrap();
    }
    fetchStatistics();
  }, [filter, findAlarmStatistics]);

  return (
    <>
      <Grid container columnSpacing={1} rowSpacing={1}>
        <Grid item md={3}>
          <DateTimePicker
            label="Data inicial"
            value={filter.initialDate}
            onChange={(d) => handleChangeDates(d, "initialDate")}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </Grid>
        <Grid item md={3}>
          <DateTimePicker
            label="Data final"
            value={filter.finalDate}
            onChange={(d) => handleChangeDates(d, "finalDate")}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </Grid>
      </Grid>
      <Typography variant="h6" sx={{ my: 1 }}>
        Tempos
      </Typography>
      <Grid container columnSpacing={1} rowSpacing={1}>
        <Grid item md={4}>
          <KpiCard
            title="Tempo médio até reconhecimento"
            value={statistics?.averageAckTime ?? 0}
            unit="h"
          />
        </Grid>
        <Grid item md={4}>
          <KpiCard
            title="Maior tempo de reconhecimento"
            value={statistics?.maxAckTime ?? 0}
            unit="h"
          />
        </Grid>
        <Grid item md={4}>
          <KpiCard
            title="Menor tempo de reconhecimento"
            value={statistics?.minAckTime ?? 0}
            unit="h"
          />
        </Grid>
        <Grid item md={3}>
          <Typography variant="h6" sx={{ my: 1 }}>
            Geral
          </Typography>
          <KpiCard
            title="Alarmes não reconhecidos"
            value={statistics?.alarmsNotAcked ?? 0}
          />
        </Grid>
      </Grid>
      <Loading open={isLoading} />
    </>
  );
};
