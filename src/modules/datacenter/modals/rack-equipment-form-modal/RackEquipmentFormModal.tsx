import Form, { FormMode } from "modules/shared/components/Form";
import Modal, { ModalProps } from "modules/shared/components/modal/Modal";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import SubmitButton from "modules/shared/components/SubmitButton";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { number, object, SchemaOf, string } from "yup";
import { ERackEquipmentType } from "app/models/rack.model";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CreateRackEquipmentViewModel,
  ERackEquipmentOrientation,
  RackEquipmentModel,
} from "modules/datacenter/models/rack-equipment.model";
import { ERackMount } from "modules/datacenter/models/rack.model";
import { EEquipmentStatus } from "modules/automation/models/automation-model";

type RackEquipmentFormModalFormProps = {
  onConfirm(formData: Omit<CreateRackEquipmentViewModel, "rackId">): void;
  mode?: FormMode;
  data?: RackEquipmentModel;
} & ModalProps;

const RackEquipmentFormModal: React.FC<RackEquipmentFormModalFormProps> = ({
  onConfirm,
  mode = "new",
  data,
  ...props
}) => {
  const methods = useForm<FormProps>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      ...data,
      name: data?.baseEquipment.name,
      serialNumber: data?.baseEquipment.serialNumber,
      manufactor: data?.baseEquipment.manufactor,
      model: data?.baseEquipment.model,
      rackMountType: data?.rackMountType,
      rackEquipmentOrientation: data?.rackEquipmentOrientation,
      status: data?.status,
      rackEquipmentType: data?.rackEquipmentType,
    },
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const onSubmit: SubmitHandler<FormProps> = (data) =>
    onConfirm({
      ...data,
      finalPosition: data.initialPosition + data.occupation - 1,
    });

  return (
    <Modal {...props}>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="subtitle1">Identidade</Typography>
          <Grid
            container
            columnSpacing={1}
            rowSpacing={1}
            marginTop={0.2}
            marginBottom={1}
          >
            <Grid item md={4}>
              <ControlledTextInput name="name" label="Nome" />
            </Grid>
            <Grid item md={4}>
              <ControlledTextInput
                name="serialNumber"
                label="Número de série"
              />
            </Grid>
            <Grid item md={4}>
              <ControlledTextInput name="client" label="Cliente" />
            </Grid>
            <Grid item md={4}>
              <ControlledTextInput
                name="rackEquipmentType"
                label="Tipo de equipamento"
                items={[
                  {
                    value: 0,
                    description: "Servidor",
                  },
                  {
                    value: 1,
                    description: "Switch",
                  },
                  {
                    value: 2,
                    description: "Storage",
                  },
                ]}
              />
            </Grid>
            <Grid item md={4}>
              <ControlledTextInput
                name="function"
                label="Função do equipamento"
              />
            </Grid>
          </Grid>

          <Typography variant="subtitle1">Dados do equipamento</Typography>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={1}
            marginTop={0.2}
            marginBottom={1}
          >
            <Grid item md={4}>
              <ControlledTextInput name="manufactor" label="Fabricante" />
            </Grid>
            <Grid item md={4}>
              <ControlledTextInput name="model" label="Modelo" />
            </Grid>
            <Grid item md={4}>
              <ControlledTextInput
                name="rackMountType"
                label="Montagem"
                items={[
                  {
                    value: 0,
                    description: "Rack 19”, Frontside",
                  },
                  {
                    value: 1,
                    description: "Rack 19”, Backside",
                  },
                  {
                    value: 2,
                    description: "Rack 19”, Bothsided",
                  },
                  {
                    value: 3,
                    description: "Bandeja, Frontsided",
                  },
                  {
                    value: 4,
                    description: "Bandeja, Backsided",
                  },
                  {
                    value: 5,
                    description: "Bandeja, Bothsided",
                  },
                  {
                    value: 6,
                    description: "Lateral",
                  },
                  {
                    value: 7,
                    description: "Com acessório, Frontsided",
                  },
                  {
                    value: 8,
                    description: "Com acessório, Backsided",
                  },
                ]}
              />
            </Grid>
            <Grid item md={4}>
              <ControlledTextInput name="size" label="Tamanho (A x C x P mm)" />
            </Grid>
            <Grid item md={4}>
              <ControlledTextInput name="weight" label="Peso (kg)" />
            </Grid>
            <Grid item md={4}>
              <ControlledTextInput
                name="rackEquipmentOrientation"
                label="Orientação"
                items={[
                  {
                    value: 0,
                    description: "Frontsided",
                  },
                  {
                    value: 1,
                    description: "Backsided",
                  },
                  {
                    value: 2,
                    description: "Bothsided",
                  },
                ]}
              />
            </Grid>
            <Grid item md={4}>
              <ControlledTextInput name="occupation" label="RU's" />
            </Grid>
            <Grid item md={4}>
              <ControlledTextInput name="power" label="Potência" />
            </Grid>
            <Grid item md={4}>
              <ControlledTextInput
                name="status"
                label="Status"
                items={[
                  {
                    description: "Arquivado",
                    value: 0,
                  },
                  {
                    description: "Instalado",
                    value: 1,
                  },
                  {
                    description: "Fora da planta",
                    value: 2,
                  },
                  {
                    description: "Planejado",
                    value: 3,
                  },
                  {
                    description: "Desligado",
                    value: 4,
                  },
                  {
                    description: "Armazenado",
                    value: 5,
                  },
                ]}
              />
            </Grid>
          </Grid>
          <Typography variant="subtitle1">Local</Typography>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={1}
            marginTop={0.2}
            marginBottom={1}
          >
            <Grid item md={4}>
              <ControlledTextInput
                name="initialPosition"
                label="Posição (RU)"
              />
            </Grid>
          </Grid>

          <Typography variant="subtitle1">Descrição</Typography>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={1}
            marginTop={0.2}
            marginBottom={1}
          >
            <Grid item md={12}>
              <ControlledTextInput
                name="description"
                label="Descrição"
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
          <SubmitButton disabled={!isValid} />
        </Form>
      </FormProvider>
    </Modal>
  );
};

export default RackEquipmentFormModal;

type FormProps = {
  name: string;
  model: string;
  manufactor: string;
  serialNumber: string;
  size: string;
  initialPosition: number;
  rackEquipmentType: ERackEquipmentType;
  client: string;
  function: string;
  rackMountType: ERackMount;
  rackEquipmentOrientation: ERackEquipmentOrientation;
  occupation: number;
  weight: number;
  power: number;
  status: EEquipmentStatus;
  description: string;
};

const validationSchema: SchemaOf<FormProps> = object().shape({
  name: string().required("Nome é obrigatório"),
  model: string().required("Modelo é obrigatório"),
  manufactor: string().required("Fabricante é obrigatório"),
  serialNumber: string().required("Número de série é obrigatório"),
  size: string().required("Tamanho é obrigatório"),
  rackEquipmentType: number().required("Tipo de equipamento é obrigatório"),
  initialPosition: number().required("Posição é obrigatória"),
  client: string().required("Cliente é obrigatório"),
  function: string().required("Função do equipamento é obrigatório"),
  rackMountType: number().required("Montagem do rack é obrigatório"),
  rackEquipmentOrientation: number().required(
    "Orientação do equipamento é obrigatória"
  ),
  occupation: number().required("Ocupação é obrigatória"),
  weight: number().required("Peso é obrigatorio"),
  power: number().required("Potência é obrigatoria"),
  status: number().required("Status é obrigatório"),
  description: string().required("Descrição é obrigatória"),
});
