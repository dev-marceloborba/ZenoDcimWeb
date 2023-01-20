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
  FloorModel,
  FloorViewModel,
  SiteModel,
} from "modules/datacenter/models/datacenter-model";

type FormProps = {
  onConfirm(floor: FloorViewModel): void;
  mode?: FormMode;
  data?: {
    model?: FloorModel;
    sites?: SiteModel[];
    buildings?: BuildingModel[];
  };
} & ModalProps;

const FloorFormModal: React.FC<FormProps> = ({
  onConfirm,
  mode = "new",
  data,
  ...props
}) => {
  const methods = useForm<FloorViewModel>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: data?.model,
  });
  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const onSubmit: SubmitHandler<FloorViewModel> = (data) => onConfirm(data);

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
            name="buildingId"
            label="Prédio"
            items={
              data?.buildings?.map((building) => ({
                description: building.name,
                value: building.id,
              })) ?? []
            }
          />
          <ControlledTextInput name="name" label="Nome do andar" />
          <SubmitButton disabled={!isValid} />
        </FormProvider>
      </Form>
    </Modal>
  );
};

export default FloorFormModal;

const validationSchema: SchemaOf<FloorViewModel> = object().shape({
  name: string().required("Nome é obrigatório"),
  buildingId: string().required("Prédio é obrigatório"),
});
