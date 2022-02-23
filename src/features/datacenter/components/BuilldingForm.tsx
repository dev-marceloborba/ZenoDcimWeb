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
  BuildingRequest,
  useAddBuildingMutation,
} from "app/services/datacenter";

const BuildingForm: React.FC = () => {
  const methods = useForm<BuildingRequest>({
    resolver: yupResolver(validationSchema),
  });

  const [addBuilding, { isLoading, error, isError }] = useAddBuildingMutation();

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<BuildingRequest> = async (data) => {
    try {
      const { data: building } = await addBuilding(data).unwrap();
      console.log(building);
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
            <Typography variant="h5">Novo prédio</Typography>
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
                name="campus"
                label="Campus"
                items={[{ description: "Canoas", value: "Canoas" }]}
              />
              <ControlledTextInput name="name" label="Nome do prédio" />
              <SubmitButton label="Salvar" />
            </FormProvider>
          </Form>
        </Grid>
      </Grid>
    </Card>
  );
};

const validationSchema: SchemaOf<BuildingRequest> = object().shape({
  campus: string().required("Campus é obrigatório"),
  name: string().required("Nome é obrigatório"),
});

export default BuildingForm;
