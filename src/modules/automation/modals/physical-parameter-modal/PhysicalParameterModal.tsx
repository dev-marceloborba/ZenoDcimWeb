import { useEffect } from "react";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import Form, { FormMode } from "modules/shared/components/Form";
import Modal, { ModalProps } from "modules/shared/components/modal/Modal";
import SubmitButton from "modules/shared/components/SubmitButton";
import { number, object, SchemaOf, string } from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ParameterModel,
  ParameterViewModel,
} from "modules/automation/models/automation-model";

type PhysicalParameterModalProps = {
  onConfirm(formData: ParameterViewModel): void;
  mode?: FormMode;
  data?: ParameterModel;
} & ModalProps;

const PhysicalParameterModal: React.FC<PhysicalParameterModalProps> = ({
  onConfirm,
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
    formState: { isValid },
  } = methods;

  const onSubmit = (formData: ParameterViewModel) => onConfirm(formData);

  useEffect(() => {
    if (mode === "edit") {
      reset({ ...data });
    }
  }, [data, mode, reset]);

  return (
    <Modal {...props}>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          " & .MuiTextField-root, .MuiButton-root": {
            marginTop: 2,
          },
        }}
      >
        <FormProvider {...methods}>
          <ControlledTextInput name="name" label="Parâmetro" />
          <ControlledTextInput name="unit" label="Unidade" />
          <ControlledTextInput name="lowLowLimit" label="Limite muito baixo" />
          <ControlledTextInput name="lowLimit" label="Limite baixo" />
          <ControlledTextInput name="highLimit" label="Limite alto" />
          <ControlledTextInput name="highHighLimit" label="Limite muito alto" />
          <ControlledTextInput name="scale" label="Escala" defaultValue={1} />
          <SubmitButton disabled={!isValid} />
        </FormProvider>
      </Form>
    </Modal>
  );
};

export default PhysicalParameterModal;

const validationSchema = object().shape({
  name: string().required("Parâmetro é obrigatório"),
  unit: string().required("Unidade é obrigatória"),
  lowLowLimit: number().notRequired(),
  lowLimit: number().notRequired(),
  highLimit: number().notRequired(),
  highHighLimit: number().notRequired(),
  scale: number().required("Escala é obrigatória"),
});
