import HeroContainer from "app/components/HeroContainer";
import LabelTabs from "app/components/LabelTabs";
import PageTitle from "app/components/PageTitle";
import { TabContextProvider, useTabContext } from "app/components/TabContext";
import TabPanel from "app/components/TabPanel";
import React from "react";

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
  return (
    <TabPanel index={0} value={tabIndex}>
      <h3>Todos</h3>
    </TabPanel>
  );
};

const ParameterGroupPanel: React.FC = () => {
  const { tabIndex } = useTabContext();
  return (
    <TabPanel index={1} value={tabIndex}>
      <h3>Grupo</h3>
    </TabPanel>
  );
};

export default IncludeParameter;
