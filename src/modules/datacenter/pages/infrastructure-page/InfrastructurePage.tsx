import DataTableV2 from "modules/shared/components/datatableV2/DataTable";
import HeroContainer from "modules/shared/components/HeroContainer";
import LabelTabs from "modules/shared/components/LabelTabs";
import {
  TabContextProvider,
  useTabContext,
} from "modules/shared/components/TabContext";
import TabPanel from "modules/shared/components/TabPanel";

export default function InfrastructurePage() {
  return (
    <HeroContainer title="Infraestrutura">
      <TabContextProvider>
        <LabelTabs items={["Sites", "Prédios", "Andares", "Salas"]} />
        <SitesTab />
        <BuildingsTab />
        <FloorsTab />
        <RoomsTab />
      </TabContextProvider>
    </HeroContainer>
  );
}

const SitesTab: React.FC = () => {
  const { tabIndex } = useTabContext();
  return (
    <TabPanel value={tabIndex} index={0}>
      <DataTableV2 title="" rows={[]} columns={[]} />;
    </TabPanel>
  );
};

const BuildingsTab: React.FC = () => {
  const { tabIndex } = useTabContext();
  return (
    <TabPanel value={tabIndex} index={1}>
      <DataTableV2 title="" rows={[]} columns={[]} />;
    </TabPanel>
  );
};

const FloorsTab: React.FC = () => {
  const { tabIndex } = useTabContext();
  return (
    <TabPanel value={tabIndex} index={2}>
      <DataTableV2 title="" rows={[]} columns={[]} />;
    </TabPanel>
  );
};

const RoomsTab: React.FC = () => {
  const { tabIndex } = useTabContext();
  return (
    <TabPanel value={tabIndex} index={3}>
      <DataTableV2 title="" rows={[]} columns={[]} />;
    </TabPanel>
  );
};
