import Modal, { ModalProps } from "modules/shared/components/modal/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import Form, { FormMode } from "modules/shared/components/Form";
import SubmitButton from "modules/shared/components/SubmitButton";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { array, number, object, SchemaOf, string } from "yup";
import { EquipmentParameterModel } from "modules/automation/models/automation-model";
import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import RemoveButton from "modules/shared/components/remove-button/RemoveButton";
import AddButton from "modules/shared/components/add-button/AddButton";

type Props = {
  mode?: FormMode;
  data?: EquipmentParameterModel;
  onConfirm(data: any): void;
} & ModalProps;

const EquipmentParameterFormModal: React.FC<Props> = ({
  mode = "new",
  data,
  onConfirm,
  ...props
}) => {
  const methods = useForm<FormProps>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      scale: 0,
      unit: "",
      trigger: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "trigger",
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = methods;

  const onSubmit = (formData: any) => {
    console.log(formData);
    // onConfirm(formData);
  };

  const onRemove = (index: number) => remove(index);

  useEffect(() => {
    if (mode === "edit") {
      reset({ ...data });
    }
  }, [data, mode, reset]);

  return (
    <Modal {...props}>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <Grid container rowSpacing={1} columnSpacing={1}>
            <Grid item md={12}>
              <ControlledTextInput name="name" label="Parâmetro" />
            </Grid>
            <Grid item md={6}>
              <ControlledTextInput name="unit" label="Unidade" />
            </Grid>
            <Grid item md={6}>
              <ControlledTextInput name="scale" label="Escala" />
            </Grid>
            {/* <Grid item md={4}>
              <ControlledTextInput
                name="dataSource"
                label="Fonte de dados"
                items={[
                  {
                    description: "Modbus",
                    value: "Modbus",
                  },
                  {
                    description: "OPC-UA",
                    value: "OPC-UA",
                  },
                ]}
              />
            </Grid> */}
          </Grid>
          {/* <ControlledTextInput name="address" label="Endereço" /> */}

          <Typography variant="subtitle1" sx={{ mt: 1 }}>
            Triggers
          </Typography>
          {fields.map((field, index) => (
            <AlarmSetting key={field.id} index={index} onRemove={onRemove} />
          ))}
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            <AddButton
              type="button"
              onClick={() =>
                append({
                  value: 0,
                  comparator: 0,
                  type: 0,
                  severity: 0,
                  message: "",
                })
              }
            />
          </Stack>
          <SubmitButton disabled={!isValid} sx={{ mt: 2 }} />
        </Form>
      </FormProvider>
    </Modal>
  );
};

export default EquipmentParameterFormModal;

type FormProps = {
  name: string;
  unit: string;
  scale: number;
  trigger: {
    value: number;
    comparator: number;
    type: number;
    severity: number;
    message: string;
  }[];
};

const validationSchema: SchemaOf<FormProps> = object().shape({
  name: string().required("Parâmetro é obrigatório"),
  unit: string().required("Unidade é obrigatória"),
  scale: number().required("Escala é obrigatória"),
  // address: string().required("Endereço é obrigatório"),
  // dataSource: string().required("Fonte de dados é obrigatório"),
  trigger: array(
    object().shape({
      value: number().required("Valor é obrigatório"),
      comparator: number().required("Comparador é obrigatório"),
      type: number().required("Tipo é obrigatório"),
      severity: number().required("Severidade é obrigatório"),
      message: string().required("Mensagem é obrigatória"),
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
          <ControlledTextInput name={`trigger.${index}.value`} label="Valor" />
        </Grid>
        <Grid item md={3}>
          <ControlledTextInput
            name={`trigger.${index}.comparator`}
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
            name={`trigger.${index}.type`}
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
            name={`trigger.${index}.severity`}
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
            name={`trigger.${index}.message`}
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
