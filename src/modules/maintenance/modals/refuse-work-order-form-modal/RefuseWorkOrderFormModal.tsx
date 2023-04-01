import Modal, { ModalProps } from "modules/shared/components/modal/Modal";
import Form from "modules/shared/components/Form";
import SubmitButton from "modules/shared/components/SubmitButton";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import { object, SchemaOf, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type RefuseWorkOrderFormModalProps = {
  onConfirm(formData: FormData): void;
} & ModalProps;

const RefuseWorkOrderFormModal: React.FC<RefuseWorkOrderFormModalProps> = ({
  onConfirm,
  ...props
}) => {
  const methods = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schemaValidation),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => onConfirm(data);

  return (
    <Modal {...props}>
      <FormProvider {...methods}>
        <Form sx={{ mt: 1 }} onSubmit={methods.handleSubmit(onSubmit)}>
          <ControlledTextInput
            name="reason"
            label="Motivo"
            items={[
              {
                description: "Dados incorretos",
                value: 0,
              },
              {
                description: "Cancelada",
                value: 1,
              },
            ]}
          />
          <ControlledTextInput
            name="info"
            label="Comentário"
            multiline
            rows={4}
            sx={{ my: 1 }}
          />
          <SubmitButton
            disabled={!methods.formState.isValid}
            label="Cancelar ordem"
            color="error"
          />
          <Button
            variant="outlined"
            onClick={() => methods.reset({ reason: "", info: "" })}
            sx={{ ml: 2 }}
          >
            Cancelar
          </Button>
        </Form>
      </FormProvider>
    </Modal>
  );
};

export default RefuseWorkOrderFormModal;

type FormData = {
  reason: string;
  info?: string;
};

const schemaValidation: SchemaOf<FormData> = object().shape({
  reason: string().required("Motivo é obrigatório"),
  info: string().notRequired(),
});
