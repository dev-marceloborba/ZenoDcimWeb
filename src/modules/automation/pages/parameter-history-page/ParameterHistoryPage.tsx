import { useEffect, useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import useRouter from "modules/core/hooks/useRouter";
import DataTable, { ColumnHeader } from "modules/shared/components/DataTable";
import HeroContainer from "modules/shared/components/HeroContainer";
import Loading from "modules/shared/components/Loading";
import Row from "modules/shared/components/Row";
import addDaysToDate from "modules/utils/helpers/addDaysToDate";
import getTimeStampFormat from "modules/utils/helpers/timestampFormat";
import { EquipmentParameterModel } from "modules/automation/models/automation-model";
import { MeasuresHistoryModel } from "modules/automation/models/measure-history-model";
import { useFindMeasuresByParameterMutation } from "modules/automation/services/history-service";
import ParameterChart from "./components/parameter-chart/ParameterChart";

type FilterState = {
  initialDate: Date | null;
  finalDate: Date | null;
};

export default function ParameterHistoryPage() {
  const [measures, setMeasures] = useState<MeasuresHistoryModel>([]);
  const [filter, setFilter] = useState<FilterState>({
    initialDate: addDaysToDate(new Date(), -7),
    finalDate: new Date(),
  });
  const {
    state: { data: equipmentParameter },
  }: {
    state: {
      data: any;
    };
  } = useRouter();
  console.log(equipmentParameter);
  const [findMeasuresByParameter, { isLoading }] =
    useFindMeasuresByParameterMutation();

  const handleChangeInitialDate = (date: Date | null) => {
    setFilter({ ...filter, initialDate: date });
  };

  const handleChangeFinalDate = (date: Date | null) => {
    setFilter({ ...filter, finalDate: date });
  };

  useEffect(() => {
    async function fetchMeasures() {
      const result = await findMeasuresByParameter({
        parameter: equipmentParameter.parameter,
        initialDate: filter.initialDate,
        finalDate: filter.finalDate,
      }).unwrap();
      setMeasures(result);
    }
    fetchMeasures();
  }, [
    equipmentParameter.parameter,
    filter.finalDate,
    filter.initialDate,
    findMeasuresByParameter,
  ]);

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
            title={equipmentParameter.description}
            rows={measures ?? []}
            columns={columns}
          />
        </Grid>
        <Grid item md={6}>
          <ParameterChart
            measures={measures ?? []}
            description={equipmentParameter.description}
          />
        </Grid>
      </Grid>
      <Loading open={isLoading} />
    </HeroContainer>
  );
}

const columns: ColumnHeader[] = [
  {
    name: "name",
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
