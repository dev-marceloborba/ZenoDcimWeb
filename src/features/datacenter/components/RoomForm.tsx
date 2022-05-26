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
  useCreateRoomMutation,
  useFindAllBuildingsQuery,
} from "app/services/datacenter";
import { useToast } from "app/components/Toast";
import { FloorResponse, RoomRequest } from "app/models/data-center.model";

const RoomForm: React.FC = () => {
  const [addRoom, { isLoading, error, isError }] = useCreateRoomMutation();
  const { data: buildings } = useFindAllBuildingsQuery();
  const [floors, setFloors] = useState<FloorResponse[]>([]);
  const toast = useToast();

  const methods = useForm<RoomRequest>({
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit, watch } = methods;

  const buildingWatcher = watch("buildingId");

  useEffect(() => {
    const selectedBulding = buildings?.filter(
      (building) => building.id === buildingWatcher
    )[0];
    setFloors(selectedBulding?.floors ?? []);
  }, [buildingWatcher, buildings]);

  const onSubmit: SubmitHandler<RoomRequest> = async (data) => {
    try {
      await addRoom(data).unwrap();
      toast.open(`Sala ${data.name} criada com sucesso`, 2000, "success");
    } catch (error) {
      toast.open(
        `Erro ao excluir a sala ${data.name}: ${error}`,
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
            <Typography variant="h5">Nova sala</Typography>
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
              <ControlledTextInput name="name" label="Nome da sala" />
              <SubmitButton label="Salvar" />
            </FormProvider>
          </Form>
        </Grid>
      </Grid>
    </Card>
  );
};

const validationSchema: SchemaOf<RoomRequest> = object().shape({
  name: string().required("Nome é obrigatório"),
  buildingId: string().required("Prédio é obrigatório"),
  floorId: string().required("Andar é obrigatório"),
});

export default RoomForm;
