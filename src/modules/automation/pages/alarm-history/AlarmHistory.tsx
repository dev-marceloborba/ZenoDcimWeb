import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AlarmViewModel } from "modules/automation/models/alarm-model";
import HeroContainer from "modules/shared/components/HeroContainer";
import InDevelopMessage from "modules/shared/components/InDevelopMessage";
import Row from "modules/shared/components/Row";
import addDaysToDate from "modules/utils/helpers/addDaysToDate";
import { useState } from "react";
import AlarmTable from "./components/alarm-table/AlarmTable";

export default function AlarmHistory() {
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

  return (
    <HeroContainer title="Histórico de alarmes">
      <Row sx={{ mb: 2 }}>
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
      <AlarmTable
        initialDate={filters.initialDate!}
        finalDate={filters.finalDate!}
      />
      <InDevelopMessage />
    </HeroContainer>
  );
}
