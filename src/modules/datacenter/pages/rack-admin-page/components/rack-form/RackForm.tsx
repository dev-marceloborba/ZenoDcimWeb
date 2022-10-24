import { useEffect } from "react";
import Modal, { ModalProps } from "modules/shared/components/modal/Modal";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import Form from "modules/shared/components/Form";
import SubmitButton from "modules/shared/components/SubmitButton";
import { FormProvider, useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import {
  CreateRackViewModel,
  RackModel,
} from "modules/datacenter/models/rack.model";

type RackFormProps = {
  onCancel(): void;
  onConfirm(data: CreateRackViewModel): void;
  mode?: "new" | "edit";
  data?: RackModel;
} & ModalProps;

const RackForm: React.FC<RackFormProps> = ({
  onCancel,
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
    formState: { isValid, isSubmitSuccessful },
  } = methods;

  const onSubmit = (formData: CreateRackViewModel) => onConfirm(formData);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        size: "",
        localization: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (mode === "edit" && data) {
      reset({
        size: data.size,
        localization: data.localization,
      });
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
          <ControlledTextInput name="size" label="Tamanho" />
          <ControlledTextInput name="localization" label="Localização" />
          <SubmitButton disabled={!isValid} />
          <Button onClick={onCancel}>Cancelar</Button>
        </Form>
      </FormProvider>
    </Modal>
  );
};

const validationSchema = object().shape({
  size: string().required("Tamanho do rack é obrigatório"),
  localization: string().required("Localização do rack é obrigatória"),
});

export default RackForm;
