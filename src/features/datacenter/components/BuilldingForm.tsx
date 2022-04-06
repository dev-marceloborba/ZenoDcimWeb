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
import { useAddBuildingMutation } from "app/services/datacenter";
import { useToast } from "app/components/Toast";
import Loading from "app/components/Loading";
import { BuildingRequest } from "app/models/data-center.model";

const BuildingForm: React.FC = () => {
  const [addBuilding, { isLoading, error, isError }] = useAddBuildingMutation();
  const toast = useToast();
  const methods = useForm<BuildingRequest>({
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<BuildingRequest> = async (data) => {
    try {
      const { data: building } = await addBuilding(data).unwrap();
      console.log(building);
      toast.open(`Prédio ${data.name} criado com sucesso`, 2000, "success");
    } catch (error) {
      console.log(error);
      toast.open(
        `Erro ao excluir prédio ${data.name}: ${error}`,
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
      <Loading open={isLoading} />
    </Card>
  );
};

const validationSchema: SchemaOf<BuildingRequest> = object().shape({
  campus: string().required("Campus é obrigatório"),
  name: string().required("Nome é obrigatório"),
});

export default BuildingForm;
