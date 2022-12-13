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
  data: {
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
    parameter4: {
      parameter: ParameterState | null;
      equipmentId: string | null;
      parameterId: string | null;
    };
    parameter5: {
      parameter: ParameterState | null;
      equipmentId: string | null;
      parameterId: string | null;
    };
    parameter6: {
      parameter: ParameterState | null;
      equipmentId: string | null;
      parameterId: string | null;
    };
  };
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
  data,
  onSave,
  onClose,
  ...props
}) => {
  const [state, setState] = useState<Parameters>({
    parameter1: {
      id: data.parameter1.parameter?.id ?? "",
      description:
        data.parameter1.parameter?.description ?? "Parâmetro 1 não configurado",
      value: 0,
      enabled: data.parameter1.parameter?.enabled ?? false,
    },
    parameter2: {
      id: data.parameter2.parameter?.id ?? "",
      description: "Parâmetro 2 não configurado",
      value: 0,
      enabled: data.parameter2.parameter?.enabled ?? false,
    },
    parameter3: {
      id: data.parameter3.parameter?.id ?? "",
      description: "Parâmetro 3 não configurado",
      value: 0,
      enabled: data.parameter3.parameter?.enabled ?? false,
    },
    parameter4: {
      id: data.parameter4.parameter?.id ?? "",
      description: "Parâmetro 4 não configurado",
      value: 0,
      enabled: data.parameter4.parameter?.enabled ?? false,
    },
    parameter5: {
      id: data.parameter5.parameter?.id ?? "",
      description: "Parâmetro 5 não configurado",
      value: 0,
      enabled: data.parameter5.parameter?.enabled ?? false,
    },
    parameter6: {
      id: data.parameter6.parameter?.id ?? "",
      description: "Parâmetro 6 não configurado",
      value: 0,
      enabled: data.parameter6.parameter?.enabled ?? false,
    },
  });

  // const [state, setState] = useState<Parameters>({ ...data });

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
            previousEquipmentId={data.parameter1.equipmentId ?? ""}
            previousParameterId={data.parameter1.parameterId ?? ""}
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
            previousEquipmentId={data.parameter2.equipmentId ?? ""}
            previousParameterId={data.parameter2.parameterId ?? ""}
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
            previousEquipmentId={data.parameter3.equipmentId ?? ""}
            previousParameterId={data.parameter3.parameterId ?? ""}
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
            previousEquipmentId={data.parameter4.equipmentId ?? ""}
            previousParameterId={data.parameter4.parameterId ?? ""}
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
            previousEquipmentId={data.parameter5.equipmentId ?? ""}
            previousParameterId={data.parameter5.parameterId ?? ""}
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
            previousEquipmentId={data.parameter6.equipmentId ?? ""}
            previousParameterId={data.parameter6.parameterId ?? ""}
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
  previousEquipmentId?: string;
  previousParameterId?: string;
};

const InformationSection: React.FC<InformationSectionProps> = ({
  title,
  equipments,
  parameters,
  parameter,
  previousEquipmentId,
  previousParameterId,
  handleAllowInformation,
  handleChangeInformation,
  handleParameterSelection,
  ...props
}) => {
  const [equipmentValue, setEquipmentValue] = useState<Equipment | null>(
    equipments.find((e) => e.id === previousEquipmentId) ??
      ({ id: "123", label: "Equipamento não selecionado" } as Equipment)
  );
  const [equipmentInputValue, setEquipmentInputValue] = useState<string>("");
  const [parameterValue, setParameterValue] = useState<Parameter | null>(
    parameters.find((p) => p.id === previousParameterId) ??
      ({ id: "321", label: "Parâmetro não selecionado" } as Parameter)
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
          value={equipmentValue}
          inputValue={equipmentInputValue}
          getOptionLabel={(option) => option.label}
          disabled={!parameter.enabled}
          options={equipments}
          onChange={(_, value, __) => setEquipmentValue(value)}
          onInputChange={(_, value) => setEquipmentInputValue(value)}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField name="equipment" {...params} label="Equipamento" />
          )}
        />
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
