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
  FloorRequest,
  useAddFloorMutation,
  useListBuildingsQuery,
} from "app/services/datacenter";

const FloorForm: React.FC = () => {
  const methods = useForm<FloorRequest>({
    resolver: yupResolver(validationSchema),
  });

  const [addFloor, { isLoading, error, isError }] = useAddFloorMutation();
  const { data: buildings, isLoading: isLoadingBuildings } =
    useListBuildingsQuery();

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<FloorRequest> = async (data) => {
    try {
      console.log(data);
      const { data: floor } = await addFloor(data).unwrap();
      console.log(floor);
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
            <Typography variant="h5">Novo andar</Typography>
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
                items={
                  buildings?.map((building) => ({
                    description: building.name,
                    value: building.id,
                  })) ?? []
                }
              />
              <ControlledTextInput name="name" label="Nome do andar" />
              <SubmitButton label="Salvar" />
            </FormProvider>
          </Form>
        </Grid>
      </Grid>
    </Card>
  );
};

const validationSchema: SchemaOf<FloorRequest> = object().shape({
  name: string().required("Nome é obrigatório"),
  buildingId: string().required("Prédio é obrigatório"),
});

export default FloorForm;
