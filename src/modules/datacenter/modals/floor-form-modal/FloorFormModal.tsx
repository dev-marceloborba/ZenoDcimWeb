import Modal, { ModalProps } from "modules/shared/components/modal/Modal";
import React, { useEffect, useReducer } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaOf, string, object } from "yup";
import Form, { FormMode } from "modules/shared/components/Form";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import SubmitButton from "modules/shared/components/SubmitButton";
import {
  FloorModel,
  FloorViewModel,
  SiteModel,
} from "modules/datacenter/models/datacenter-model";
import locationReducer, {
  locationInitialState,
  LocationReducerType,
} from "modules/core/reducers/locationReducer";

type FormProps = {
  onConfirm(floor: FloorViewModel): void;
  mode?: FormMode;
  data?: {
    model?: FloorModel;
    sites?: SiteModel[];
  };
} & ModalProps;

const FloorFormModal: React.FC<FormProps> = ({
  onConfirm,
  mode = "new",
  data,
  ...props
}) => {
  const [state, dispatch] = useReducer(locationReducer, locationInitialState);
  const methods = useForm<FloorViewModel>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      ...data?.model,
      siteId: data?.model?.building?.site?.id,
    },
  });
  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const onSubmit: SubmitHandler<FloorViewModel> = (data) => onConfirm(data);

  useEffect(() => {
    dispatch({
      type: LocationReducerType.GET_SITES,
      payload: { sites: data?.sites },
    });
    if (mode === "edit") {
      dispatch({
        type: LocationReducerType.GET_BUILDINGS_BY_SITE,
        payload: {
          siteId: data?.model?.building?.site?.id,
        },
      });
    }
  }, [data?.model?.building?.site?.id, data?.sites, mode]);

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
            items={state.sites.map((site) => ({
              description: site.name,
              value: site.id,
            }))}
            onChange={(e) =>
              dispatch({
                type: LocationReducerType.GET_BUILDINGS_BY_SITE,
                payload: {
                  siteId: e.target.value,
                },
              })
            }
            required
          />
          <ControlledTextInput
            name="buildingId"
            label="Prédio"
            items={state.buildings.map((building) => ({
              description: building.name,
              value: building.id,
            }))}
            required
          />
          <ControlledTextInput name="name" label="Nome do andar" required />
          <SubmitButton disabled={!isValid} />
        </FormProvider>
      </Form>
    </Modal>
  );
};

export default FloorFormModal;

const validationSchema: SchemaOf<FloorViewModel> = object().shape({
  siteId: string().notRequired(),
  name: string().required("Nome é obrigatório"),
  buildingId: string().required("Prédio é obrigatório"),
});
