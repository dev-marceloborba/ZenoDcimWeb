import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaOf, string, object, number } from "yup";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Form from "modules/shared/components/Form";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import SubmitButton from "modules/shared/components/SubmitButton";
import { useToast } from "modules/shared/components/ToastProvider";
import { useCreateEquipmentMutation } from "modules/automation/services/equipment-service";
import {
  FloorModel,
  RoomModel,
} from "modules/datacenter/models/datacenter-model";
import { EquipmentViewModel } from "modules/automation/models/automation-model";
import { useFindAllBuildingsQuery } from "modules/datacenter/services/building-service";
import Loading from "modules/shared/components/Loading";

const EquipmentForm: React.FC = () => {
  const [addEquipment, { isLoading }] = useCreateEquipmentMutation();
  const { data: buildings } = useFindAllBuildingsQuery();
  const [floors, setFloors] = useState<FloorModel[]>([]);
  const [rooms, setRooms] = useState<RoomModel[]>([]);
  const toast = useToast();

  const methods = useForm<EquipmentViewModel>({
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit, watch } = methods;

  const buildingId = watch("buildingId");
  const floorId = watch("floorId");

  useEffect(() => {
    const filteredBuilding = buildings?.find(
      (building) => building.id === buildingId
    );
    setFloors(filteredBuilding?.floors ?? []);
  }, [buildingId, buildings]);

  useEffect(() => {
    const filteredFloors = floors?.find((floor) => floor.id === floorId);
    setRooms(filteredFloors?.rooms ?? []);
  }, [floorId, floors]);

  const onSubmit: SubmitHandler<EquipmentViewModel> = async (data) => {
    try {
      await addEquipment(data).unwrap();
      toast.open(
        `Equipamento ${data.description} criado com sucesso`,
        2000,
        "success"
      );
    } catch (error) {
      toast.open(
        `Erro ao excluir o equipamento ${data.description}: ${error}`,
        2000,
        "error"
      );
    }
  };
  return (
    <Card sx={{ mt: 2, padding: "16px 24px" }}>
      <CardContent>
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                height: "100%",
              }}
            >
              <Typography variant="h5">Novo equipamento</Typography>
            </Box>
          </Grid>

          <Grid item md={6}>
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
                  items={buildings?.map((building) => ({
                    description: building.name,
                    value: building.id,
                  }))}
                />
                <ControlledTextInput
                  name="floorId"
                  label="Andar"
                  forceSelect
                  items={floors?.map((floor) => ({
                    description: floor.name,
                    value: floor.id,
                  }))}
                />
                <ControlledTextInput
                  name="roomId"
                  label="Sala"
                  forceSelect
                  items={rooms?.map((room) => ({
                    description: room.name,
                    value: room.id,
                  }))}
                />
                <ControlledTextInput
                  fullWidth
                  name="class"
                  label="Classe"
                  items={Array.from({ length: 11 }).map((_, i) => ({
                    description: `${i + 1}`,
                    value: `${i + 1}`,
                  }))}
                />
                <ControlledTextInput
                  fullWidth
                  name="component"
                  label="Componente"
                />
                <ControlledTextInput
                  fullWidth
                  name="componentCode"
                  label="Código do componente"
                />
                <ControlledTextInput
                  fullWidth
                  name="description"
                  label="Descrição"
                />
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

                <SubmitButton label="Salvar" />
              </FormProvider>
            </Form>
          </Grid>
        </Grid>
        <Loading open={isLoading} />
      </CardContent>
    </Card>
  );
};

const validationSchema: SchemaOf<EquipmentViewModel> = object().shape({
  buildingId: string().required("Prédio é obrigatório"),
  floorId: string().required("Andar é obrigatório"),
  roomId: string().required("Sala é obrigatória"),
  class: string().required("Classe é obrigatória"),
  component: string().required("Componente é obrigatório"),
  componentCode: string().required("Componente é obrigatório"),
  description: string().required("Descrição é obrigatório"),
  group: number().required("Grupo é obrigatório"),
});

export default EquipmentForm;
