import Modal, { ModalProps } from "modules/shared/components/modal/Modal";
import CloseButton from "modules/shared/components/close-button/CloseButton";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";

type Parameter = {
  id: string;
  label: string;
};

type Card3ParametersSettingsProps = {
  id: string;
  name: string;
  onSave(state: NullableParameters, id: string): void;
  data: {
    parameters: Parameter[];
    parameter1: {
      parameter: ParameterState | null;
      equipmentId: string | null;
      parameterId: string | null;
    };
    parameter2: {
      parameter: ParameterState | null;
      equipmentId: string | null;
      parameterId: string | null;
    };
    parameter3: {
      parameter: ParameterState | null;
      equipmentId: string | null;
      parameterId: string | null;
    };
  };
} & ModalProps;

type ParameterState = {
  description: string;
  value: number;
  enabled: boolean;
  equipmentParameterId: string;
};

type Parameters = {
  parameter1: ParameterState;
  parameter2: ParameterState;
  parameter3: ParameterState;
};

type NullableParameters = {
  parameter1: ParameterState | null;
  parameter2: ParameterState | null;
  parameter3: ParameterState | null;
};

const loadInitialState = (
  parameter: ParameterState | null,
  parameterNumber: number
): ParameterState => {
  return {
    description:
      parameter?.description ?? `Parâmetro ${parameterNumber} não configurado`,
    value: 0,
    enabled: parameter?.enabled ?? false,
    equipmentParameterId: parameter?.equipmentParameterId ?? "",
  };
};

export default function Card3ParameterEquipmentSettings(
  props: Card3ParametersSettingsProps
) {
  const { data, id, name, onSave } = props;
  const [state, setState] = useState<Parameters>({
    parameter1: loadInitialState(data.parameter1.parameter, 1),
    parameter2: loadInitialState(data.parameter2.parameter, 2),
    parameter3: loadInitialState(data.parameter3.parameter, 3),
  });
  const handleAllowInformation = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setState((oldState) => ({
      ...oldState,
      [event.target.name]: {
        ...oldState[event.target.name as keyof Parameters],
        enabled: checked,
      },
    }));
  };
  const handleChangeInformation = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState((oldState) => ({
      ...oldState,
      [event.target.name]: {
        ...oldState[event.target.name as keyof Parameters],
        description: event.target.value,
      },
    }));
  };
  const onParameterSelection = (
    parameter: keyof Parameters,
    id: string,
    description: string
  ) => {
    setState((oldState) => ({
      ...oldState,
      [parameter]: {
        ...oldState[parameter],
        description,
        equipmentParameterId: id,
      },
    }));
  };
  const handleOnSave = () => {
    const parametersToSave = {} as NullableParameters;
    parametersToSave.parameter1 = state.parameter1.equipmentParameterId
      ? state.parameter1
      : null;
    parametersToSave.parameter2 = state.parameter2.equipmentParameterId
      ? state.parameter2
      : null;
    parametersToSave.parameter3 = state.parameter3.equipmentParameterId
      ? state.parameter3
      : null;
    onSave(parametersToSave, id);
  };

  return (
    <Modal {...props}>
      {/* <Paper sx={{ padding: 1, width: "100%" }}> */}
      <Grid
        container
        columnSpacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item md={6}>
          <InformationSection
            title="Informação 1"
            parameter={{
              name: "parameter1",
              description: state.parameter1.description,
              enabled: state.parameter1.enabled,
            }}
            parameters={data.parameters}
            handleAllowInformation={handleAllowInformation}
            handleChangeInformation={handleChangeInformation}
            handleParameterSelection={onParameterSelection}
            previousParameterId={data.parameter1.parameterId ?? ""}
          />

          <InformationSection
            title="Informação 2"
            parameter={{
              name: "parameter2",
              description: state.parameter2.description,
              enabled: state.parameter2.enabled,
            }}
            parameters={data.parameters}
            handleAllowInformation={handleAllowInformation}
            handleChangeInformation={handleChangeInformation}
            handleParameterSelection={onParameterSelection}
            previousParameterId={data.parameter2.parameterId ?? ""}
          />

          <InformationSection
            title="Informação 3"
            parameter={{
              name: "parameter3",
              description: state.parameter3.description,
              enabled: state.parameter3.enabled,
            }}
            parameters={data.parameters}
            handleAllowInformation={handleAllowInformation}
            handleChangeInformation={handleChangeInformation}
            handleParameterSelection={onParameterSelection}
            previousParameterId={data.parameter3.parameterId ?? ""}
          />
        </Grid>
        <Grid item md={6}>
          {/* <Card>
            <CardContent> */}
          <div
            style={{
              padding: "8px",
              border: "1px solid #fff",
              borderRadius: "8px",
            }}
          >
            <Typography variant="h4">{name}</Typography>
            <Stack direction="column">
              <List>
                <ParameterPreview parameter={state.parameter1} />
                <ParameterPreview parameter={state.parameter2} />
                <ParameterPreview parameter={state.parameter3} />
              </List>
            </Stack>
          </div>
          {/* </CardContent>
          </Card> */}
        </Grid>
      </Grid>
      <Stack direction="row" marginTop={1}>
        <Button variant="contained" onClick={handleOnSave}>
          Salvar
        </Button>
        {/* <Button
          variant="outlined"
          onClick={(e) => onClose!(e, "escapeKeyDown")}
          sx={{ marginLeft: 1 }}
        >
          Cancelar
        </Button> */}
      </Stack>
      {/* </Paper> */}
    </Modal>
  );
}

