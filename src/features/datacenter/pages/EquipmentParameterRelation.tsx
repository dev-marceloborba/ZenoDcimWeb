import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Column from "app/components/Column";

import HeroContainer from "app/components/HeroContainer";
import PageTitle from "app/components/PageTitle";
import Row from "app/components/Row";
import DataTable, { ColumnHeader } from "app/components/DataTable";

import {
  useCreateMultipleEquipmentParametersMutation,
  useListAllEquipmentParametersQuery,
  useListAllEquipmentsQuery,
  useDeleteEquipmentParameterMutation,
} from "app/services/datacenter";
import { EquipmentParameterResponse } from "app/models/data-center.model";
import Loading from "app/components/Loading";
import { useToast } from "app/components/Toast";

const EquipmentParameterRelation: React.FC = () => {
  const { data: equipments, isLoading } = useListAllEquipmentsQuery();
  const { data: equipmentParameters } = useListAllEquipmentParametersQuery();
  const [createMultipleParameters] =
    useCreateMultipleEquipmentParametersMutation();
  const [deleteEquipmentParameter] = useDeleteEquipmentParameterMutation();
  const navigate = useNavigate();
  const toast = useToast();

  const handleDeleteEquipmentParameters = (
    selection: EquipmentParameterResponse[]
  ) => {
    selection.forEach(
      async (e) => await deleteEquipmentParameter(e.id).unwrap()
    );
    toast.open("Parâmetros de equipamento excluídos com sucesso", 2000, "info");
  };

  const handleSaveParameters = async (transferList: any) => {
    // const parameters =
    //   equipments?.find((x) => x.component === sourceEquipment)
    //     ?.equipmentParameters ?? [];
    // let selectedParameters: EquipmentParameterResponse[] = [];
    // parameters.forEach((value) => {
    //   const item = transferList.find((x) => value.id === x.id);
    //   if (item) {
    //     selectedParameters.push(value);
    //   }
    // });
    // const result = await createMultipleParameters({
    //   parameters: selectedParameters,
    // }).unwrap();
    // console.log(result);
  };

  const handleIncludeParameter = () => {};

  return (
    <HeroContainer>
      <PageTitle>Associar grupo a equipamento</PageTitle>
      <Row>
        <Column sx={{ marginLeft: "auto" }}>
          <Button onClick={handleIncludeParameter} variant="contained">
            Incluir parâmetro
          </Button>
          <Button>Salvar</Button>
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
