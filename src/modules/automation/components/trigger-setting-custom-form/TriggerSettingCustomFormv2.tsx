import React from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import RemoveButton from "modules/shared/components/remove-button/RemoveButton";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import ControlledCheckbox from "modules/shared/components/controlled-checkbox/ControlledCheckbox";

type TriggerSettingCustomFormProps = {
  index: number;
  onRemove(index: number): void;
};

const TriggerSettingv2: React.FC<TriggerSettingCustomFormProps> = ({
  index,
  onRemove,
}) => {
  return (
    <>
      <Typography>{`Trigger ${index + 1}`}</Typography>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        marginTop={1}
      >
        <Grid container columnSpacing={1} rowSpacing={1}>
          <Grid item md={3}>
            <ControlledTextInput
              name={`alarmRules.${index}.setpoint`}
              label="Valor"
            />
          </Grid>
          <Grid item md={3}>
            <ControlledTextInput
              name={`alarmRules.${index}.conditional`}
              label="Comparador"
              items={[
                {
                  description: "Igual",
                  value: 0,
                },
                {
                  description: "Maior",
                  value: 1,
                },
                {
                  description: "Maior ou igual",
                  value: 2,
                },
                {
                  description: "Menor",
                  value: 3,
                },
                {
                  description: "Menor ou igual",
                  value: 4,
                },
              ]}
            />
          </Grid>
          <Grid item md={3}>
            <ControlledTextInput
              name={`alarmRules.${index}.type`}
              label="Alarme/Evento"
              items={[
                {
                  description: "Alarme",
                  value: 0,
                },
                {
                  description: "Evento",
                  value: 1,
                },
              ]}
            />
          </Grid>
          <Grid item md={3}>
            <ControlledTextInput
              name={`alarmRules.${index}.priority`}
              label="Severidade"
              items={[
                {
                  description: "Muito baixa",
                  value: 0,
                },
                {
                  description: "Baixa",
                  value: 1,
                },
                {
                  description: "Alta",
                  value: 2,
                },
                {
                  description: "Muito alta",
                  value: 3,
                },
              ]}
            />
          </Grid>
          <Grid item md={12}>
            <ControlledTextInput
              name={`alarmRules.${index}.name`}
              label="Mensagem"
              multiline
              rows={2}
            />
          </Grid>
          <Grid item md={12}>
            <ControlledCheckbox
              name={`alarmRules.${index}.enableEmail`}
              label="Enviar e-mail"
            />
          </Grid>
          <Grid item md={12}>
            <ControlledCheckbox
              name={`alarmRules.${index}.enableNotification`}
              label="Enviar notificação"
            />
          </Grid>
        </Grid>
        <RemoveButton type="button" onClick={() => onRemove(index)} />
      </Stack>
      <Divider
        sx={{
          my: 0.4,
          borderColor: "#ccc",
        }}
      />
    </>
  );
};

export default TriggerSettingv2;
