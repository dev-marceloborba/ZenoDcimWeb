import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
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
import AlarmIndicator from "modules/alarms/components/alarm-indicator/AlarmIndicator";
import Tabs from "modules/shared/components/tabs/Tabs";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { AlarmStatisticsViewModel } from "modules/alarms/models/alarm-statistics.model";
import KpiCard from "modules/shared/components/kpi-card/KpiCard";
import Typography from "@mui/material/Typography";
import { getAlarmStatusFromPriority } from "modules/alarms/utils/alarmUtils";
import EquipmentAlarmsChart from "modules/alarms/components/equipment-alarms-chart/EquipmentAlarmsChart";
import AlarmGroupFilter from "modules/alarms/components/alarm-group-filter/AlarmGroupFilter";

import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DetailsIcon from "@mui/icons-material/Details";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import useAlarmFilter from "../alarm-realtime/reducer/useAlarmFilter";
import useRouter from "modules/core/hooks/useRouter";

export default function AlarmHistory() {
  return (
    <HeroContainer title="Histórico de alarmes">
      <Tabs
        tabItems={[
          {
            title: "Histórico de alarmes",
            element: <HistorianTab />,
          },
          {
            title: "Estatísticas",
            element: <StatisticsTab />,
          },
        ]}
      />
    </HeroContainer>
  );
}

const HistorianTab: React.FC = () => {
  const { navigate } = useRouter();
  const [findAllAlarms, { data: alarms, isLoading }] =
    useFindAllAlarmsMutation();
  const { alarmFilters, filters, priorities, dates } = useAlarmFilter();

  useEffect(() => {
    async function fetchAlarms() {
      await findAllAlarms({
        initialDate: filters.date?.initial,
        finalDate: filters.date?.final,
        priority: filters.computedPriority,
        type: filters.computedType,
      }).unwrap();
    }
    fetchAlarms();
  }, [
    filters.computedPriority,
    filters.computedType,
    filters.date?.final,
    filters.date?.initial,
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
          <Grid item>
            <Stack direction="row">
              <AlarmGroupFilter
                title="Tipo"
                alarmItems={[
                  {
                    legend: "Alarmes e eventos",
                    icon: <NotificationsIcon />,
                    selected: filters.alarmType.alarms_events,
                    onClick: alarmFilters.toggleAlarmEventType,
                  },
                  {
                    legend: "Alarmes",
                    icon: <NotificationsActiveIcon />,
                    selected: filters.alarmType.alarms,
                    onClick: alarmFilters.toggleAlarmType,
                  },
                  {
                    legend: "Eventos",
                    icon: <NotificationsOffIcon />,
                    selected: filters.alarmType.events,
                    onClick: alarmFilters.toggleEventType,
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
                    onClick: priorities.toggleHighPriority,
                  },
                  {
                    legend: "Severidade média",
                    icon: <DetailsIcon />,
                    selected: filters.alarmPriority.medium,
                    onClick: priorities.toggleMediumPriority,
                  },
                  {
                    legend: "Severidade baixa",
                    icon: <ChangeHistoryIcon />,
                    selected: filters.alarmPriority.low,
                    onClick: priorities.toggleLowPriority,
                  },
                ]}
                color="rgba(0,98,189, 0.25)"
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
          </Grid>
          <Grid item md={3}>
            <DateTimePicker
              label="Data inicial"
              value={filters.date?.initial}
              onChange={() => {}}
              renderInput={(params) => <TextField {...params} fullWidth />}
              onAccept={dates.setInitialDate}
            />
          </Grid>
          <Grid item md={3}>
            <DateTimePicker
              label="Data final"
              value={filters.date?.final}
              onChange={() => {}}
              renderInput={(params) => <TextField {...params} fullWidth />}
              onAccept={dates.setFinalDate}
            />
          </Grid>
        </Grid>
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
      <Stack marginTop={1}>
        <EquipmentAlarmsChart
          equipments={
            statistics?.categories.map(({ pathname }) => {
              return pathname.replaceAll("_", " ").replaceAll("*", "-");
            }) ?? []
          }
          values={statistics?.categories.map((v) => v.total) ?? []}
        />
      </Stack>
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
