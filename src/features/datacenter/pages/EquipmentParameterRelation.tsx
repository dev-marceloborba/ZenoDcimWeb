import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Column from "app/components/Column";

import HeroContainer from "app/components/HeroContainer";
import PageTitle from "app/components/PageTitle";
import Row from "app/components/Row";
import DataTable, { ColumnHeader } from "app/components/DataTable";

import {
  useCreateMultipleEquipmentParametersMutation,
  useDeleteEquipmentParameterMutation,
  useFindEquipmentParametersByEquipmentIdMutation,
} from "app/services/datacenter";
import { EquipmentParameterResponse } from "app/models/data-center.model";
import Loading from "app/components/Loading";
import { useToast } from "app/components/Toast";

const EquipmentParameterRelation: React.FC = () => {
  const [findEquipmentParameters, { data: equipmentParameters, isLoading }] =
    useFindEquipmentParametersByEquipmentIdMutation();

  const [createMultipleParameters] =
    useCreateMultipleEquipmentParametersMutation();
  const [deleteEquipmentParameter] = useDeleteEquipmentParameterMutation();
  const navigate = useNavigate();
  const params = useParams();
  const toast = useToast();

  useEffect(() => {
    async function fetchParameters() {
      if (params.id) {
        await findEquipmentParameters(params.id).unwrap();
      }
    }
    fetchParameters();
  }, [findEquipmentParameters, params.id]);

  const handleDeleteEquipmentParameters = (
    selection: EquipmentParameterResponse[]
  ) => {
    selection.forEach(
      async (e) => await deleteEquipmentParameter(e.id).unwrap()
    );
    toast.open("Parâmetros de equipamento excluídos com sucesso", 2000, "info");
  };

  const handleIncludeParameter = () => {
    navigate(
      `/zeno/automation/equipment-parameter-relation/include/${params.id}`
    );
  };

  return (
    <HeroContainer>
      <PageTitle>Associar grupo a equipamento</PageTitle>
      <Row>
        <Column sx={{ marginLeft: "auto" }}>
          <Button onClick={handleIncludeParameter} variant="contained">
            Incluir parâmetro
          </Button>
          {/* <Button>Salvar</Button> */}
        </Column>
      </Row>
      <DataTable
        title="Parâmetros do equipamento"
        columns={columns}
        rows={equipmentParameters ?? []}
        options={{
          onDeleteSelection: handleDeleteEquipmentParameters,
        }}
      />
      <Loading open={isLoading} />
    </HeroContainer>
  );
};

export default EquipmentParameterRelation;

const columns: ColumnHeader[] = [
  {
    name: "name",
    label: "Parâmetro",
  },
  {
    name: "unit",
    label: "Unidade",
  },
  {
    name: "lowLimit",
    label: "Limite mínimo",
  },
  {
    name: "highLimit",
    label: "Limite máximo",
  },
  {
    name: "scale",
    label: "Escala",
  },
  {
    name: "dataSource",
    label: "Fonte de dados",
  },
];
