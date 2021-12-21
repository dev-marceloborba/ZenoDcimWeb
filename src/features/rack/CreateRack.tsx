import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import TextInput from "app/components/TextInput";
import { RackRequest, useCreateRackMutation } from "app/services/rack";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const CreateRack: React.FC = () => {
  const { control, handleSubmit } = useForm<RackRequest>({
    resolver: yupResolver(schema),
  });
  const [addRack, { isLoading, isError, error }] = useCreateRackMutation();

  const onSubmit: SubmitHandler<RackRequest> = async (data) => {
    try {
      await addRack(data).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxWidth="xl">
      <Toolbar />
      <Typography variant="h4">Criar novo rack</Typography>
      <Box
        sx={{ maxWidth: "640px" }}
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="localization"
          control={control}
          defaultValue={""}
          render={({ field, formState: { errors } }) => (
            <TextInput
              {...field}
              label="Localização"
              helperText={errors.localization?.message}
            />
          )}
        />

        <Controller 
          name="size"
          control={control}
          defaultValue={""}
          render={({ field, formState: { errors} }) => (
              <TextInput
                 {...field}
                label="Tamanho"
                helperText={errors.size?.message}
              />
          )}
        />
        <Button fullWidth type="submit" variant="contained" sx={{ mt: 1 }}>
          Criar rack
        </Button>
      </Box>
    </Container>
  );
};

const schema = Yup.object().shape({
  localization: Yup.string().required("Localização é obrigatório"),
  size: Yup.number().required("Tamanho é obrigatório"),
});

export default CreateRack;
