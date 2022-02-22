import React from "react";
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
  useAddEquipmentMutation,
  useListBuildingsQuery,
  useListFloorQuery,
  useListRoomQuery,
} from "app/services/datacenter";

const EquipmentForm: React.FC = () => {
  const methods = useForm<EquipmentRequest>({
    resolver: yupResolver(validationSchema),
  });

  const [addEquipment, { isLoading, error, isError }] =
    useAddEquipmentMutation();

  const { data: buildings } = useListBuildingsQuery();
  const { data: floors } = useListFloorQuery();
  const { data: rooms } = useListRoomQuery();

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<EquipmentRequest> = async (data) => {
    try {
      const { data: equipment } = await addEquipment(data).unwrap();
      console.log(equipment);
    } catch (error) {
      console.log(error);
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
                items={floors?.map((floor) => ({
                  description: floor.name,
                  value: floor.id,
                }))}
              />
              <ControlledTextInput
                name="roomId"
                label="Sala"
                items={rooms?.map((room) => ({
                  description: room.name,
                  value: room.id,
                }))}
              />

              <ControlledTextInput fullWidth name="class" label="Classe" />
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

const validationSchema = object().shape({
  class: string().required("Classe é obrigatória"),
  component: string().required("Componente é obrigatório"),
  componentCode: string().required("Componente é obrigatório"),
  description: string().required("Descrição é obrigatório"),
});

export default EquipmentForm;
