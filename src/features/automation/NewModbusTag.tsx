import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useCreateModbusTagMutation } from "app/services/automation";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaOf, object, string, number } from "yup";
import ControlledTextInput from "app/components/ControlledTextInput";
import { ModbusTagRequest } from "app/models/automation.model";
import Form from "app/components/Form";
import SubmitButton from "app/components/SubmitButton";
import Loading from "app/components/Loading";
import { useToast } from "app/components/Toast";

const NewModbusTag: React.FC = () => {
  const methods = useForm<ModbusTagRequest>({
    resolver: yupResolver(validationSchema),
  });
  const [addModbusTag, { isLoading }] = useCreateModbusTagMutation();
  const toast = useToast();

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<ModbusTagRequest> = async (data) => {
    try {
      const result = await addModbusTag(data).unwrap();
      toast.open(`Tag ${result.data.name} criado com sucesso`, 2000, "success");
    } catch (error) {
      toast.open(`Erro ao criar tag: ${error}`, 2000, "error");
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5">Criar Tag Modbus</Typography>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        sx={{ maxWidth: "640px", "& .MuiTextField-root": { mt: 2 } }}
      >
        <FormProvider {...methods}>
          <ControlledTextInput name="modbusDevice" label="Dispositivo Modbus" />
          <ControlledTextInput name="name" label="Nome" />
          <ControlledTextInput name="dataType" label="Tipo de dado" />
          <ControlledTextInput name="address" label="Endereço" />
          <ControlledTextInput name="size" label="Tamanho" />
          <ControlledTextInput name="deadband" label="Banda morta" />
          <SubmitButton sx={{ mt: 2 }} fullWidth label="Criar" />
        </FormProvider>
      </Form>
      <Loading open={isLoading} />
    </Container>
  );
};

export default NewModbusTag;

const validationSchema = object().shape({
  modbusDevice: string().required("Dispositivo Modbus é obrigatório"),
  name: string().required("Nome é obrigatório"),
  dataType: string().required("Tipo de dado é obrigatório"),
  address: number().required("Endereço é obrigatório"),
  size: number().required("Tamanho é obrigatório"),
  deadband: number().required("Banda morta é obrigatória"),
});
