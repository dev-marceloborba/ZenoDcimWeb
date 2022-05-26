import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import AutoCompleteDropdown from "app/components/AutocompleteDropdown";
import AutoComplete from "@mui/lab/Autocomplete";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Collapse from "@mui/material/Collapse";
import Column from "app/components/Column";
import DataTable, { ColumnHeader } from "app/components/DataTable";
import HeroContainer from "app/components/HeroContainer";
import PageTitle from "app/components/PageTitle";
import Row from "app/components/Row";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import {
  useCreateMultipleEquipmentParametersMutation,
  useDeleteEquipmentParameterMutation,
  useFindEquipmentParametersByEquipmentIdMutation,
  useFindAllEquipmentsQuery,
} from "app/services/datacenter";
import {
  EquipmentParameterRequest,
  EquipmentParameterResponse,
} from "app/models/data-center.model";
import Loading from "app/components/Loading";
import { useToast } from "app/components/Toast";

type DropdownItem = {
  id: string;
  label: string;
};

const EquipmentParameterRelation: React.FC = () => {
  const [showEquipmentAssociation, setShowEquipmentAssociation] =
    useState(false);
  const [findEquipmentParameters, { data: equipmentParameters, isLoading }] =
    useFindEquipmentParametersByEquipmentIdMutation();
  const { data: equipments } = useFindAllEquipmentsQuery();
  const [findEquipmentParametersSource, { data: sourceEquipmentParameters }] =
    useFindEquipmentParametersByEquipmentIdMutation();

  const [createMultipleEquipmentParameters] =
    useCreateMultipleEquipmentParametersMutation();
  const [deleteEquipmentParameter] = useDeleteEquipmentParameterMutation();
  const navigate = useNavigate();
  const params = useParams();
  const toast = useToast();

  const [equipment, setEquipment] = useState<DropdownItem | null>(null);
  const [equipmentInputValue, setEquipmentInputValue] = useState("");

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

  const handleCopyParametersFromAnotherEquipment = () => {
    setShowEquipmentAssociation(!showEquipmentAssociation);
  };

  const handleCopyParameters = async () => {
    const parametersAsEquipmentParameters =
      sourceEquipmentParameters!.map<EquipmentParameterRequest>(
        (parameter) => ({
          name: parameter.name,
          unit: parameter.unit,
          highLimit: parameter.highLimit,
          lowLimit: parameter.lowLimit,
          scale: parameter.scale,
          address: parameter.address,
          dataSource: parameter.dataSource,
          equipmentId: params.id,
        })
      );

    await createMultipleEquipmentParameters({
      parameters: parametersAsEquipmentParameters,
    }).unwrap();
  };

  useEffect(() => {
    async function fetchParameters() {
      if (params.id) {
        await findEquipmentParameters(params.id).unwrap();
      }
    }
    fetchParameters();
  }, [findEquipmentParameters, params.id]);

  useEffect(() => {
    async function fetchSourceParameters() {
      if (equipment) {
        await findEquipmentParametersSource(equipment.id).unwrap();
      }
    }
    fetchSourceParameters();
  }, [equipment, findEquipmentParametersSource]);

  return (
    <HeroContainer>
      <PageTitle>Associar grupo a equipamento</PageTitle>
      <Row>
        <Column sx={{ marginLeft: "auto" }}>
          <Button onClick={handleIncludeParameter} variant="contained">
            Incluir parâmetro
          </Button>
          <Button onClick={handleCopyParametersFromAnotherEquipment}>
            Copiar de outro equipamento
          </Button>
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
      <Box sx={{ mt: 3 }}>
        <Collapse in={showEquipmentAssociation}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6">Equipamento</Typography>
            <Row
              sx={{
                alignItems: "center",
                " & .MuiAutocomplete-root": {
                  width: 300,
                },
              }}
            >
              <AutoComplete
                value={equipment}
                onChange={(e, value) => {
                  if (value) {
                    setEquipment(value);
                  }
                }}
                inputValue={equipmentInputValue}
                onInputChange={(event, inputValue) =>
                  setEquipmentInputValue(inputValue)
                }
                id="equipment-autocomplete"
                options={
                  equipments?.map((equipment) => ({
                    id: equipment.id,
                    label: equipment.component,
                  })) ?? []
                }
                getOptionLabel={(option) => option?.label}
                isOptionEqualToValue={(option, value) =>
                  option?.id === value?.id
                }
                sx={{ mt: 2 }}
                renderInput={(params) => (
                  <TextField {...params} label="Equipamentos" />
                )}
              />
              <Button
                variant="contained"
                onClick={handleCopyParameters}
                sx={{ marginLeft: "auto" }}
              >
                Confirmar
              </Button>
            </Row>
          </Card>
          <DataTable
            title="Parâmetros do equipamento de origem"
            columns={columns}
            rows={sourceEquipmentParameters ?? []}
          />
        </Collapse>
      </Box>
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
