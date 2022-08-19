import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { EquipmentParameterModel } from "modules/automation/models/automation-model";
import { useFindMeasuresByParameterMutation } from "modules/automation/services/history-service";
import DataTable, { ColumnHeader } from "modules/shared/components/DataTable";
import Loading from "modules/shared/components/Loading";
import Row from "modules/shared/components/Row";
import addDaysToDate from "modules/utils/helpers/addDaysToDate";
import getTimeStampFormat from "modules/utils/helpers/timestampFormat";
import { useEffect, useState } from "react";

type ParameterHistoryTableProps = {
  parameter: EquipmentParameterModel;
};

type FilterState = {
  initialDate: Date | null;
  finalDate: Date | null;
};

const ParameterHistoryTable: React.FC<ParameterHistoryTableProps> = ({
  parameter,
}) => {
  const [filter, setFilter] = useState<FilterState>({
    initialDate: new Date(),
    finalDate: addDaysToDate(new Date(), -1),
  });
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
        parameter: parameter.name,
        initialDate: new Date(),
        finalDate: new Date(),
      }).unwrap();
      console.log(result);
    }
    fetchMeasures();
  }, [findMeasuresByParameter, parameter.name]);

  return (
    <>
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

      <DataTable
        title={`Parâmetro - ${parameter.name}`}
        columns={columns}
        rows={[]}
      />
      <Loading open={isLoading} />
    </>
  );
};

export default ParameterHistoryTable;

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
