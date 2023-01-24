import React from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import RemoveButton from "modules/shared/components/remove-button/RemoveButton";
import TextInput from "modules/shared/components/form-wrapper/text-input/TextInput";
import Checkbox from "modules/shared/components/form-wrapper/checkbox/Checkbox";
import DropdownInput from "modules/shared/components/form-wrapper/dropdown-input/DropdownInput";

type TriggerSettingCustomFormProps = {
  index: number;
  onRemove(index: number): void;
};

const TriggerSetting: React.FC<TriggerSettingCustomFormProps> = ({
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
            <TextInput name={`alarmRules.${index}.setpoint`} label="Valor" />
          </Grid>
          <Grid item md={3}>
            <DropdownInput
              name={`alarmRules.${index}.conditional`}
              label="Comparador"
              items={[
                {
                  label: "Igual",
                  value: 0,
                },
                {
                  label: "Maior",
                  value: 1,
                },
                {
                  label: "Maior ou igual",
                  value: 2,
                },
                {
                  label: "Menor",
                  value: 3,
                },
                {
                  label: "Menor ou igual",
                  value: 4,
                },
              ]}
            />
          </Grid>
          <Grid item md={3}>
            <DropdownInput
              name={`alarmRules.${index}.type`}
              label="Alarme/Evento"
              items={[
                {
                  label: "Alarme",
                  value: 0,
                },
                {
                  label: "Evento",
                  value: 1,
                },
              ]}
            />
          </Grid>
          <Grid item md={3}>
            <DropdownInput
              name={`alarmRules.${index}.priority`}
              label="Severidade"
              items={[
                {
                  label: "Muito baixa",
                  value: 0,
                },
                {
                  label: "Baixa",
                  value: 1,
                },
                {
                  label: "Alta",
                  value: 2,
                },
                {
                  label: "Muito alta",
                  value: 3,
                },
              ]}
            />
          </Grid>
          <Grid item md={12}>
            <TextInput
              name={`alarmRules.${index}.name`}
              label="Mensagem"
              multiline
              rows={2}
            />
          </Grid>
          <Grid item md={12}>
            <Checkbox
              name={`alarmRules.${index}.enableEmail`}
              label="Enviar e-mail"
            />
          </Grid>
          <Grid item md={12}>
            <Checkbox
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

export default TriggerSetting;
