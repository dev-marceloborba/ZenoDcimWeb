import Modal, { ModalProps } from "modules/shared/components/modal/Modal";
import React, { useEffect } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaOf, string, object } from "yup";
import Form, { FormMode } from "modules/shared/components/Form";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import SubmitButton from "modules/shared/components/SubmitButton";
import {
  BuildingModel,
  BuildingViewModel,
  SiteModel,
} from "modules/datacenter/models/datacenter-model";

type FormProps = {
  onConfirm(building: BuildingViewModel): void;
  mode?: FormMode;
  data?: {
    model?: BuildingModel;
    sites?: SiteModel[];
  };
} & ModalProps;

const BuildingFormModal: React.FC<FormProps> = ({
  onConfirm,
  mode = "new",
  data,
  ...props
}) => {
  const methods = useForm<BuildingViewModel>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid, isSubmitSuccessful },
  } = methods;

  const onSubmit: SubmitHandler<BuildingViewModel> = (data) => onConfirm(data);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        name: "",
        siteId: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (mode === "edit") {
      reset({ ...data?.model });
    }
  }, [data?.model, mode, reset]);

  return (
    <Modal {...props}>
      <Form
        sx={{
          "& .MuiTextField-root, .MuiButton-root": {
            marginTop: 2,
          },
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormProvider {...methods}>
          <ControlledTextInput
            name="siteId"
            label="Site"
            items={
              data?.sites?.map((site) => ({
                description: site.name,
                value: site.id,
              })) ?? []
            }
          />
          <ControlledTextInput name="name" label="Nome do prédio" />
          <SubmitButton disabled={!isValid} />
        </FormProvider>
      </Form>
    </Modal>
  );
};

export default BuildingFormModal;

const validationSchema: SchemaOf<BuildingViewModel> = object().shape({
  name: string().required("Nome é obrigatório"),
  siteId: string().required("Site é obrigatório"),
});
