import { useEffect } from "react";
import Modal, { ModalProps } from "modules/shared/components/modal/Modal";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import Form from "modules/shared/components/Form";
import SubmitButton from "modules/shared/components/SubmitButton";
import { FormProvider, useForm } from "react-hook-form";
import { number, object, SchemaOf, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import {
  CreateRackViewModel,
  RackModel,
} from "modules/datacenter/models/rack.model";
import Loading from "modules/shared/components/Loading";
import useDataCenter from "./useDataCenter";

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
  const { isLoading, selections, infra } = useDataCenter();
  const methods = useForm<FormProps>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid, isSubmitSuccessful },
  } = methods;

  const onSubmit = (formData: CreateRackViewModel) => onConfirm(formData);
  // const onSubmit = (formData: CreateRackViewModel) => console.log(formData);

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
        size: data.size.toString(),
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
          <ControlledTextInput
            name="siteId"
            label="Site"
            items={infra.sites ?? []}
            onChange={(e) => selections.siteSelection(e.target.value)}
          />
          <ControlledTextInput
            name="buildingId"
            label="Prédio"
            items={infra.buildings ?? []}
            onChange={(e) => selections.buildingSelection(e.target.value)}
          />
          <ControlledTextInput
            name="floorId"
            label="Andar"
            items={infra.floors ?? []}
            onChange={(e) => selections.floorSelection(e.target.value)}
          />
          <ControlledTextInput
            name="roomId"
            label="Sala"
            items={infra.rooms ?? []}
          />
          <ControlledTextInput name="weight" label="Peso" />
          <ControlledTextInput name="size" label="Tamanho" />
          <ControlledTextInput name="localization" label="Localização" />
          <SubmitButton disabled={!isValid} />
          <Button onClick={onCancel}>Cancelar</Button>
        </Form>
      </FormProvider>
      <Loading open={isLoading} />
    </Modal>
  );
};

type FormProps = {
  size: string;
  localization: string;
  weight: number;
  roomId: string;
  floorId: string;
  buildingId: string;
  siteId: string;
};

const validationSchema: SchemaOf<FormProps> = object().shape({
  size: string().required("Tamanho do rack é obrigatório"),
  localization: string().required("Localização do rack é obrigatória"),
  weight: number().required("Peso total do rack é obrigatório"),
  roomId: string().required("Sala é obrigatória"),
  floorId: string().required("Andar é obrigatório"),
  buildingId: string().required("Prédio é obrigatório"),
  siteId: string().required("Site é obrigatório"),
});

export default RackForm;
