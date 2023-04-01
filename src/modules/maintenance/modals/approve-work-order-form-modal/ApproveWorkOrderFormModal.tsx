import Modal, { ModalProps } from "modules/shared/components/modal/Modal";
import Form from "modules/shared/components/Form";
import SubmitButton from "modules/shared/components/SubmitButton";
import { Button } from "@mui/material";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { object, SchemaOf, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type Technicians = {
  name: string;
  id: string;
};

type ApproveWorkOrderFormModalProps = {
  onConfirm(formData: FormData): void;
  data: {
    technicians: Technicians[];
  };
} & ModalProps;

const ApproveWorkOrderFormModal: React.FC<ApproveWorkOrderFormModalProps> = ({
  data: { technicians },
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
        <Form onSubmit={methods.handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <ControlledTextInput
            name="executor"
            label="Técnico"
            required
            items={technicians.map((tec) => ({
              description: tec.name,
              value: tec.id,
            }))}
          />
          <ControlledTextInput
            name="info"
            label="Comentário"
            multiline
            rows={4}
            sx={{ my: 1 }}
          />
          <SubmitButton
            label="Confirmar"
            disabled={!methods.formState.isValid}
          />
          <Button
            variant="outlined"
            sx={{ ml: 2 }}
            onClick={() =>
              methods.reset({
                executor: "",
                info: "",
              })
            }
          >
            Cancelar
          </Button>
        </Form>
      </FormProvider>
    </Modal>
  );
};

export default ApproveWorkOrderFormModal;

type FormData = {
  executor: string;
  info?: string;
};

const schemaValidation: SchemaOf<FormData> = object().shape({
  executor: string().required("Técnico é obrigatório"),
  info: string().notRequired(),
});
