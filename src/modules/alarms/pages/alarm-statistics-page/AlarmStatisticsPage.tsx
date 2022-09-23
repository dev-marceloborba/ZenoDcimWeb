import HeroContainer from "modules/shared/components/HeroContainer";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import KpiCard from "modules/shared/components/kpi-card/KpiCard";
import EquipmentAlarmsChart from "./components/equipment-alarms-chart/EquipmentAlarmsChart";
import Row from "modules/shared/components/Row";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useFindAlarmStatisticsMutation } from "modules/automation/services/alarm-service";
import Loading from "modules/shared/components/Loading";
import { useEffect, useState } from "react";
import { AlarmStatisticsViewModel } from "modules/alarms/models/alarm-statistics.model";
import addDaysToDate from "modules/utils/helpers/addDaysToDate";

export default function AlarmStatisticPage() {
  const [filter, setFilter] = useState<AlarmStatisticsViewModel>({
    initialDate: addDaysToDate(new Date(), -7),
    finalDate: new Date(),
  });
  const [findAlarmStatistics, { data: statistics, isLoading }] =
    useFindAlarmStatisticsMutation();

  const handleChangeInitialDate = (date: Date | null) => {
    if (date) {
      setFilter((old) => ({ ...old, initialDate: date }));
    }
  };

  const handleChangeFinalDate = (date: Date | null) => {
    if (date) {
      setFilter((old) => ({ ...old, finalDate: date }));
    }
  };

  useEffect(() => {
    async function fetchStatistics() {
      await findAlarmStatistics(filter).unwrap();
    }
    fetchStatistics();
  }, [filter, findAlarmStatistics]);

  console.log(statistics);

  return (
    <HeroContainer title="Estatísticas de alarmes">
      <Row>
        <DateTimePicker
          label="Data inicial"
          value={filter.initialDate}
          onChange={handleChangeInitialDate}
          renderInput={(params) => <TextField {...params} />}
        />
        <DateTimePicker
          label="Data final"
          value={filter.finalDate}
          onChange={handleChangeFinalDate}
          renderInput={(params) => <TextField {...params} sx={{ ml: 1 }} />}
        />
      </Row>
      <Grid container columnSpacing={1} rowSpacing={1} sx={{ mt: 1 }}>
        <Grid item md={6}>
          <EquipmentAlarmsChart
            equipments={statistics?.categories.map((v) => v.pathname) ?? []}
            values={statistics?.categories.map((v) => v.total) ?? []}
          />
        </Grid>

        <Grid item md={6}>
          <Grid
            container
            columnSpacing={1}
            rowSpacing={1}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <KpiCard
                title="Tempo médio até reconhecimento"
                value={statistics?.averageAckTime ?? 0}
                unit="h"
              />
            </Grid>
            <Grid item>
              <KpiCard
                title="Maior tempo de reconhecimento"
                value={statistics?.maxAckTime ?? 0}
                unit="h"
              />
            </Grid>
            <Grid item>
              <KpiCard
                title="Menor tempo de reconhecimento"
                value={statistics?.minAckTime ?? 0}
                unit="h"
              />
            </Grid>
            <Grid item>
              <KpiCard
                title="Alarmes não reconhecidos"
                value={statistics?.alarmsNotAcked ?? 0}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Loading open={isLoading} />
    </HeroContainer>
  );
}
