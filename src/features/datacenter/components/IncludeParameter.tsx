import React, { useState, useEffect, useCallback } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import HeroContainer from "app/components/HeroContainer";
import LabelTabs from "app/components/LabelTabs";
import PageTitle from "app/components/PageTitle";
import DataTable, { ColumnHeader } from "app/components/DataTable";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { TabContextProvider, useTabContext } from "app/components/TabContext";
import TabPanel from "app/components/TabPanel";
import {
  useCreateMultipleEquipmentParametersMutation,
  useFindParameterByGroupMutation,
  useListAllParameterGroupsQuery,
  useListAllParametersQuery,
} from "app/services/datacenter";
import Dropdown from "app/components/Dropdown";
import Loading from "app/components/Loading";
import {
  EquipmentParameterRequest,
  ParameterResponse,
} from "app/models/data-center.model";

const IncludeParameter: React.FC = () => {
  const [parameters, setParameters] = useState<any[]>([]);
  const { data: groups, isLoading: isLoadingGroup } =
    useListAllParameterGroupsQuery();
  const [
    findParameterGroup,
    { data: parametersGrouped, isLoading: isLoadingParameters },
  ] = useFindParameterByGroupMutation();
  const [createMultipleEquipmentParameter] =
    useCreateMultipleEquipmentParametersMutation();

  const handleSaveParameters = () => {
    const parametersAsEquipmentParameters =
      parameters.map<EquipmentParameterRequest>((parameter) => ({
        name: parameter.name,
        unit: parameter.unit,
        highLimit: parameter.highLimit,
        lowLimit: parameter.lowLimit,
        scale: parameter.scale,
        address: "",
        dataSource: "",
        equipmentId: "2",
      }));
    console.log(parametersAsEquipmentParameters);
  };

  const handleSaveItems = (parameters: ParameterResponse[]) => {
    setParameters(parameters);
  };

  const handleChangeGroup = async (group: string) => {
    await findParameterGroup(group).unwrap();
  };

  return (
    <HeroContainer>
      <PageTitle>Incluir parâmetro</PageTitle>
      <Grid container spacing={1}>
        <Grid item md={3}>
          <Card>
            <List>
              {groups?.map((group) => (
                <ListItem key={group.id}>
                  <ListItemButton onClick={() => handleChangeGroup(group.name)}>
                    <ListItemText primary={group.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
        <Grid item md={9}>
          <DataTable
            title="Parâmetros"
            columns={columns}
            rows={parametersGrouped ?? []}
            options={{
              onSelectedItems: handleSaveItems,
            }}
          />
          <Loading open={isLoadingGroup || isLoadingParameters} />
        </Grid>
      </Grid>
      {/* <TabContextProvider>
        <LabelTabs items={["Todos", "Por grupo"]} />
        <AllParametersPanel
          selection={parameters}
          setSelection={handleSaveItems}
        />
        <ParameterGroupPanel
          selection={parameters}
          setSelection={handleSaveItems}
        />
      </TabContextProvider> */}
      <Button variant="contained" onClick={handleSaveParameters}>
        Salvar
      </Button>
    </HeroContainer>
  );
};

interface ParameterPanelProps {
  selection: any[];
  setSelection: (selection: any[]) => void;
}

const AllParametersPanel: React.FC<ParameterPanelProps> = ({
  selection,
  setSelection,
}) => {
  const { tabIndex } = useTabContext();
  const { data: parameters, isLoading } = useListAllParametersQuery();
  return (
    <TabPanel index={0} value={tabIndex}>
      <DataTable
        title="Parâmetros"
        columns={columns}
        rows={parameters ?? []}
        options={{ onSelectedItems: setSelection }}
      />
      <Loading open={isLoading} />
    </TabPanel>
  );
};

const ParameterGroupPanel: React.FC<ParameterPanelProps> = ({
  selection,
  setSelection,
}) => {
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const { tabIndex } = useTabContext();
  const { data: groups, isLoading: isLoadingGroup } =
    useListAllParameterGroupsQuery();
  const [
    findParameterGroup,
    { data: parametersGrouped, isLoading: isLoadingParameters },
  ] = useFindParameterByGroupMutation();

  const handleChangeGroup = (group: string) => setSelectedGroup(group);

  useEffect(() => {
    async function loadParameters() {
      if (selectedGroup) {
        await findParameterGroup(selectedGroup).unwrap();
      }
    }
    loadParameters();
  }, [findParameterGroup, selectedGroup]);

  return (
    <TabPanel index={1} value={tabIndex}>
      <Dropdown
        value={selectedGroup}
        callback={handleChangeGroup}
        items={
          groups?.map((group) => ({
            label: group.name,
            value: group.name,
          })) ?? []
        }
      />
      <DataTable
        title="Parâmetros"
        columns={columns}
        rows={parametersGrouped ?? []}
        options={{
          onSelectedItems: setSelection,
        }}
      />
      <Loading open={isLoadingGroup || isLoadingParameters} />
    </TabPanel>
  );
};

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
    name: "scale",
    label: "Escala",
  },
  {
    name: "lowLimit",
    label: "Limite mínimo",
  },
  {
    name: "highLimit",
    label: "Limite máximo",
  },
];

export default IncludeParameter;
