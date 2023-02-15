import Modal, { ModalProps } from "modules/shared/components/modal/Modal";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaOf, string, object, number } from "yup";
import Form, { FormMode } from "modules/shared/components/Form";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import SubmitButton from "modules/shared/components/SubmitButton";
import {
  EEquipmentStatus,
  EquipmentModel,
  EquipmentViewModel,
} from "modules/automation/models/automation-model";
import { useEffect, useReducer } from "react";
import { useFindAllSitesQuery } from "modules/datacenter/services/site-service";
import locationReducer, {
  locationInitialState,
  LocationReducerType,
} from "modules/core/reducers/locationReducer";
import { SiteModel } from "modules/datacenter/models/datacenter-model";

type EquipmentFormModalProps = {
  mode?: FormMode;
  onConfirm(formData: EquipmentViewModel): void;
  //   data?: Partial<EquipmentModel>;
  data?: {
    model?: Partial<EquipmentModel>;
    sites?: SiteModel[];
  };
} & ModalProps;

const EquipmentFormModal: React.FC<EquipmentFormModalProps> = ({
  mode = "new",
  onConfirm,
  data,
  ...props
}) => {
  const [state, dispatch] = useReducer(locationReducer, locationInitialState);
  const methods = useForm<EquipmentViewModel>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: data?.model,
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  useEffect(() => {
    dispatch({
      type: LocationReducerType.GET_SITES,
      payload: { sites: data?.sites },
    });
    if (mode === "edit") {
      dispatch({
        type: LocationReducerType.GET_BUILDINGS_BY_SITE,
        payload: {
          siteId: data?.model?.siteId,
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
    data?.model?.floorId,
    data?.model?.siteId,
    data?.sites,
    mode,
  ]);

  return (
    <Modal {...props}>
      <Form onSubmit={handleSubmit(onConfirm)}>
        <FormProvider {...methods}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Localização
          </Typography>
          <Grid container columnSpacing={1} rowSpacing={1}>
            <Grid item md={6}>
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
            </Grid>
            <Grid item md={6}>
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
            </Grid>
            <Grid item md={6}>
              <ControlledTextInput
                name="floorId"
                label="Andar"
                forceSelect
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
            </Grid>
            <Grid item md={6}>
              <ControlledTextInput
                name="roomId"
                label="Sala"
                forceSelect
                items={state.rooms.map((room) => ({
                  description: room.name,
                  value: room.id,
                }))}
              />
            </Grid>
          </Grid>

          <Typography variant="subtitle1" sx={{ my: 1 }}>
            Identidade
          </Typography>
          <Grid container columnSpacing={1} rowSpacing={1}>
            <Grid item md={12}>
              <ControlledTextInput name="manufactor" label="Fabricante" />
            </Grid>
            <Grid item md={6}>
              <ControlledTextInput name="component" label="Componente" />
            </Grid>
            <Grid item md={6}>
              <ControlledTextInput
                name="componentCode"
                label="Código/Nº de série"
              />
            </Grid>
            <Grid item md={6}>
              <ControlledTextInput
                name="group"
                label="Grupo"
                items={[
                  {
                    description: "Energia",
                    value: 0,
                  },
                  {
                    description: "Clima",
                    value: 1,
                  },
                  {
                    description: "Telecom",
                    value: 2,
                  },
                ]}
              />
            </Grid>
            <Grid item md={6}>
              <ControlledTextInput
                name="status"
                label="Status"
                items={[
                  {
                    description: "Arquivado",
                    value: 0,
                  },
                  {
                    description: "Instalado",
                    value: 1,
                  },
                  {
                    description: "Fora da planta",
                    value: 2,
                  },
                  {
                    description: "Planejado",
                    value: 3,
                  },
                  {
                    description: "Desligado",
                    value: 4,
                  },
                  {
                    description: "Armazenado",
                    value: 5,
                  },
                ]}
              />
            </Grid>
          </Grid>

          <Typography variant="subtitle1" sx={{ my: 1 }}>
            Características
          </Typography>
          <Grid container columnSpacing={1}>
            <Grid item md={4}>
              <ControlledTextInput
                name="weight"
                label="Peso (kg)"
                defaultValue={0}
              />
            </Grid>
            <Grid item md={4}>
              <ControlledTextInput name="size" label="Tamanho (LxAxC cm)" />
            </Grid>
            <Grid item md={4}>
              <ControlledTextInput
                name="powerLimit"
                label="Potência limite (W)"
                defaultValue={0}
              />
            </Grid>
          </Grid>
          <Typography variant="subtitle1" sx={{ my: 1 }}>
            Descrição
          </Typography>
          <ControlledTextInput
            multiline
            rows={2}
            name="description"
            label="Descrição"
          />

          <SubmitButton disabled={!isValid} sx={{ mt: 1 }} />
        </FormProvider>
      </Form>
    </Modal>
  );
};

export default EquipmentFormModal;

const validationSchema: SchemaOf<EquipmentViewModel> = object().shape({
  siteId: string().required("Site é obrigatório"),
  buildingId: string().required("Prédio é obrigatório"),
  floorId: string().required("Andar é obrigatório"),
  roomId: string().required("Sala é obrigatória"),
  component: string().required("Componente é obrigatório"),
  componentCode: string().required("Componente é obrigatório"),
  description: string().required("Descrição é obrigatório"),
  group: number().required("Grupo é obrigatório"),
  weight: number().required("Peso é obrigatório"),
  size: string().required("Classe é obrigatória"),
  powerLimit: number().required("Potência é obrigatória"),
  manufactor: string().required("Fabricante é obrigatório"),
  status: number().required("Status é obrigatório"),
});
