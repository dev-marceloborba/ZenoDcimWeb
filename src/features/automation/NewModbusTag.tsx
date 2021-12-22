import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {
  ModbusTagRequest,
  useAddModbusTagMutation,
} from "app/services/automation";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaOf, object, string, number } from "yup";
import ControlledTextInput from "app/components/ControlledTextInput";

const NewModbusTag: React.FC = () => {
  const methods = useForm<ModbusTagRequest>({
    resolver: yupResolver(validationSchema),
  });
  const [addModbusTag, { isLoading, isError }] = useAddModbusTagMutation();

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<ModbusTagRequest> = async (data) => {
    try {
      const result = await addModbusTag(data).unwrap();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5">Criar Tag Modbus</Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ maxWidth: "640px", '& .MuiTextField-root': { mt: 2 } }}
      >
        <FormProvider {...methods}>
          <ControlledTextInput name="modbusDevice" label="Dispositivo Modbus" />
          <ControlledTextInput name="name" label="Nome" />
          <ControlledTextInput name="dataType" label="Tipo de dado" />
          <ControlledTextInput name="address" label="Endereço" />
          <ControlledTextInput name="size" label="Tamanho" />
          <ControlledTextInput name="deadband" label="Banda morta" />
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

export default NewModbusTag;

const validationSchema = object().shape({
  modbusDevice: string().required("Dispositivo Modbus é obrigatório"),
  name: string().required("Nome é obrigatório"),
  dataType: string().required("Tipo de dado é obrigatório"),
  address: number().required("Endereço é obrigatório"),
  size: number().required("Tamanho é obrigatório"),
  deadband: number().required("Banda morta é obrigatória"),
});
