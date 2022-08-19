import Grid from "@mui/material/Grid";
import { EquipmentParameterModel } from "modules/automation/models/automation-model";
import HeroContainer from "modules/shared/components/HeroContainer";
import ParameterChart from "../ParameterChart/ParameterChart";
import ParameterHistoryTable from "../ParameterHistoryTable/ParameterHistoryTable";

export default function ParameterDetails() {
  return (
    <HeroContainer title="Detalhes do parâmetro">
      <Grid container columnSpacing={1}>
        <Grid item md={6}>
          <ParameterHistoryTable parameter={{} as EquipmentParameterModel} />
        </Grid>
        <Grid item md={6}>
          <ParameterChart />
        </Grid>
      </Grid>
    </HeroContainer>
  );
}
