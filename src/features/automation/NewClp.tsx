import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { PlcRequest, useAddPlcMutation } from "app/services/automation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import TextInput from "app/components/TextInput";

const NewClp: React.FC = () => {
  const { control, handleSubmit } = useForm<PlcRequest>({
    resolver: yupResolver(validationSchema),
  });
  const [mutation, { isLoading, isError }] = useAddPlcMutation();

  const onSubmit: SubmitHandler<PlcRequest> = async (data) => {
    try {
      const result = await mutation(data).unwrap();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5">Criar PLC</Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ maxWidth: "640px" }}
      >
        <Controller 
          name="name"
          defaultValue={""}
          control={control}
          render={({field, formState: { errors }}) => (
            <TextInput {...field} label="Nome" helperText={errors.name?.message } />
          )}
        />
        
        <TextInput name="manufactor" label="Fabricante" />
        <TextInput name="ipAddress" label="Endereço IP" />
        <TextInput name="tcpPort" label="Porta TCP/IP" />
        <TextInput name="scan" label="Varredura" />
        <Button
          sx={{ mt: 2 }}
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
        >
          Criar
        </Button>
      </Box>
    </Container>
  );
};

export default NewClp;

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  manufactor: Yup.string().required("Fabricante é obrigatório"),
  model: Yup.string().required("Modelo é obrigatório"),
  ipAddress: Yup.string().required("Endereço IP é obrigatório"),
  tcpPort: Yup.number().required("Porta TCP é obrigatória"),
  scan: Yup.number().required("Varredura é obrigatória"),
});
