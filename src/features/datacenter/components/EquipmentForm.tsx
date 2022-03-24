import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaOf, string, object } from "yup";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Form from "app/components/Form";
import Typography from "@mui/material/Typography";
import ControlledTextInput from "app/components/ControlledTextInput";
import SubmitButton from "app/components/SubmitButton";
import {
  EquipmentRequest,
  FloorResponse,
  RoomResponse,
  useAddEquipmentMutation,
  useListBuildingsQuery,
} from "app/services/datacenter";
import { useToast } from "app/components/Toast";

const EquipmentForm: React.FC = () => {
  const [addEquipment, { isLoading, error, isError }] =
    useAddEquipmentMutation();
  const { data: buildings } = useListBuildingsQuery();
  const [floors, setFloors] = useState<FloorResponse[]>([]);
  const [rooms, setRooms] = useState<RoomResponse[]>([]);
  const toast = useToast();

  const methods = useForm<EquipmentRequest>({
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

  const onSubmit: SubmitHandler<EquipmentRequest> = async (data) => {
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
              <SubmitButton label="Salvar" />
            </FormProvider>
          </Form>
        </Grid>
      </Grid>
    </Card>
  );
};

const validationSchema: SchemaOf<EquipmentRequest> = object().shape({
  buildingId: string().required("Prédio é obrigatório"),
  floorId: string().required("Andar é obrigatório"),
  roomId: string().required("Sala é obrigatória"),
  class: string().required("Classe é obrigatória"),
  component: string().required("Componente é obrigatório"),
  componentCode: string().required("Componente é obrigatório"),
  description: string().required("Descrição é obrigatório"),
});

export default EquipmentForm;
