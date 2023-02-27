import { yupResolver } from "@hookform/resolvers/yup";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import locationReducer, {
  locationInitialState,
  LocationReducerType,
} from "modules/core/reducers/locationReducer";
import { SiteModel } from "modules/datacenter/models/datacenter-model";
import {
  CreateRackViewModel,
  RackModel,
} from "modules/datacenter/models/rack.model";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import Form, { FormMode } from "modules/shared/components/Form";
import Modal, { ModalProps } from "modules/shared/components/modal/Modal";
import SubmitButton from "modules/shared/components/SubmitButton";
import { useEffect, useReducer } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { number, object, SchemaOf, string } from "yup";

type RackFormModalProps = {
  onConfirm(formData: CreateRackViewModel): void;
  mode?: FormMode;
  data?: {
    model?: RackModel;
    sites?: SiteModel[];
  };
} & ModalProps;

const RackFormModal: React.FC<RackFormModalProps> = ({
  onConfirm,
  mode = "new",
  data,
  ...props
}) => {
  const [state, dispatch] = useReducer(locationReducer, locationInitialState);
  const methods = useForm<FormProps>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      ...data?.model,
      siteId: data?.model?.site.id,
      buildingId: data?.model?.building.id,
      floorId: data?.model?.floor.id,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = methods;

  const onSubmit = (formData: CreateRackViewModel) => onConfirm(formData);

  useEffect(() => {
    dispatch({
      type: LocationReducerType.GET_SITES,
      payload: {
        sites: data?.sites,
      },
    });
  }, [data?.sites]);

  useEffect(() => {
    if (mode === "edit") {
      dispatch({
        type: LocationReducerType.GET_BUILDINGS_BY_SITE,
        payload: {
          siteId: data?.model?.site.id,
        },
      });
      dispatch({
        type: LocationReducerType.GET_FLOORS_BY_BUILDING,
        payload: {
          buildingId: data?.model?.building.id,
        },
      });
      dispatch({
        type: LocationReducerType.GET_ROOMS_BY_FLOOR,
        payload: {
          floorId: data?.model?.floor.id,
        },
      });
    }
  }, [data?.model, mode, reset]);

  return (
    <Modal {...props}>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="subtitle1">Identidade</Typography>
          <Grid
            container
            columnSpacing={1}
            rowSpacing={1}
            marginTop={0.2}
            marginBottom={1}
          >
            <Grid item md={6}>
              <ControlledTextInput name="name" label="Título do rack" />
            </Grid>
            <Grid item md={6}>
              <ControlledTextInput name="localization" label="Localização" />
            </Grid>
          </Grid>
          <Typography variant="subtitle1">Dados do rack</Typography>
          <Grid
            container
            columnSpacing={1}
            rowSpacing={1}
            marginTop={0.2}
            marginBottom={1}
          >
            <Grid item md={6}>
              <ControlledTextInput name="size" label="Tamanho (A x C x P cm)" />
            </Grid>
            <Grid item md={6}>
              <ControlledTextInput name="capacity" label="Capacidade (RU's)" />
            </Grid>
            <Grid item md={6}>
              <ControlledTextInput name="power" label="Potência do rack (kW)" />
            </Grid>
            <Grid item md={6}>
              <ControlledTextInput name="weight" label="Peso suportável (kg)" />
            </Grid>
          </Grid>
          <Typography variant="subtitle1">Local</Typography>
          <Grid
            container
            columnSpacing={1}
            rowSpacing={1}
            marginTop={0.2}
            marginBottom={1}
          >
            <Grid item md={6}>
              <ControlledTextInput
                name="siteId"
                label="Site"
                items={state.sites.map((x) => ({
                  description: x.name,
                  value: x.id,
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
            </Grid>
            <Grid item md={6}>
              <ControlledTextInput
                name="buildingId"
                label="Prédio"
                items={state.buildings.map((x) => ({
                  description: x.name,
                  value: x.id,
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
            </Grid>
            <Grid item md={6}>
              <ControlledTextInput
                name="floorId"
                label="Andar"
                items={state.floors.map((x) => ({
                  description: x.name,
                  value: x.id,
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
            </Grid>
            <Grid item md={6}>
              <ControlledTextInput
                name="roomId"
                label="Sala"
                items={state.rooms.map((x) => ({
                  description: x.name,
                  value: x.id,
                }))}
              />
            </Grid>
          </Grid>

          <Typography variant="subtitle1">Descrição</Typography>
          <Grid
            container
            columnSpacing={1}
            rowSpacing={1}
            marginTop={0.2}
            marginBottom={1}
          >
            <Grid item md={12}>
              <ControlledTextInput
                name="description"
                label="Descrição"
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
          <SubmitButton disabled={!isValid} sx={{ mt: 1 }} />
          {/* <Button onClick={onCancel}>Cancelar</Button> */}
        </Form>
      </FormProvider>
    </Modal>
  );
};

type FormProps = {
  name: string;
  localization: string;
  size: string;
  capacity: number;
  power: number;
  weight: number;
  description: string;
  roomId: string;
  floorId: string;
  buildingId: string;
  siteId: string;
};

const validationSchema: SchemaOf<FormProps> = object().shape({
  name: string().required("Nome é obrigatório"),
  localization: string().required("Localização do rack é obrigatória"),
  size: string().required("Tamanho do rack é obrigatório"),
  capacity: number().required("Capacidade é obrigatório"),
  power: number().required("Potência é obrigatória"),
  weight: number().required("Peso total do rack é obrigatório"),
  description: string().required("Descrição é obrigatório"),
  roomId: string().required("Sala é obrigatória"),
  floorId: string().required("Andar é obrigatório"),
  buildingId: string().required("Prédio é obrigatório"),
  siteId: string().required("Site é obrigatório"),
});

export default RackFormModal;
