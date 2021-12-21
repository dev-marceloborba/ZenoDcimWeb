import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { CompanyRequest, useCreateCompanyMutation } from "app/services/company";

import MaskedTextField from "app/components/MaskedTextField";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import * as Yup from "yup";

const NewCompany: React.FC = () => {
  const [createCompany, { isLoading, isError, error }] =
    useCreateCompanyMutation();

  const onSubmit = async (data: CompanyRequest) => {
    try {
      await createCompany(data).unwrap();
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <Container maxWidth="xl">
      <Toolbar />
      <Box sx={{ maxWidth: "640px" }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <Field
              component={TextField}
              name={"companyName"}
              type="text"
              label="Razão social"
              fullWidth
            />
            <Field
              component={TextField}
              name={"tradingName"}
              type="text"
              label="Nome fantasia"
              fullWidth
            />
            <Field
              component={TextField}
              name={"registrationNumber"}
              type="text"
              label="CNPJ"
              fullWidth
            />
            <Button variant="contained" type="submit">
              Criar empresa
            </Button>
          </Form>
        </Formik>
      </Box>
    </Container>
  );
};

const initialValues = {
  companyName: "",
  tradingName: "",
  registrationNumber: "",
};

const validationSchema = Yup.object().shape({
  companyName: Yup.string().required("Razão social é obrigatório"),
  tradingName: Yup.string().required("Nome fantasia é obrigatório"),
  registrationNumber: Yup.string().required("CNPJ é obrigatoório"),
});

export default NewCompany;
