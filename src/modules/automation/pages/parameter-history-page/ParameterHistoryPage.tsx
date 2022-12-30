import { useEffect, useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import useRouter from "modules/core/hooks/useRouter";
import DataTable, {
  ColumnHeader,
} from "modules/shared/components/datatable/DataTable";
import HeroContainer from "modules/shared/components/HeroContainer";
import Loading from "modules/shared/components/Loading";
import Row from "modules/shared/components/Row";
import addDaysToDate from "modules/utils/helpers/addDaysToDate";
import getTimeStampFormat from "modules/utils/helpers/timestampFormat";
import {
  useFindMeasuresByParameterMutation,
  useFindMeasureStatisticsMutation,
} from "modules/automation/services/history-service";
import ParameterChart from "./components/parameter-chart/ParameterChart";
import { useFindEquipmentParameterByIdQueryQuery } from "modules/automation/services/equipment-parameter-service";

type FilterState = {
  initialDate: Date | null;
  finalDate: Date | null;
};

export default function ParameterHistoryPage() {
  const [filter, setFilter] = useState<FilterState>({
    initialDate: addDaysToDate(new Date(), -7),
    finalDate: new Date(),
  });
  const { params } = useRouter();

  const [findMeasuresByParameter, { data: measures, isLoading }] =
    useFindMeasuresByParameterMutation();
  const [findStatistics, { data: statistics }] =
    useFindMeasureStatisticsMutation();

  const { data: parameter } = useFindEquipmentParameterByIdQueryQuery(
    params.equipmentParameterId!
  );

  const handleChangeInitialDate = (date: Date | null) => {
    setFilter({ ...filter, initialDate: date });
  };

  const handleChangeFinalDate = (date: Date | null) => {
    setFilter({ ...filter, finalDate: date });
  };

  useEffect(() => {
    async function fetchMeasures() {
      await findMeasuresByParameter({
        parameter: parameter?.name,
        initialDate: filter.initialDate,
        finalDate: filter.finalDate,
      }).unwrap();
    }
    fetchMeasures();
  }, [
    filter.finalDate,
    filter.initialDate,
    findMeasuresByParameter,
    parameter?.name,
  ]);

  useEffect(() => {
    async function fetchStatistcs() {
      await findStatistics({
        name: parameter?.name ?? "",
        initialDate: filter.initialDate,
        finalDate: filter.finalDate,
      });
    }
    fetchStatistcs();
  }, [filter.finalDate, filter.initialDate, findStatistics, parameter?.name]);

  console.log(statistics);

  return (
    <HeroContainer title="Histórico de parâmetro">
      <Row sx={{ mb: 2 }}>
        <DateTimePicker
          label="Data inicial"
          value={filter.initialDate}
          onChange={() => {}}
          renderInput={(params) => <TextField {...params} />}
          onAccept={handleChangeInitialDate}
        />
        <DateTimePicker
          label="Data final"
          value={filter.finalDate}
          onChange={() => {}}
          renderInput={(params) => <TextField {...params} sx={{ ml: 1 }} />}
          onAccept={handleChangeFinalDate}
        />
      </Row>
      <Grid container columnSpacing={1}>
        <Grid item md={6}>
          <DataTable
            title={parameter?.name ?? ""}
            rows={measures ?? []}
            columns={columns}
          />
        </Grid>
        <Grid item md={6}>
          <ParameterChart
            measures={measures ?? []}
            description={parameter?.name ?? ""}
          />
        </Grid>
      </Grid>
      <Loading open={isLoading} />
    </HeroContainer>
  );
}

const columns: ColumnHeader[] = [
  {
    name: "parameter",
    label: "Parâmetro",
  },
  {
    name: "value",
    label: "Valor",
  },
  {
    name: "timestamp",
    label: "Estampa de tempo",
    customFunction: (row) => getTimeStampFormat(row),
  },
];
