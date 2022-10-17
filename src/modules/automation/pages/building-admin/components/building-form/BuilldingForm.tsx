import React, { useEffect } from "react";
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
import { useFindAllSitesQuery } from "modules/datacenter/services/site-service";
import useRouter from "modules/core/hooks/useRouter";

const BuildingForm: React.FC = () => {
  const [addBuilding, { isLoading }] = useCreateBuildingMutation();
  const { data: sites, isLoading: isLoadingSites } = useFindAllSitesQuery();
  const methods = useForm<BuildingViewModel>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
  const toast = useToast();
  const { back } = useRouter();

  const {
    handleSubmit,
    reset,
    formState: { isValid, isSubmitSuccessful },
  } = methods;

  const onSubmit: SubmitHandler<BuildingViewModel> = async (data) => {
    try {
      const { data: building } = await addBuilding(data).unwrap();
      toast
        .open({ message: `Prédio ${building.name} criado com sucesso` })
        .then(() => back());
    } catch (error) {
      toast.open({
        message: `Erro ao incluir prédio ${data.name}: ${error}`,
        severity: "error",
      });
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        name: "",
        siteId: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

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
                name="siteId"
                label="Site"
                items={
                  sites?.map((site) => ({
                    description: site.name,
                    value: site.id,
                  })) ?? []
                }
              />
              <ControlledTextInput name="name" label="Nome do prédio" />
              <SubmitButton disabled={!isValid} label="Salvar" />
            </FormProvider>
          </Form>
        </Grid>
      </Grid>
      <Loading open={isLoading || isLoadingSites} />
    </Card>
  );
};

const validationSchema: SchemaOf<BuildingViewModel> = object().shape({
  name: string().required("Nome é obrigatório"),
  siteId: string().required("Site é obrigatório"),
});

export default BuildingForm;
