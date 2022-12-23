import Modal, { ModalProps } from "modules/shared/components/modal/Modal";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaOf, string, object, number } from "yup";
import Form from "modules/shared/components/Form";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import SubmitButton from "modules/shared/components/SubmitButton";
import { EquipmentViewModel } from "modules/automation/models/automation-model";
import useDataCenterLocales from "modules/maintenance/pages/register/hooks/data-center-locales.hook";
import { useEffect } from "react";

type FormMode = "new" | "edit";

type EquipmentFormModalProps = {
  mode?: FormMode;
  onConfirm(): void;
  data?: {
    site: string;
    building: string;
    floor: string;
    room: string;
    manufactor: string;
    name: string;
    serialNumber: string;
    group: number;
    weight: number;
    size: string;
    powerLimit: number;
    description: string;
  };
} & ModalProps;

const EquipmentFormModal: React.FC<EquipmentFormModalProps> = ({
  mode = "new",
  onConfirm,
  data,
  ...props
}) => {
  const { sites, buildings, floors, rooms, actions } = useDataCenterLocales();
  const methods = useForm<EquipmentViewModel>({
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit, reset, watch } = methods;

  const siteWatcher = watch("siteId");
  const buildingWatcher = watch("buildingId");
  const floorWatcher = watch("floorId");

  useEffect(() => {
    if (siteWatcher) {
      actions.getBuildings(siteWatcher);
    }
  }, [actions, siteWatcher]);

  useEffect(() => {
    if (buildingWatcher) {
      actions.getFloors(buildingWatcher);
    }
  }, [actions, buildingWatcher]);

  useEffect(() => {
    if (floorWatcher) {
      actions.getRooms(floorWatcher);
    }
  }, [actions, floorWatcher]);

  useEffect(() => {
    if (data && mode === "edit") {
      reset({
        siteId: data.site,
        buildingId: data.building,
        floorId: data.floor,
        roomId: data.room,
        component: data.name,
        description: data.description,
        componentCode: data.serialNumber,
        group: data.group,
        powerLimit: data.powerLimit,
        size: data.size,
        weight: data.weight,
      });
    }
  }, [data, mode, reset]);

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
                items={sites?.map((site) => ({
                  description: site.name,
                  value: site.id,
                }))}
                // onChange={(e) => actions.getBuildings(e.target.value)}
              />
            </Grid>
            <Grid item md={6}>
              <ControlledTextInput
                name="buildingId"
                label="Prédio"
                items={buildings?.map((building) => ({
                  description: building.name,
                  value: building.id,
                }))}
                // onChange={(e) => actions.getFloors(e.target.value)}
              />
            </Grid>
            <Grid item md={6}>
              <ControlledTextInput
                name="floorId"
                label="Andar"
                forceSelect
                items={floors?.map((floor) => ({
                  description: floor.name,
                  value: floor.id,
                }))}
                // onChange={(e) => actions.getRooms(e.target.value)}
              />
            </Grid>
            <Grid item md={6}>
              <ControlledTextInput
                name="roomId"
                label="Sala"
                forceSelect
                items={rooms?.map((room) => ({
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
            <Grid item md={6}>
              <ControlledTextInput name="manufactor" label="Fabricante" />
            </Grid>
            <Grid item md={6}>
              <ControlledTextInput
                fullWidth
                name="component"
                label="Componente"
              />
            </Grid>
            <Grid item md={6}>
              <ControlledTextInput
                fullWidth
                name="componentCode"
                label="Código/Nº de série"
              />
            </Grid>
            <Grid item md={6}>
              <ControlledTextInput
                fullWidth
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
          </Grid>

          <Typography variant="subtitle1" sx={{ my: 1 }}>
            Características
          </Typography>
          <Grid container columnSpacing={1}>
            <Grid item md={4}>
              <ControlledTextInput
                fullWidth
                name="weight"
                label="Peso (kg)"
                defaultValue={0}
              />
            </Grid>
            <Grid item md={4}>
              <ControlledTextInput
                fullWidth
                name="size"
                label="Tamanho (LxAxC cm)"
              />
            </Grid>
            <Grid item md={4}>
              <ControlledTextInput
                fullWidth
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
            fullWidth
            multiline
            rows={2}
            name="description"
            label="Descrição"
          />

          <SubmitButton sx={{ mt: 1 }} />
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
});
