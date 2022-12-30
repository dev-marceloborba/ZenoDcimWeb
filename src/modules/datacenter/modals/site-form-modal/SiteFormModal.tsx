import Modal, { ModalProps } from "modules/shared/components/modal/Modal";
import { useEffect } from "react";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import {
  SiteModel,
  SiteViewModel,
} from "modules/datacenter/models/datacenter-model";
import Form, { FormMode } from "modules/shared/components/Form";
import SubmitButton from "modules/shared/components/SubmitButton";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { object, SchemaOf, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type FormProps = {
  onConfirm(site: SiteViewModel): void;
  data?: SiteModel;
  mode?: FormMode;
} & ModalProps;

const SiteFormModal: React.FC<FormProps> = ({
  onConfirm,
  mode = "new",
  data,
  ...props
}) => {
  const methods = useForm<SiteViewModel>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid, isSubmitSuccessful },
  } = methods;

  const onSubmit: SubmitHandler<SiteViewModel> = (data) => onConfirm(data);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ name: "" });
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (mode === "edit") {
      reset({ ...data });
    }
  }, [data, mode, reset]);

  return (
    <Modal {...props}>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ControlledTextInput
            name="name"
            label="Site"
            defaultValue=""
            sx={{ mt: 1 }}
          />
          <SubmitButton disabled={!isValid} sx={{ mt: 2 }} />
        </Form>
      </FormProvider>
    </Modal>
  );
};

export default SiteFormModal;

const validationSchema: SchemaOf<SiteViewModel> = object().shape({
  name: string().required("Nome é obrigatório"),
});
