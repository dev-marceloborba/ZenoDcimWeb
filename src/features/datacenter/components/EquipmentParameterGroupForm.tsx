import React from "react";
import HeroContainer from "app/components/HeroContainer";
import PageTitle from "app/components/PageTitle";
import Form from "app/components/Form";
import ControlledTextInput from "app/components/ControlledTextInput";
import Button from "@mui/material/Button";
import { object, string } from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import MuiDataTable from "mui-datatables";
import { useModal } from "app/hooks/useModal";
import ParameterSelection from "./ParameterSelection";

const EquipmentParameterGroupForm: React.FC = () => {
  const { openModal } = useModal();
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  const { handleSubmit } = methods;
  return (
    <HeroContainer>
      <PageTitle>Grupo de parametros</PageTitle>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <ControlledTextInput name="name" label="Nome" />
          <Button onClick={() => openModal("Titulo", ParameterSelection)}>
            Incluir parâmetro
          </Button>
          <MuiDataTable
            title="Parâmetros"
            columns={[]}
            data={[]}
            options={{
              download: false,
              print: false,
            }}
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Salvar
          </Button>
        </FormProvider>
      </Form>
    </HeroContainer>
  );
};

const validationSchema = object().shape({
  name: string().required("Nome do grupo é obrigatório"),
});

export default EquipmentParameterGroupForm;
