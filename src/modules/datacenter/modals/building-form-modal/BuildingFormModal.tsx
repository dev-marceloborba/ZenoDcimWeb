import Modal, { ModalProps } from "modules/shared/components/modal/Modal";
import React from "react";
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
    defaultValues: data?.model,
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const onSubmit: SubmitHandler<BuildingViewModel> = (data) => onConfirm(data);

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
            required
          />
          <ControlledTextInput name="name" label="Nome do prédio" required />
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
