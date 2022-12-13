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

type Equipment = {
  id: string;
  label: string;
};

type Parameter = {
  id: string;
  label: string;
};

type Card6ParametersSettingsProps = {
  id: string;
  equipmentName: string;
  equipments: Equipment[];
  parameters: Parameter[];
  onSave(state: Parameters, id: string): void;
} & ModalProps;

type ParameterState = {
  id: string;
  description: string;
  value: number;
  enabled: boolean;
};

type Parameters = {
  parameter1: ParameterState;
  parameter2: ParameterState;
  parameter3: ParameterState;
  parameter4: ParameterState;
  parameter5: ParameterState;
  parameter6: ParameterState;
};

const Card6ParametersSettings: React.FC<Card6ParametersSettingsProps> = ({
  id,
  equipmentName,
  equipments,
  parameters,
  onSave,
  onClose,
  ...props
}) => {
  const [state, setState] = useState<Parameters>({
    parameter1: {
      id: "",
      description: "Parâmetro 1 não configurado",
      value: 0,
      enabled: true,
    },
    parameter2: {
      id: "",
      description: "Parâmetro 2 não configurado",
      value: 0,
      enabled: true,
    },
    parameter3: {
      id: "",
      description: "Parâmetro 3 não configurado",
      value: 0,
      enabled: true,
    },
    parameter4: {
      id: "",
      description: "Parâmetro 4 não configurado",
      value: 0,
      enabled: true,
    },
    parameter5: {
      id: "",
      description: "Parâmetro 5 não configurado",
      value: 0,
      enabled: true,
    },
    parameter6: {
      id: "",
      description: "Parâmetro 6 não configurado",
      value: 0,
      enabled: true,
    },
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
        id,
      },
    }));
  };

  const handleOnSave = () => onSave(state, id);

  return (
    <Modal {...props}>
      {/* <Paper sx={{ padding: 1, width: "100%" }}> */}
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4">Configuração do Card</Typography>
        <CloseButton onClick={(e) => onClose!(e, "escapeKeyDown")} />
      </Stack>
      <Grid
        container
        columnSpacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item md={4}>
          <InformationSection
            equipments={equipments}
            parameters={parameters}
            title="Informação 1"
            parameter={{
              name: "parameter1",
              description: state.parameter1.description,
              enabled: state.parameter1.enabled,
            }}
            handleAllowInformation={handleAllowInformation}
            handleChangeInformation={handleChangeInformation}
            handleParameterSelection={onParameterSelection}
          />

          <InformationSection
            equipments={equipments}
            parameters={parameters}
            title="Informação 2"
            parameter={{
              name: "parameter2",
              description: state.parameter2.description,
              enabled: state.parameter2.enabled,
            }}
            handleAllowInformation={handleAllowInformation}
            handleChangeInformation={handleChangeInformation}
            handleParameterSelection={onParameterSelection}
          />

          <InformationSection
            equipments={equipments}
            parameters={parameters}
            title="Informação 3"
            parameter={{
              name: "parameter3",
              description: state.parameter3.description,
              enabled: state.parameter3.enabled,
            }}
            handleAllowInformation={handleAllowInformation}
            handleChangeInformation={handleChangeInformation}
            handleParameterSelection={onParameterSelection}
          />
        </Grid>
        <Grid item md={4}>
          <InformationSection
            equipments={equipments}
            parameters={parameters}
            title="Informação 4"
            parameter={{
              name: "parameter4",
              description: state.parameter4.description,
              enabled: state.parameter4.enabled,
            }}
            handleAllowInformation={handleAllowInformation}
            handleChangeInformation={handleChangeInformation}
            handleParameterSelection={onParameterSelection}
          />

          <InformationSection
            equipments={equipments}
            parameters={parameters}
            title="Informação 5"
            parameter={{
              name: "parameter5",
              description: state.parameter5.description,
              enabled: state.parameter5.enabled,
            }}
            handleAllowInformation={handleAllowInformation}
            handleChangeInformation={handleChangeInformation}
            handleParameterSelection={onParameterSelection}
          />

          <InformationSection
            equipments={equipments}
            parameters={parameters}
            title="Informação 6"
            parameter={{
              name: "parameter6",
              description: state.parameter6.description,
              enabled: state.parameter6.enabled,
            }}
            handleAllowInformation={handleAllowInformation}
            handleChangeInformation={handleChangeInformation}
            handleParameterSelection={onParameterSelection}
          />
        </Grid>
        <Grid item md={4}>
          {/* <Card>
            <CardContent> */}
          <div
            style={{
              padding: "8px",
              border: "1px solid #fff",
              borderRadius: "8px",
            }}
          >
            <Typography variant="h4">{equipmentName}</Typography>
            <Stack direction="column">
              <List>
                <ParameterPreview parameter={state.parameter1} />
                <ParameterPreview parameter={state.parameter2} />
                <ParameterPreview parameter={state.parameter3} />
                <ParameterPreview parameter={state.parameter4} />
                <ParameterPreview parameter={state.parameter5} />
                <ParameterPreview parameter={state.parameter6} />
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
        <Button
          variant="outlined"
          onClick={(e) => onClose!(e, "escapeKeyDown")}
          sx={{ marginLeft: 1 }}
        >
          Cancelar
        </Button>
      </Stack>
      {/* </Paper> */}
    </Modal>
  );
};

export default Card6ParametersSettings;

type InformationSectionProps = {
  title: string;
  equipments: Equipment[];
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
};

const InformationSection: React.FC<InformationSectionProps> = ({
  title,
  equipments,
  parameters,
  parameter,
  handleAllowInformation,
  handleChangeInformation,
  handleParameterSelection,
  ...props
}) => {
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
          disabled={!parameter.enabled}
          options={equipments}
          renderInput={(params) => (
            <TextField name="equipment" {...params} label="Equipamento" />
          )}
        />
        <Autocomplete
          disabled={!parameter.enabled}
          options={parameters}
          renderInput={(params) => (
            <TextField {...params} name="parameter" label="Parâmetro" />
          )}
          onChange={(_, value, __) =>
            handleParameterSelection(
              parameter.name as keyof Parameters,
              value?.id ?? "",
              value?.label ?? ""
            )
          }
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
