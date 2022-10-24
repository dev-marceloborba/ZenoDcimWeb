import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { number, object, SchemaOf, string } from "yup";
import { ERackEquipmentType } from "modules/datacenter/models/rack-equipment.model";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import Form from "modules/shared/components/Form";
import Modal, { ModalProps } from "modules/shared/components/modal/Modal";
import SubmitButton from "modules/shared/components/SubmitButton";

type RackEquipmentFormProps = {
  onCancel(): void;
  onConfirm(data: FormProps): void;
  mode?: "new" | "edit";
  data?: FormProps;
} & ModalProps;

const RackEquipmentForm: React.FC<RackEquipmentFormProps> = ({
  onConfirm,
  onCancel,
  mode = "new",
  data,
  ...props
}) => {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid, isSubmitSuccessful },
  } = methods;

  const onSubmit: SubmitHandler<FormProps> = (data) => onConfirm(data);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        name: "",
        model: "",
        manufactor: "",
        serialNumber: "",
        initialPosition: 1,
        finalPosition: 2,
        rackEquipmentType: 0,
      });
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (mode === "edit" && data) {
      reset(data);
    }
  }, [data, mode, reset]);

  return (
    <Modal {...props}>
      <FormProvider {...methods}>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            " & .MuiFormControl-root": {
              my: 1,
            },
          }}
        >
          <ControlledTextInput name="name" label="Nome" />
          <ControlledTextInput name="model" label="Modelo" />
          <ControlledTextInput name="manufactor" label="Fabricante" />
          <ControlledTextInput name="serialNumber" label="N serial" />
          <ControlledTextInput name="initialPosition" label="Posição inicial" />
          <ControlledTextInput name="finalPosition" label="Posição final" />
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
          <SubmitButton disabled={!isValid} />
        </Form>
      </FormProvider>
    </Modal>
  );
};

export default RackEquipmentForm;

type FormProps = {
  name: string;
  model: string;
  manufactor: string;
  serialNumber: string;
  initialPosition: number;
  finalPosition: number;
  rackEquipmentType: ERackEquipmentType;
};

const validationSchema: SchemaOf<FormProps> = object().shape({
  name: string().required("Nome é obrigatório"),
  model: string().required("Modelo é obrigatório"),
  manufactor: string().required("Fabricante é obrigatório"),
  serialNumber: string().required("Número de série é obrigatório"),
  initialPosition: number().required("Posição inicial é obrigatória"),
  finalPosition: number().required("Posição final é obrigatória"),
  rackEquipmentType: number().required("Tipo de equipamento é obrigatório"),
});
