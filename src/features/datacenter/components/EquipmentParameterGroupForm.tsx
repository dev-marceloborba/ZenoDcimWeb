import React, { useState } from "react";
import HeroContainer from "app/components/HeroContainer";
import PageTitle from "app/components/PageTitle";
import Form from "app/components/Form";
import ControlledTextInput from "app/components/ControlledTextInput";
import Button from "@mui/material/Button";
import { object, string } from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import MuiDataTable from "mui-datatables";

import ParameterSelection from "./ParameterSelection";

const columns = [
  {
    name: "name",
    label: "Nome",
    align: "left",
  },
  {
    name: "unit",
    label: "Unidade",
    align: "right",
  },
  {
    name: "lowLimit",
    label: "Limite minimo",
    align: "right",
  },
  {
    name: "highLimit",
    label: "Limite máximo",
    align: "right",
  },
  {
    name: "scale",
    label: "Escala",
    align: "right",
  },
];

const EquipmentParameterGroupForm: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedParameter, setSelectedParameter] = useState<any>();
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: any) => {
    const obj = {
      name: data.name,
      parameters: selectedParameter,
    };
    console.log(obj);
  };

  const { handleSubmit } = methods;

  return (
    <HeroContainer>
      <PageTitle>Grupo de parametros</PageTitle>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <ControlledTextInput name="name" label="Nome" />
          <Button onClick={() => setOpen(true)}>Incluir parâmetro</Button>
          <MuiDataTable
            title="Parâmetros"
            columns={columns}
            data={selectedParameter}
            options={{
              download: false,
              print: false,
              search: false,
              viewColumns: false,
              filter: false,
            }}
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Salvar
          </Button>
        </FormProvider>
      </Form>
      <ParameterSelection
        open={open}
        handleCloseModal={() => setOpen(false)}
        setSelectedParameter={setSelectedParameter}
        previousParameters={selectedParameter}
      />
    </HeroContainer>
  );
};

const validationSchema = object().shape({
  name: string().required("Nome do grupo é obrigatório"),
});

export default EquipmentParameterGroupForm;
