import Modal, { ModalProps } from "modules/shared/components/modal/Modal";
import React, { useEffect, useReducer } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaOf, string, object } from "yup";
import Form, { FormMode } from "modules/shared/components/Form";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import SubmitButton from "modules/shared/components/SubmitButton";
import {
  RoomModel,
  RoomViewModel,
  SiteModel,
} from "modules/datacenter/models/datacenter-model";
import locationReducer, {
  locationInitialState,
  LocationReducerType,
} from "modules/core/reducers/locationReducer";

type FormProps = {
  onConfirm(room: RoomViewModel): void;
  mode?: FormMode;
  data?: {
    model?: RoomModel;
    sites?: SiteModel[];
  };
} & ModalProps;

const RoomFormModal: React.FC<FormProps> = ({
  onConfirm,
  mode = "new",
  data,
  ...props
}) => {
  const [state, dispatch] = useReducer(locationReducer, locationInitialState);
  const methods = useForm<RoomViewModel>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      ...data?.model,
      siteId: data?.model?.floor?.building?.site?.id,
    },
  });
  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const onSubmit: SubmitHandler<RoomViewModel> = (data) => onConfirm(data);

  useEffect(() => {
    dispatch({
      type: LocationReducerType.GET_SITES,
      payload: { sites: data?.sites },
    });
    if (mode === "edit") {
      dispatch({
        type: LocationReducerType.GET_BUILDINGS_BY_SITE,
        payload: {
          siteId: data?.model?.floor?.building?.site?.id,
        },
      });
      dispatch({
        type: LocationReducerType.GET_FLOORS_BY_BUILDING,
        payload: {
          buildingId: data?.model?.buildingId,
        },
      });
      dispatch({
        type: LocationReducerType.GET_ROOMS_BY_FLOOR,
        payload: {
          floorId: data?.model?.floorId,
        },
      });
    }
  }, [
    data?.model?.buildingId,
    data?.model?.floor?.building?.site?.id,
    data?.model?.floorId,
    data?.sites,
    mode,
  ]);

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
          />
          <ControlledTextInput
            name="buildingId"
            label="Prédio"
            items={state.buildings.map((building) => ({
              description: building.name,
              value: building.id,
            }))}
            onChange={(e) =>
              dispatch({
                type: LocationReducerType.GET_FLOORS_BY_BUILDING,
                payload: {
                  buildingId: e.target.value,
                },
              })
            }
          />
          <ControlledTextInput
            name="floorId"
            label="Andar"
            items={state.floors.map((floor) => ({
              description: floor.name,
              value: floor.id,
            }))}
            onChange={(e) =>
              dispatch({
                type: LocationReducerType.GET_ROOMS_BY_FLOOR,
                payload: {
                  floorId: e.target.value,
                },
              })
            }
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
  siteId: string().notRequired(),
  name: string().required("Nome é obrigatório"),
  buildingId: string().required("Prédio é obrigatório"),
  floorId: string().required("Andar é obrigatório"),
});
