import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import HeroContainer from "app/components/HeroContainer";
import PageTitle from "app/components/PageTitle";
import Form from "app/components/Form";
import ControlledTextInput from "app/components/ControlledTextInput";
import SubmitButton from "app/components/SubmitButton";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaOf, string, object } from "yup";
import AccessButton from "app/components/AccessButton";

import Table from "app/hooks/useTable";
import { styled } from "@mui/system";

type Equipment = {
  name: string;
  system: string;
};

type Room = {
  name: string;
  equipments?: Equipment[];
};

type Floor = {
  name: string;
  rooms?: Room[];
};

type BuildingRequest = {
  name: string;
  floors?: Floor[];
};

const NewBuilding: React.FC = () => {
  const methods = useForm<BuildingRequest>({
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<BuildingRequest> = (data) => {
    console.log(data);
  };

  return (
    <HeroContainer>
      <PageTitle>Novo prédio</PageTitle>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <ControlledTextInput name="name" label="Nome do prédio" />
          <AccessButton label="Incluir sala" to="/new-room" />
          <SubmitButton label="Salvar" />
        </FormProvider>
      </Form>

      <ContentContainer>
        <List>
          <ListItem>
            <ListItemText primary="Prédio 1" />
          </ListItem>
        </List>
      </ContentContainer>
      {/* <TableContainer>
          <Table rows={} columns={columns} />
      </TableContainer> */}
    </HeroContainer>
  );
};
export default NewBuilding;

const validationSchema = object().shape({
  name: string().required("Nome é obrigatório"),
});

const ContentContainer = styled(Box)({});

const columns = [
  {
    name: "building",
    label: "Prédio",
  },
];
