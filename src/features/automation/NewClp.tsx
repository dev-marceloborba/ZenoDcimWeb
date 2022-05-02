import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ControlledTextInput from "app/components/ControlledTextInput";

import { useAddPlcMutation } from "app/services/automation";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaOf, object, number, string } from "yup";
import { PlcRequest } from "app/models/automation.model";
import Form from "app/components/Form";
import { useToast } from "app/components/Toast";
import Loading from "app/components/Loading";
import SubmitButton from "app/components/SubmitButton";

const NewClp: React.FC = () => {
  const methods = useForm<PlcRequest>({
    resolver: yupResolver(validationSchema),
  });
  const [mutation, { isLoading }] = useAddPlcMutation();
  const toast = useToast();

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<PlcRequest> = async (data) => {
    try {
      const result = await mutation(data).unwrap();
      toast.open(`CLP ${result.data.name} criado com sucesso`, 2000, "success");
    } catch (error) {
      toast.open(`Erro ao criar CLP: ${error}`, 2000, "error");
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5">Criar PLC</Typography>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        sx={{ maxWidth: "640px", "& .MuiTextField-root": { mt: 2 } }}
      >
        <FormProvider {...methods}>
          <ControlledTextInput name="name" label="Nome" />
          <ControlledTextInput name="manufactor" label="Fabricante" />
          <ControlledTextInput name="ipAddress" label="Endereço IP" />
          <ControlledTextInput name="tcpPort" label="Porta TCP/IP" />
          <ControlledTextInput name="scan" label="Varredura" />
          <SubmitButton sx={{ mt: 2 }} label="Criar" fullWidth />
        </FormProvider>
      </Form>
      <Loading open={isLoading} />
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
