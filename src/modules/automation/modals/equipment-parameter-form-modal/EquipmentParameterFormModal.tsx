import Modal, { ModalProps } from "modules/shared/components/modal/Modal";
import { FormMode } from "modules/shared/components/Form";
import SubmitButton from "modules/shared/components/SubmitButton";
import { array, number, object, SchemaOf, string } from "yup";
import {
  EquipmentParameterEditor,
  EquipmentParameterModel,
} from "modules/automation/models/automation-model";
import React from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import RemoveButton from "modules/shared/components/remove-button/RemoveButton";
import AddButton from "modules/shared/components/add-button/AddButton";
import { AlarmRuleEditor } from "modules/automation/models/alarm-rule-model";
import { Formik, Form, FieldArray } from "formik";
import TextInput from "modules/shared/components/form-wrapper/text-input/TextInput";
import DropdownInput from "modules/shared/components/form-wrapper/dropdown-input/DropdownInput";

const defaultGuid = "00000000-0000-0000-0000-000000000000";

type Props = {
  mode?: FormMode;
  data?: EquipmentParameterModel;
  onConfirm(data: EquipmentParameterEditor): void;
} & ModalProps;

const EquipmentParameterFormModal: React.FC<Props> = ({
  mode = "new",
  data,
  onConfirm,
  ...props
}) => {
  const initialValues = {
    id: data?.id ?? defaultGuid,
    name: data?.name ?? "",
    scale: data?.scale ?? 1,
    unit: data?.unit ?? "",
    alarmRules:
      data?.alarmRules?.map<AlarmRule>((x) => ({
        id: x.id ?? defaultGuid,
        name: x.name,
        conditional: x.conditional,
        priority: x.priority,
        setpoint: x.setpoint,
        type: x.type,
      })) ?? [],
  };
  const onSubmit = (formData: FormProps) =>
    onConfirm({
      id: formData.id ?? defaultGuid,
      address: "",
      dataSource: "",
      equipmentId: "",
      name: formData.name,
      scale: formData.scale,
      unit: formData.unit,
      expression: "",
      alarmRules: formData.alarmRules.map<AlarmRuleEditor>((x) => ({
        id: x.id ?? defaultGuid,
        conditional: x.conditional,
        enableEmail: false,
        enableNotification: false,
        name: x.name,
        priority: x.priority,
        setpoint: x.setpoint,
        type: x.type,
      })),
    });
  return (
    <Modal {...props}>
      <Formik
        validateOnMount
        validateOnChange={false}
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ values, isValid }) => (
          <Form autoComplete="off" noValidate style={{ marginTop: "1rem" }}>
            <Grid container rowSpacing={1} columnSpacing={1}>
              <Grid item md={12}>
                <TextInput name="name" label="Parâmetro" />
              </Grid>
              <Grid item md={6}>
                <TextInput name="unit" label="Unidade" />
              </Grid>
              <Grid item md={6}>
                <TextInput name="scale" label="Escala" />
              </Grid>
            </Grid>
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              Triggers
            </Typography>
            <FieldArray name="alarmRules">
              {({ push, remove }) => (
                <>
                  {values.alarmRules.map((_, idx) => (
                    <AlarmSetting key={idx} index={idx} onRemove={remove} />
                  ))}
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <AddButton
                      onClick={() =>
                        push({
                          id: defaultGuid,
                          setpoint: 0,
                          conditional: 0,
                          type: 0,
                          priority: 0,
                          name: "",
                        })
                      }
                    />
                  </Stack>
                </>
              )}
            </FieldArray>
            <SubmitButton disabled={!isValid} sx={{ mt: 2 }} />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EquipmentParameterFormModal;

type FormProps = {
  id?: string;
  name: string;
  unit: string;
  scale: number;
  alarmRules: AlarmRule[];
};

type AlarmRule = {
  id?: string;
  setpoint: number;
  conditional: number;
  type: number;
  priority: number;
  name: string;
};

//@ts-ignore
const validationSchema: SchemaOf<FormProps> = object().shape({
  id: string().notRequired(),
  name: string().required("Parâmetro é obrigatório"),
  unit: string().required("Unidade é obrigatória"),
  scale: number().required("Escala é obrigatória"),
  alarmRules: array(
    object().shape({
      id: string().notRequired(),
      setpoint: number().required("Valor é obrigatório"),
      conditional: number().required("Comparador é obrigatório"),
      type: number().required("Tipo é obrigatório"),
      priority: number().required("Severidade é obrigatório"),
      name: string().required("Mensagem é obrigatória"),
    })
  ),
});

type AlarmSettingProps = {
  index: number;
  onRemove(index: number): void;
};

const AlarmSetting: React.FC<AlarmSettingProps> = ({ index, onRemove }) => {
  return (
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
      </Grid>
      <RemoveButton type="button" onClick={() => onRemove(index)} />
    </Stack>
  );
};
