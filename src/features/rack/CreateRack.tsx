import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { useCreateRackMutation } from "app/services/rack";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaOf, object, number, string } from "yup";
import ControlledTextInput from "app/components/ControlledTextInput";
import { RackRequest } from "app/models/rack.model";

const CreateRack: React.FC = () => {
  const methods = useForm<RackRequest>({
    resolver: yupResolver(schema),
  });
  const [addRack, { isLoading, isError, error }] = useCreateRackMutation();

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<RackRequest> = async (data) => {
    try {
      await addRack(data).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxWidth="xs">
      <Toolbar />
      <Typography variant="h4">Criar novo rack</Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ maxWidth: "640px", "& .MuiTextField-root": { mt: 2 } }}
      >
        <FormProvider {...methods}>
          <ControlledTextInput name="localization" label="Localização" />

          <ControlledTextInput name="size" label="Tamanho" />

          <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
            Criar rack
          </Button>
        </FormProvider>
      </Box>
    </Container>
  );
};

const schema: SchemaOf<RackRequest> = object().shape({
  localization: string().required("Localização é obrigatório"),
  size: number().required("Tamanho é obrigatório"),
});

export default CreateRack;
