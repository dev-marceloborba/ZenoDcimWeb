import React from "react";
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
import { useToast } from "modules/shared/components/ToastProvider";
import Loading from "modules/shared/components/Loading";
import { useCreateBuildingMutation } from "modules/datacenter/services/building-service";
import { BuildingViewModel } from "modules/datacenter/models/datacenter-model";

const BuildingForm: React.FC = () => {
  const [addBuilding, { isLoading, error, isError }] =
    useCreateBuildingMutation();
  const toast = useToast();
  const methods = useForm<BuildingViewModel>({
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<BuildingViewModel> = async (data) => {
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

const validationSchema: SchemaOf<BuildingViewModel> = object().shape({
  campus: string().required("Campus é obrigatório"),
  name: string().required("Nome é obrigatório"),
});

export default BuildingForm;
