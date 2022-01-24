import React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaOf, string, object, number } from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import type { NewAutomationParameterRequest } from "app/services/automation-register";
import ControlledTextInput from "app/components/ControlledTextInput";
import { modalStyle } from "app/styles/modal-style";

type ParameterModalProps = {
  closeModal(): void;
};

const ParameterModal: React.FC<ParameterModalProps> = ({ closeModal }) => {
  const methods = useForm<NewAutomationParameterRequest>({
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<NewAutomationParameterRequest> = async (
    data
  ) => {
    try {
      console.log(data);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        sx={modalStyle}
      >
        <Typography variant="h5">Novo parâmetro</Typography>
        <FormProvider {...methods}>
          <ControlledTextInput name="parameter" label="Parâmetro" />
          <ControlledTextInput name="unit" label="Unidade" />
          <ControlledTextInput name="limitMin" label="Limite inferior" />
          <ControlledTextInput name="limitMax" label="Limite superior" />
          <ControlledTextInput name="scale" label="Escala" />
          <ControlledTextInput name="dataSource" label="Fonte de dados" />
          <ControlledTextInput name="address" label="Endereço" />
          <Button fullWidth variant="contained" type="submit">
            Salvar
          </Button>
        </FormProvider>
      </Box>
    </Container>
  );
};

const validationSchema: SchemaOf<NewAutomationParameterRequest> =
  object().shape({
    parameter: string().required("Parâmetro é obrigatório"),
    unit: string().required("Unidade é obrigatória"),
    limitMin: number().required("Limite mínimo é obrigatório"),
    limitMax: number().required("Limite máximo é obrigatório"),
    scale: number().required("Escala é obrigatória"),
    dataSource: string().required("Fonte de dados é obrigatória"),
    address: string().required("Endereço é obrigatório"),
  });


export default ParameterModal;
