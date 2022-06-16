import React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Form from "modules/shared/components/Form";
import ControlledTextInput from "modules/shared/components/ControlledTextInput";
import MaskedControlledTextInput from "modules/shared/components/MaskedControlledTextInput";

import { useCreateCompanyMutation } from "app/services/company";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaOf, object, string } from "yup";
import Card from "modules/shared/components/Card";
import Loading from "modules/shared/components/Loading";
import { useToast } from "modules/shared/components/ToastProvider";
import { CompanyRequest } from "app/models/company.model";

const CompanyForm: React.FC = () => {
  const [createCompany, { isLoading }] = useCreateCompanyMutation();
  const toast = useToast();
  const methods = useForm<CompanyRequest>({
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<CompanyRequest> = async (data) => {
    try {
      await createCompany(data).unwrap();
      toast.open("Empresa criada com sucesso", 2000, "success");
    } catch (err) {
      toast.open(`Erro ao criar empresa: ${err}`, 2000, "error");
    }
  };

  return (
    <Container maxWidth="xs">
      <Toolbar />
      <Card>
        <Typography variant="h5">Criar empresa</Typography>
        <Form
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
        </Form>
      </Card>
      <Loading open={isLoading} />
    </Container>
  );
};

const validationSchema: SchemaOf<CompanyRequest> = object().shape({
  companyName: string().required("Razão social é obrigatório"),
  tradingName: string().required("Nome fantasia é obrigatório"),
  registrationNumber: string().required("CNPJ é obrigatório"),
});

export default CompanyForm;
