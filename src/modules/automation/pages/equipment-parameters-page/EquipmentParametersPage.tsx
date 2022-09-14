import { useEffect } from "react";
import HeroContainer from "modules/shared/components/HeroContainer";
import Grid from "@mui/material/Grid";
import useRouter from "modules/core/hooks/useRouter";
import { useFindEquipmentParametersByEquipmentIdMutation } from "modules/automation/services/equipment-parameter-service";
import ParameterCard from "./components/ParameterCard";
import Loading from "modules/shared/components/Loading";
import useAutomationRealtime from "modules/automation/data/hooks/useAutomationRealtime";

export default function EquipmentParametersPage() {
  const {
    state: { data: equipment },
  } = useRouter();
  const [findEquipmentParameters, { data: parameters, isLoading }] =
    useFindEquipmentParametersByEquipmentIdMutation();
  const { getRealtimeValue, status } = useAutomationRealtime();

  useEffect(() => {
    async function fetchParameters() {
      if (equipment.id) {
        await findEquipmentParameters(equipment.id).unwrap();
      }
    }
    fetchParameters();
  }, [equipment.id, findEquipmentParameters]);

  return (
    <HeroContainer title="Detalhes equipamento">
      <Grid container columnSpacing={1}>
        <Grid item md={4}>
          <ParameterCard
            title="Energia"
            parameters={
              parameters?.map((parameter) => {
                return {
                  alarms: 0,
                  description: parameter.name,
                  parameter: parameter.name,
                  status: 0,
                  unit: parameter.unit,
                  value: getRealtimeValue(parameter.pathname!),
                  pathname: (
                    "Canoas 1*" +
                    parameter.equipment.building?.name +
                    "*" +
                    parameter.equipment.floor?.name +
                    "*" +
                    parameter.equipment.room?.name +
                    "*" +
                    parameter.equipment.component +
                    "*" +
                    parameter.name
                  ).replaceAll(" ", "_"),
                };
              }) ?? []
            }
          />
        </Grid>
        <Grid item md={4}></Grid>
        <Grid item md={4}></Grid>
      </Grid>
      <Loading open={isLoading || status === "loading"} />
    </HeroContainer>
  );
}
