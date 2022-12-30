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
  FloorModel,
  RoomModel,
  RoomViewModel,
  SiteModel,
} from "modules/datacenter/models/datacenter-model";

type FormProps = {
  onConfirm(room: RoomViewModel): void;
  mode?: FormMode;
  data?: {
    model?: RoomModel;
    sites?: SiteModel[];
    buildings?: BuildingModel[];
    floors?: FloorModel[];
  };
} & ModalProps;

const RoomFormModal: React.FC<FormProps> = ({
  onConfirm,
  mode = "new",
  data,
  ...props
}) => {
  const methods = useForm<RoomViewModel>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
  const {
    handleSubmit,
    reset,
    watch,
    formState: { isValid, isSubmitSuccessful },
  } = methods;

  const onSubmit: SubmitHandler<RoomViewModel> = (data) => onConfirm(data);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        buildingId: "",
        floorId: "",
        name: "",
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
            name="buildingId"
            label="Prédio"
            items={data?.buildings?.map((building) => ({
              description: building.name,
              value: building.id,
            }))}
          />
          <ControlledTextInput
            name="floorId"
            label="Andar"
            forceSelect
            items={data?.floors?.map((floor) => ({
              description: floor.name,
              value: floor.id,
            }))}
          />
          <ControlledTextInput name="name" label="Nome da sala" />
          <SubmitButton disabled={!isValid} />
        </FormProvider>
      </Form>
    </Modal>
  );
};

export default RoomFormModal;

const validationSchema: SchemaOf<RoomViewModel> = object().shape({
  name: string().required("Nome é obrigatório"),
  buildingId: string().required("Prédio é obrigatório"),
  floorId: string().required("Andar é obrigatório"),
});
