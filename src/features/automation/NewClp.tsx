import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ControlledTextInput from "app/components/ControlledTextInput";

import { useAddPlcMutation } from "app/services/automation";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaOf, object, number, string } from "yup";
import { PlcRequest } from "app/models/automation.model";

const NewClp: React.FC = () => {
  const methods = useForm<PlcRequest>({
    resolver: yupResolver(validationSchema),
  });
  const [mutation, { isLoading, isError }] = useAddPlcMutation();

  const { handleSubmit } = methods;

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
        sx={{ maxWidth: "640px", "& .MuiTextField-root": { mt: 2 } }}
      >
        <FormProvider {...methods}>
          <ControlledTextInput name="name" label="Nome" />
          <ControlledTextInput name="manufactor" label="Fabricante" />
          <ControlledTextInput name="ipAddress" label="Endereço IP" />
          <ControlledTextInput name="tcpPort" label="Porta TCP/IP" />
          <ControlledTextInput name="scan" label="Varredura" />
          <Button
            sx={{ mt: 2 }}
            fullWidth
            type="submit"
            color="primary"
            variant="contained"
          >
            Criar
          </Button>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default NewClp;

const validationSchema: SchemaOf<PlcRequest> = object().shape({
  name: string().required("Nome é obrigatório"),
  manufactor: string().required("Fabricante é obrigatório"),
  model: string().required("Modelo é obrigatório"),
  ipAddress: string().required("Endereço IP é obrigatório"),
  tcpPort: number().required("Porta TCP é obrigatória"),
  scan: number().required("Varredura é obrigatória"),
});
