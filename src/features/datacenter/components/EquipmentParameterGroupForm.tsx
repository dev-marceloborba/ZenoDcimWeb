import React, { useState } from "react";
import HeroContainer from "app/components/HeroContainer";
import PageTitle from "app/components/PageTitle";
import Form from "app/components/Form";
import ControlledTextInput from "app/components/ControlledTextInput";
import Button from "@mui/material/Button";
import { object, string } from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DataTable from "app/components/DataTable";
import { useModal } from "mui-modal-provider";

import ParameterSelection from "./ParameterSelection";
import SubmitButton from "app/components/SubmitButton";

const EquipmentParameterGroupForm: React.FC = () => {
  const [selectedParameter, setSelectedParameter] = useState<any>();
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { showModal } = useModal();

  const onSubmit = async (data: any) => {
    const obj = {
      name: data.name,
      parameters: selectedParameter,
    };
    console.log(obj);
  };

  const handleOpenParameterModal = () => {
    const modal = showModal(ParameterSelection, {
      previousParameters: selectedParameter,
      setSelectedParameter: (parameter) => {
        setSelectedParameter(parameter);
        modal.hide();
      },
    });
  };

  const { handleSubmit } = methods;

  return (
    <HeroContainer>
      <PageTitle>Grupo de parametros</PageTitle>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <ControlledTextInput name="name" label="Nome" />
          <Button onClick={handleOpenParameterModal}>Incluir parâmetro</Button>
          <DataTable
            title="Parâmetros"
            columns={columns}
            rows={selectedParameter ?? []}
            options={{
              onSelectedItems: (items) => console.log(items),
            }}
          />
          <SubmitButton label="Salvar" sx={{ mt: 2 }} />
        </FormProvider>
      </Form>
    </HeroContainer>
  );
};

const validationSchema = object().shape({
  name: string().required("Nome do grupo é obrigatório"),
});

const columns = [
  {
    name: "name",
    label: "Nome",
  },
  {
    name: "unit",
    label: "Unidade",
  },
  {
    name: "lowLimit",
    label: "Limite minimo",
  },
  {
    name: "highLimit",
    label: "Limite máximo",
  },
  {
    name: "scale",
    label: "Escala",
  },
];

export default EquipmentParameterGroupForm;
