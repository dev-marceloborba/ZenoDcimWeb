import React, { useState, useEffect } from "react";
import HeroContainer from "app/components/HeroContainer";
import LabelTabs from "app/components/LabelTabs";
import PageTitle from "app/components/PageTitle";
import DataTable, { ColumnHeader } from "app/components/DataTable";
import { TabContextProvider, useTabContext } from "app/components/TabContext";
import TabPanel from "app/components/TabPanel";
import {
  useFindParameterByGroupMutation,
  useListAllParameterGroupsQuery,
  useListAllParametersQuery,
} from "app/services/datacenter";
import Dropdown from "app/components/Dropdown";
import Loading from "app/components/Loading";

const IncludeParameter: React.FC = () => {
  return (
    <HeroContainer>
      <PageTitle>Incluir parâmetro</PageTitle>
      <TabContextProvider>
        <LabelTabs items={["Todos", "Por grupo"]} />
        <AllParametersPanel />
        <ParameterGroupPanel />
      </TabContextProvider>
    </HeroContainer>
  );
};

const AllParametersPanel: React.FC = () => {
  const { tabIndex } = useTabContext();
  const { data: parameters, isLoading } = useListAllParametersQuery();
  return (
    <TabPanel index={0} value={tabIndex}>
      <DataTable title="Parâmetros" columns={columns} rows={parameters ?? []} />
      <Loading open={isLoading} />
    </TabPanel>
  );
};

const ParameterGroupPanel: React.FC = () => {
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
