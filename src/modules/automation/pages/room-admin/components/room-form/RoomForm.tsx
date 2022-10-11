import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaOf, string, object } from "yup";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Form from "modules/shared/components/Form";
import Typography from "@mui/material/Typography";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import SubmitButton from "modules/shared/components/SubmitButton";
import { useCreateRoomMutation } from "modules/datacenter/services/room-service";
import { useFindAllBuildingsQuery } from "modules/datacenter/services/building-service";
import {
  FloorModel,
  RoomViewModel,
} from "modules/datacenter/models/datacenter-model";
import { useToast } from "modules/shared/components/ToastProvider";
import useRouter from "modules/core/hooks/useRouter";
import Loading from "modules/shared/components/Loading";

const RoomForm: React.FC = () => {
  const [addRoom, { isLoading }] = useCreateRoomMutation();
  const { data: buildings } = useFindAllBuildingsQuery();
  const [floors, setFloors] = useState<FloorModel[]>([]);
  const toast = useToast();
  const { back } = useRouter();

  const methods = useForm<RoomViewModel>({
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit, watch } = methods;

  const buildingWatcher = watch("buildingId");

  useEffect(() => {
    const selectedBulding = buildings?.filter(
      (building) => building.id === buildingWatcher
    )[0];
    console.log(selectedBulding);
    setFloors(selectedBulding?.floors ?? []);
  }, [buildingWatcher, buildings]);

  const onSubmit: SubmitHandler<RoomViewModel> = async (data) => {
    try {
      await addRoom(data).unwrap();
      toast
        .open({ message: `Sala ${data.name} criada com sucesso` })
        .then(() => back());
    } catch (error) {
      toast.open({
        message: `Erro ao criar a sala ${data.name}: ${error}`,
        severity: "error",
      });
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
      <Loading open={isLoading} />
    </Card>
  );
};

const validationSchema: SchemaOf<RoomViewModel> = object().shape({
  name: string().required("Nome é obrigatório"),
  buildingId: string().required("Prédio é obrigatório"),
  floorId: string().required("Andar é obrigatório"),
});

export default RoomForm;
