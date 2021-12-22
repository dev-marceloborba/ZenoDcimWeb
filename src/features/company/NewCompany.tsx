import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from '@mui/material/Typography'
import { CompanyRequest, useCreateCompanyMutation } from "app/services/company";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaOf, object, string } from "yup";
import ControlledTextInput from "app/components/ControlledTextInput";
import MaskedControlledTextInput from "app/components/MaskedControlledTextInput";

const NewCompany: React.FC = () => {
  const methods = useForm<CompanyRequest>({
    resolver: yupResolver(validationSchema),
  });

  const [createCompany, { isLoading, isError, error }] =
    useCreateCompanyMutation();

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<CompanyRequest> = async (data) => {
    try {
      console.log(data)
      await createCompany(data).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxWidth="xs">
      <Toolbar />
      <Typography variant="h5">Criar empresa</Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ maxWidth: "640px", "& .MuiTextField-root": { mt: 2 } }}
      >
        <FormProvider {...methods}>
          <ControlledTextInput name="companyName" label="Razão social" />
          <ControlledTextInput name="tradingName" label="Nome fantasia" />
          <MaskedControlledTextInput
            name="registrationNumber"
            label="CNPJ"
            mask="##.###.###/####-##"
          />
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
            Criar empresa
          </Button>
        </FormProvider>
      </Box>
    </Container>
  );
};

const validationSchema: SchemaOf<CompanyRequest> = object().shape({
  companyName: string().required("Razão social é obrigatório"),
  tradingName: string().required("Nome fantasia é obrigatório"),
  registrationNumber: string().required("CNPJ é obrigatório"),
});

export default NewCompany;
