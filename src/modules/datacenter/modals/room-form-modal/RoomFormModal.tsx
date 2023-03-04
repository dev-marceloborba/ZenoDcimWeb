import Modal, { ModalProps } from "modules/shared/components/modal/Modal";
import React, { useEffect, useReducer } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaOf, string, object, number } from "yup";
import Form, { FormMode } from "modules/shared/components/Form";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import SubmitButton from "modules/shared/components/SubmitButton";
import { SiteModel } from "modules/datacenter/models/datacenter-model";
import locationReducer, {
  locationInitialState,
  LocationReducerType,
} from "modules/core/reducers/locationReducer";
import {
  RoomEditorViewModel,
  RoomModel,
} from "modules/datacenter/models/room.model";

type FormProps = {
  onConfirm(room: RoomEditorViewModel): void;
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
  const methods = useForm<RoomEditorViewModel>({
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

  const onSubmit: SubmitHandler<RoomEditorViewModel> = (data) =>
    onConfirm(data);

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
          buildingId: data?.model?.floor?.building?.id,
        },
      });
      dispatch({
        type: LocationReducerType.GET_ROOMS_BY_FLOOR,
        payload: {
          floorId: data?.model?.floor.id,
        },
      });
    }
  }, [
    data?.model?.floor?.building?.id,
    data?.model?.floor?.building?.site?.id,
    data?.model?.floor.id,
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
          <ControlledTextInput
            name="rackCapacity"
            label="Capacidade de racks"
          />
          <ControlledTextInput
            name="powerCapacity"
            label="Capacidade de potência (W)"
          />
          <SubmitButton disabled={!isValid} />
        </FormProvider>
      </Form>
    </Modal>
  );
};

export default RoomFormModal;

const validationSchema: SchemaOf<RoomEditorViewModel> = object().shape({
  id: string().notRequired(),
  name: string().required("Nome é obrigatório"),
  rackCapacity: number().notRequired(),
  powerCapacity: number().notRequired(),
  floorId: string().required("Andar é obrigatório"),
  buildingId: string().required("Prédio é obrigatório"),
  siteId: string().required("Site é obrigatório"),
});
