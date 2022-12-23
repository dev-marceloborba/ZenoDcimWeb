import { useFindEquipmentParametersByEquipmentIdMutation } from "modules/automation/services/equipment-parameter-service";
import useRouter from "modules/core/hooks/useRouter";
import DataTableV2 from "modules/shared/components/datatableV2/DataTable";
import HeroContainer from "modules/shared/components/HeroContainer";
import LabelTabs from "modules/shared/components/LabelTabs";
import Loading from "modules/shared/components/Loading";
import {
  TabContextProvider,
  useTabContext,
} from "modules/shared/components/TabContext";
import TabPanel from "modules/shared/components/TabPanel";
import { useEffect } from "react";

const EquipmentParametersPage: React.FC = () => {
  const { params } = useRouter();
  return (
    <HeroContainer title="Parâmetros">
      <TabContextProvider>
        <LabelTabs items={["P. físico", "P. virtual", "Grupo de parâmetros"]} />
        <PhysicalParameterTab equipmentId={params.equipmentId!} />
        <VirtualParameterTab equipmentId={params.equipmentId!} />
        <GroupParameterTab equipmentId={params.equipmentId!} />
      </TabContextProvider>
    </HeroContainer>
  );
};

type TabProps = {
  equipmentId: string;
};

const PhysicalParameterTab: React.FC<TabProps> = ({ equipmentId }) => {
  const { tabIndex } = useTabContext();
  const [findParameters, { data: parameters, isLoading }] =
    useFindEquipmentParametersByEquipmentIdMutation();

  useEffect(() => {
    async function fetchParameters() {
      if (equipmentId) {
        await findParameters(equipmentId).unwrap();
      }
    }
    fetchParameters();
  }, [equipmentId, findParameters]);

  return (
    <TabPanel index={0} value={tabIndex}>
      <DataTableV2
        title=""
        columns={[
          {
            name: "name",
            label: "Parâmetro",
          },
          {
            name: "unit",
            label: "Unidade",
          },
          {
            name: "lowLowLimit",
            label: "Limite muito baixo",
          },
          {
            name: "lowLimit",
            label: "Limite baixo",
          },
          {
            name: "highLimit",
            label: "Limite alto",
          },
          {
            name: "highHighLimit",
            label: "Limite muito alto",
          },
          {
            name: "scale",
            label: "Escala",
          },
          {
            name: "discriminator",
            label: "Tipo",
          },
        ]}
        rows={parameters ?? []}
      />
      <Loading open={isLoading} />
    </TabPanel>
  );
};

const VirtualParameterTab: React.FC<TabProps> = ({ equipmentId }) => {
  const { tabIndex } = useTabContext();

  return (
    <TabPanel index={1} value={tabIndex}>
      {/* <DataTableV2
        title="Parâmetro"
        columns={[
          {
            name: "name",
            label: "Parâmetro",
          },
          {
            name: "unit",
            label: "Unidade",
          },
          {
            name: "lowLowLimit",
            label: "Limite muito baixo",
          },
          {
            name: "lowLimit",
            label: "Limite baixo",
          },
          {
            name: "highLimit",
            label: "Limite alto",
          },
          {
            name: "highHighLimit",
            label: "Limite muito alto",
          },
          {
            name: "scale",
            label: "Escala",
          },
          {
            name: "expression",
            label: "Expressão",
          },
        ]}
        rows={[]}
      /> */}
    </TabPanel>
  );
};

const GroupParameterTab: React.FC<TabProps> = ({ equipmentId }) => {
  const { tabIndex } = useTabContext();

  return (
    <TabPanel index={2} value={tabIndex}>
      {/* <DataTableV2
        title=""
        columns={[
          {
            name: "name",
            label: "Grupo",
          },
          {
            name: "parameter",
            label: "Parâmetro",
          },
          {
            name: "unit",
            label: "Unidade",
          },
          {
            name: "lowLowLimit",
            label: "Limite muito baixo",
          },
          {
            name: "lowLimit",
            label: "Limite baixo",
          },
          {
            name: "highLimit",
            label: "Limite alto",
          },
          {
            name: "highHighLimit",
            label: "Limite muito alto",
          },
          {
            name: "scale",
            label: "Escala",
          },
          {
            name: "discriminator",
            label: "Tipo",
          },
        ]}
        rows={[]}
      /> */}
    </TabPanel>
  );
};

export default EquipmentParametersPage;