type InformationSectionProps = {
  title: string;
  parameters: Parameter[];
  parameter: {
    name: string;
    enabled: boolean;
    description: string;
  };
  handleAllowInformation(
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void;
  handleChangeInformation(event: React.ChangeEvent<HTMLInputElement>): void;
  handleParameterSelection(
    parameter: keyof Parameters,
    id: string,
    description: string
  ): void;
  previousParameterId?: string;
};

const InformationSection: React.FC<InformationSectionProps> = ({
  title,
  parameter,
  parameters,
  previousParameterId,
  handleAllowInformation,
  handleChangeInformation,
  handleParameterSelection,
  ...props
}) => {
  // const [parameterOptions, setParameterOptions] = useState<Parameter[]>([...parameters]);
  const [parameterValue, setParameterValue] = useState<Parameter | null>(
    parameters.find((p) => p.id === previousParameterId) ?? null
  );

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        marginTop={1}
        marginBottom={1}
      >
        <Typography>{title}</Typography>
        <Switch
          name={parameter.name}
          checked={parameter.enabled}
          onChange={handleAllowInformation}
          // sx={{ ml: 1 }}
        />
      </Stack>
      <Stack
        direction="column"
        sx={{
          " & .MuiAutocomplete-root, .MuiFormControl-root": {
            my: 0.4,
          },
        }}
      >
        <Autocomplete
          value={parameterValue}
          getOptionLabel={(option) => option.label}
          disabled={!parameter.enabled}
          options={parameters}
          renderInput={(params) => (
            <TextField {...params} name="parameter" label="Parâmetro" />
          )}
          onChange={(_, value, __) => {
            setParameterValue(value);
            handleParameterSelection(
              parameter.name as keyof Parameters,
              value?.id ?? "",
              value?.label ?? ""
            );
          }}
        />
        <TextField
          disabled={!parameter.enabled}
          name={parameter.name}
          label="Nome informação"
          onChange={handleChangeInformation}
          value={parameter.description}
        />
      </Stack>
    </>
  );
};

type ParameterPreviewProps = {
  parameter: {
    enabled: boolean;
    description: string;
    value: number;
  };
};

const ParameterPreview: React.FC<ParameterPreviewProps> = ({
  parameter,
  ...props
}) => {
  return (
    <li
      style={{
        color: parameter.enabled ? "white" : "#9d9999",
      }}
    >
      {`${parameter.description}: ${parameter.value}`}
    </li>
  );
};
