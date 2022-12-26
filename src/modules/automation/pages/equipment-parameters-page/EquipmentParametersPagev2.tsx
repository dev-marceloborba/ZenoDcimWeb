import { useEffect } from "react";
import Button from "@mui/material/Button";
import { useFindEquipmentParametersByEquipmentIdMutation } from "modules/automation/services/equipment-parameter-service";
import useRouter from "modules/core/hooks/useRouter";
import DataTableV2 from "modules/shared/components/datatableV2/DataTable";
import HeroContainer from "modules/shared/components/HeroContainer";
import Loading from "modules/shared/components/Loading";
import Tabs from "modules/shared/components/tabs/Tabs";
import { useModal } from "mui-modal-provider";
import PhysicalParameterModal from "modules/automation/modals/physical-parameter-modal/PhysicalParameterModal";
import VirtualParameterFormModal from "modules/automation/modals/virtual-parameter-form-modal/VirtualParameterFormModal";
import GroupParameterFormModal from "modules/automation/modals/group-parameter-form-modal/GroupParameterFormModal";

const EquipmentParametersPage: React.FC = () => {
  const { params } = useRouter();
  const { showModal } = useModal();

  const handleOpenPhysicalParameterModal = () => {
    const modal = showModal(PhysicalParameterModal, {
      title: "Novo parâmetro físico",
      onClose: () => {
        modal.hide();
      },
    });
  };

  const handleOpenVirtualParameterModal = () => {
    const modal = showModal(VirtualParameterFormModal, {
      title: "Novo parâmetro virtual",
      onClose: () => {
        modal.hide();
      },
    });
  };

  const handleOpenGroupParameterModal = () => {
    const modal = showModal(GroupParameterFormModal, {
      title: "Novo grupo de parâmetros",
      onClose: () => {
        modal.hide();
      },
    });
  };

  return (
    <HeroContainer title="Parâmetros">
      <Tabs
        mode="horizontal"
        tabLabels={["P. físico", "P. virtual", "Grupo de parâmetros"]}
        tabItems={[
          {
            element: <PhysicalParameterTab equipmentId={params.equipmentId!} />,
            content: (
              <Button
                variant="contained"
                onClick={handleOpenPhysicalParameterModal}
              >
                Novo parâmetro fīsico
              </Button>
            ),
          },
          {
            element: <VirtualParameterTab equipmentId={params.equipmentId!} />,
            content: (
              <Button
                variant="contained"
                onClick={handleOpenVirtualParameterModal}
              >
                Novo parâmetro virtual
              </Button>
            ),
          },
          {
            element: <GroupParameterTab equipmentId={params.equipmentId!} />,
            content: (
              <Button
                variant="contained"
                onClick={handleOpenGroupParameterModal}
              >
                Novo grupo de parâmetros
              </Button>
            ),
          },
        ]}
      />
    </HeroContainer>
  );
};

type TabProps = {
  equipmentId: string;
};

const PhysicalParameterTab: React.FC<TabProps> = ({ equipmentId }) => {
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
    <>
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
    </>
  );
};

const VirtualParameterTab: React.FC<TabProps> = ({ equipmentId }) => {
  return (
    <>
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
    </>
  );
};

const GroupParameterTab: React.FC<TabProps> = ({ equipmentId }) => {
  return (
    <>
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
    </>
  );
};

export default EquipmentParametersPage;
