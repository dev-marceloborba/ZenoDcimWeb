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
import { useCreateFloorMutation } from "modules/datacenter/services/floor-service";
import { useFindAllBuildingsQuery } from "modules/datacenter/services/building-service";
import { FloorViewModel } from "modules/datacenter/models/datacenter-model";
import useRouter from "modules/core/hooks/useRouter";
import Loading from "modules/shared/components/Loading";

const FloorForm: React.FC = () => {
  const [addFloor, { isLoading }] = useCreateFloorMutation();
  const { data: buildings, isLoading: isLoadingBuildings } =
    useFindAllBuildingsQuery();
  const toast = useToast();
  const { back } = useRouter();

  const methods = useForm<FloorViewModel>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid, isSubmitSuccessful },
  } = methods;

  const onSubmit: SubmitHandler<FloorViewModel> = async (data) => {
    try {
      await addFloor(data).unwrap();
      toast
        .open({ message: `${data.name} criado com sucesso` })
        .then(() => back());
    } catch (error) {
      toast.open({
        message: `Erro ao criar ${data.name}: ${error}`,
        severity: "error",
      });
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        buildingId: "",
        name: "",
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
              <SubmitButton disabled={!isValid} label="Salvar" />
            </FormProvider>
          </Form>
        </Grid>
      </Grid>
      <Loading open={isLoading || isLoadingBuildings} />
    </Card>
  );
};

const validationSchema: SchemaOf<FloorViewModel> = object().shape({
  name: string().required("Nome é obrigatório"),
  buildingId: string().required("Prédio é obrigatório"),
});

export default FloorForm;
