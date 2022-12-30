import Modal, { ModalProps } from "modules/shared/components/modal/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import Form, { FormMode } from "modules/shared/components/Form";
import SubmitButton from "modules/shared/components/SubmitButton";
import { FormProvider, useForm } from "react-hook-form";
import { number, object, SchemaOf, string } from "yup";
import { EquipmentParameterModel } from "modules/automation/models/automation-model";
import { useEffect } from "react";

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
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (formData: any) => {
    onConfirm(formData);
  };

  useEffect(() => {
    if (mode === "edit") {
      reset({ ...data });
    }
  }, [data, mode, reset]);

  return (
    <Modal {...props}>
      <FormProvider {...methods}>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            "& .MuiFormControl-root": {
              mt: 2,
            },
          }}
        >
          <ControlledTextInput name="name" label="Parâmetro" />
          <ControlledTextInput name="unit" label="Unidade" />
          <ControlledTextInput name="scale" label="Escala" />
          <ControlledTextInput name="lowLowLimit" label="Limite muito baixo" />
          <ControlledTextInput name="lowLimit" label="Limite baixo" />
          <ControlledTextInput name="highLimit" label="Limite alto" />
          <ControlledTextInput name="highHighLimit" label="Limite muito alto" />
          {/* <ControlledTextInput name="address" label="Endereço" /> */}
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
          <SubmitButton sx={{ mt: 2 }} />
        </Form>
      </FormProvider>
    </Modal>
  );
};

export default EquipmentParameterFormModal;

const validationSchema = object().shape({
  name: string().required("Parâmetro é obrigatório"),
  unit: string().required("Unidade é obrigatória"),
  scale: number().required("Escala é obrigatória"),
  lowLowLimit: number().required("Limite muito baixo é obrigatório"),
  lowLimit: number().required("Limite baixo é obrigatório"),
  highLimit: number().required("Limite alto é obrigatório"),
  highHighLimit: number().required("Limite muito alto é obrigatório"),
  // address: string().required("Endereço é obrigatório"),
  dataSource: string().required("Fonte de dados é obrigatório"),
});
