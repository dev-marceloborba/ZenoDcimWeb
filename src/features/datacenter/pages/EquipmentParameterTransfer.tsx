import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Column from "app/components/Column";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import HeroContainer from "app/components/HeroContainer";
import PageTitle from "app/components/PageTitle";
import Row from "app/components/Row";
import TransferList, { TransferListItem } from "app/components/TransferList";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";

import {
  useCreateMultipleEquipmentParametersMutation,
  useListAllEquipmentsQuery,
} from "app/services/datacenter";
import AutoCompleteDropdown from "app/components/AutocompleteDropdown";
import { EquipmentParameterResponse } from "app/models/data-center.model";

const columns = [
  {
    name: "parameter",
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
    label: "Limite mínimo",
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

const tableData = [
  {
    parameter: "Tensão",
    unit: "V",
    lowLimit: "0",
    highLimit: "450",
    scale: "0,1",
    group: "TR",
  },
  {
    parameter: "Corrente",
    unit: "A",
    lowLimit: "0",
    highLimit: "1000",
    scale: "1",
    group: "TR",
  },
  {
    parameter: "Potência ativa",
    unit: "W",
    lowLimit: "0",
    highLimit: "4500",
    scale: "10",
    group: "TR",
  },
  {
    parameter: "Potência reativa",
    unit: "Var",
    lowLimit: "-2500",
    highLimit: "2500",
    scale: "100",
    group: "TR",
  },
  {
    parameter: "Fator de potência",
    unit: "FP",
    lowLimit: "0",
    highLimit: "1",
    scale: "1",
    group: "TR",
  },
];

const groups = [
  {
    name: "TR",
  },
  {
    name: "RPP",
  },
  {
    name: "PDU",
  },
];

const EquipmentParameterTransfer: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<string>(groups[0].name);
  const [filteredTable, setFilteredTable] = useState<
    typeof tableData | undefined
  >(tableData);
  const { data: equipments, isLoading } = useListAllEquipmentsQuery();
  const [createMultipleParameters] =
    useCreateMultipleEquipmentParametersMutation();
  const navigate = useNavigate();

  const [sourceEquipment, setSourceEquipment] = useState<string | null>(null);
  const [sourceInputValue, setSourceInputValue] = React.useState("");

  const [targetEquipment, setTargetEquipment] = useState<string | null>(null);
  const [targetInputValue, setTargetInputValue] = React.useState("");

  const [leftParameters, setLeftParameters] =
    useState<EquipmentParameterResponse[]>();
  const [rightParameters, setRightParameters] =
    useState<EquipmentParameterResponse[]>();

  const handleChangeSourceEquipment = (source: string) => {
    setSourceEquipment(source);
  };

  const handleChangeTargetEquipment = (target: string) => {
    setTargetEquipment(target);
  };

  const handleSaveParameters = async (transferList: TransferListItem[]) => {
    const parameters =
      equipments?.find((x) => x.component === sourceEquipment)
        ?.equipmentParameters ?? [];
    let selectedParameters: EquipmentParameterResponse[] = [];

    parameters.forEach((value) => {
      const item = transferList.find((x) => value.id === x.id);
      if (item) {
        selectedParameters.push(value);
      }
    });

    const result = await createMultipleParameters({
      parameters: selectedParameters,
    }).unwrap();

    console.log(result);
  };

  const handleOpenGroupForm = () => {
    navigate("/zeno/automation/management/equipment/parameter/group/form");
  };

  const handleSelectedGroup = (group: string) => setSelectedGroup(group);

  useEffect(() => {
    const equipment = equipments?.find((x) => x.component === sourceEquipment);
    setLeftParameters(equipment?.equipmentParameters ?? []);
  }, [sourceEquipment, equipments, setLeftParameters]);

  useEffect(() => {
    const equipment = equipments?.find((x) => x.component === targetEquipment);
    setRightParameters(equipment?.equipmentParameters ?? []);
  }, [targetEquipment, equipments, setRightParameters]);

  useEffect(() => {
    const filteredTable = tableData.filter((x) => x.group === selectedGroup);
    setFilteredTable(filteredTable);
  }, [selectedGroup, setFilteredTable]);

  return (
    <HeroContainer>
      <PageTitle>Grupo de parâmetros</PageTitle>

      <Card sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" sx={{ ml: 2, mt: 1 }}>
              Grupo
            </Typography>
            <Row>
              <Column
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  ml: 1,
                }}
              >
                <Tooltip title="Criar grupo">
                  <IconButton onClick={handleOpenGroupForm}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Editar grupo">
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Salvar grupo">
                  <IconButton>
                    <SaveIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Excluir grupo">
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Column>
              <Column>
                <List>
                  {groups.map((group) => (
                    <ListItem key={group.name}>
                      <ListItemButton
                        onClick={() => handleSelectedGroup(group.name)}
                      >
                        <ListItemText primary={group.name} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Column>
            </Row>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h6" sx={{ ml: 2, mt: 1 }}>
              {selectedGroup ? `Parâmetros - ${selectedGroup}` : "Parâmetros"}
            </Typography>
            <Row>
              {/* <Table columns={columns} rows={filteredTable} /> */}
              <Column
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  ml: 1,
                }}
              >
                <Tooltip title="Novo parâmetro">
                  <IconButton>
                    <AddIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Incluir parâmetro">
                  <IconButton>
                    <SaveIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Excluir parâmetro">
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Column>
            </Row>
          </Grid>
        </Grid>
        {/* <Typography sx={{ mt: 2, mb: 2, ml: 1 }}>
          {"Grupo selecionado: " + selectedGroup}
        </Typography> */}
      </Card>

      {/* <AutoCompleteDropdown
        label="Equipamento de origem"
        name="originEquipment"
        options={equipments?.map((equipment) => equipment.component) ?? []}
        value={sourceEquipment}
        handleValue={handleChangeSourceEquipment}
        inputValue={sourceInputValue}
        handleInputValue={setSourceInputValue}
        sx={{ mt: 2 }}
      />
      <AutoCompleteDropdown
        label="Equipamento de destino"
        name="targetEquipment"
        options={equipments?.map((equipment) => equipment.component) ?? []}
        value={targetEquipment}
        handleValue={handleChangeTargetEquipment}
        inputValue={targetInputValue}
        handleInputValue={setTargetInputValue}
        sx={{ mt: 2 }}
      />
      <TransferList
        sx={{ mt: 2 }}
        leftItems={
          leftParameters?.map((parameter) => ({
            id: parameter.id,
            label: parameter.name,
          })) ?? []
        }
        rightItems={
          rightParameters?.map((parameter) => ({
            id: parameter.id,
            label: parameter.name,
          })) ?? []
        }
        onSave={handleSaveParameters}
      /> */}

      <PageTitle>Associar grupo a equipamento</PageTitle>

      <Card sx={{ mt: 2 }}>
        <Row>
          <AutoCompleteDropdown
            label="Grupo"
            name="group"
            options={groups?.map((group) => group.name) ?? []}
            value={sourceEquipment}
            handleValue={handleChangeSourceEquipment}
            inputValue={sourceInputValue}
            handleInputValue={setSourceInputValue}
            sx={{ width: 240, mt: 2 }}
          />

          <AutoCompleteDropdown
            label="Equipamento"
            name="targetEquipment"
            options={equipments?.map((equipment) => equipment.component) ?? []}
            value={targetEquipment}
            handleValue={handleChangeTargetEquipment}
            inputValue={targetInputValue}
            handleInputValue={setTargetInputValue}
            sx={{ width: 240, ml: 2, mt: 2 }}
          />
          <Column sx={{ marginLeft: "auto" }}>
            <Button variant="contained">Buscar equipamento</Button>
            <Button>Salvar</Button>
          </Column>
        </Row>
      </Card>
    </HeroContainer>
  );
};

export default EquipmentParameterTransfer;
