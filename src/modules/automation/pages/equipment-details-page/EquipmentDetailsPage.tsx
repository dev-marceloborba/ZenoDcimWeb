import HeroContainer from "modules/shared/components/HeroContainer";
import Button from "@mui/material/Button";
import DataTableV2, {
  ColumnHeader,
} from "modules/shared/components/datatableV2/DataTable";
import useRouter from "modules/core/hooks/useRouter";
import {
  useFindEquipmentByIdQueryQuery,
  useUpdateEquipmentMutation,
} from "modules/automation/services/equipment-service";
import { EquipmentModel } from "modules/automation/models/automation-model";
import Loading from "modules/shared/components/Loading";
import {
  useCreateEquipmentParameterMutation,
  useDeleteEquipmentParameterMutation,
  useUpdateEquipmentParameterMutation,
} from "modules/automation/services/equipment-parameter-service";
import { useModal } from "mui-modal-provider";
import EquipmentFormModal from "modules/automation/modals/equipment-form-modal/EquipmentFormModal";
import Tabs from "modules/shared/components/tabs/Tabs";
import { useToast } from "modules/shared/components/ToastProvider";
import { EquipmentParameterModel } from "modules/automation/models/automation-model";
import EquipmentParameterFormModal from "modules/automation/modals/equipment-parameter-form-modal/EquipmentParameterFormModal";
import CardSection from "modules/shared/components/card-section/CardSectionv3";
import { useFindAllSitesQuery } from "modules/datacenter/services/site-service";
import Stack from "@mui/material/Stack";
import { getEquipmentStatusFromEnum } from "modules/automation/utils/equipmentUtils";

const EquipmentDetailsPage: React.FC = () => {
  const { params } = useRouter();
  const { data: sites } = useFindAllSitesQuery();
  const {
    data: equipment,
    isLoading: isLoadingFetch,
    refetch,
  } = useFindEquipmentByIdQueryQuery(params.equipmentId!);

  const [updateEquipment, { isLoading: isLoadingUpdate }] =
    useUpdateEquipmentMutation();

  const [createEquipmentParameter] = useCreateEquipmentParameterMutation();

  const { showModal } = useModal();
  const toast = useToast();

  const handleShowEquipmentModal = () => {
    const modal = showModal(EquipmentFormModal, {
      title: "Editar equipamento",
      onConfirm: async (formData) => {
        modal.hide();
        try {
          await updateEquipment({
            id: equipment?.id ?? "",
            ...formData,
          }).unwrap();
          toast.open({ message: "Equipamento atualizado com sucesso" });
        } catch (error) {
          console.log(error);
          toast.open({
            message: "Erro ao atualizar equipamento",
            severity: "error",
          });
        }
      },
      onClose: () => {
        modal.hide();
      },
      mode: "edit",
      data: {
        model: equipment,
        sites,
      },
    });
  };

  const handleOpenParameterAssociation = () => {
    const modal = showModal(EquipmentParameterFormModal, {
      title: "Novo parâmetro do equipamento",
      onConfirm: async (formData) => {
        modal.destroy();
        try {
          await createEquipmentParameter({
            ...formData,
            equipmentId: params.equipmentId!,
          }).unwrap();
          toast.open({ message: "Parâmetro atualizado com sucesso" });
        } catch (error) {
          console.log(error);
          toast.open({
            message: "Erro ao adicionar parâmetro",
            severity: "error",
          });
        }
      },
      onClose: () => {
        modal.destroy();
      },
    });
  };

  return (
    <HeroContainer title={equipment?.component}>
      <Tabs
        mode="horizontal"
        tabLabels={["Detalhes", "Parâmetros"]}
        tabItems={[
          {
            element: <DetailsTab equipment={equipment} />,
            content: (
              <Button variant="contained" onClick={handleShowEquipmentModal}>
                Editar equipamento
              </Button>
            ),
          },
          {
            element: (
              <ParametersTab
                parameters={equipment?.equipmentParameters ?? []}
                refetch={refetch}
              />
            ),
            content: (
              <Stack direction="row">
                <Button
                  variant="contained"
                  onClick={() => handleOpenParameterAssociation()}
                >
                  Adicionar parâmetro físico
                </Button>
                <Button variant="contained" sx={{ ml: 1 }}>
                  Adicionar parâmetro virtual
                </Button>
              </Stack>
            ),
          },
        ]}
      />
      <Loading open={isLoadingFetch || isLoadingUpdate} />
    </HeroContainer>
  );
};

export default EquipmentDetailsPage;

type DetailsTabProps = {
  equipment: EquipmentModel | undefined;
};

const DetailsTab: React.FC<DetailsTabProps> = ({ equipment }) => {
  return (
    <>
      <CardSection
        title="Local"
        items={[
          { title: "Site", description: equipment?.site?.name },
          {
            title: "Prédio",
            description: equipment?.building?.name,
          },
          {
            title: "Andar",
            description: equipment?.floor?.name,
          },
          {
            title: "Sala",
            description: equipment?.room?.name,
          },
        ]}
      />
      <CardSection
        title="Identidade"
        items={[
          { title: "Equipamento", description: equipment?.component },
          {
            title: "Código/N série",
            description: equipment?.componentCode,
          },
          {
            title: "Grupo",
            description: "Clima",
          },
          {
            title: "Status",
            description: getEquipmentStatusFromEnum(equipment?.status ?? 0),
          },
          {
            title: "Marca",
            description: equipment?.manufactor,
          },
        ]}
        sx={{ mt: 1 }}
      />
      <CardSection
        title="Parâmetros do equipamento"
        items={[
          {
            title: "Peso",
            description: `${equipment?.weight} kg`,
          },
          {
            title: "Tamanho",
            description: `${equipment?.size} cm`,
          },
          {
            title: "Potência",
            description: `${equipment?.powerLimit} W`,
          },
          {
            title: "",
            description: "",
          },
          {
            title: "Descrição",
            description: equipment?.description,
            defaultSize: 6,
          },
        ]}
        sx={{ mt: 1 }}
      />
    </>
  );
};

type ParametersTabProps = {
  parameters: EquipmentParameterModel[];
  refetch(): void;
};

const ParametersTab: React.FC<ParametersTabProps> = ({
  parameters,
  refetch,
}) => {
  const { showModal } = useModal();
  const toast = useToast();
  const { navigate, path, params } = useRouter();

  const [updateParameter, { isLoading: isLoadingUpdate }] =
    useUpdateEquipmentParameterMutation();

  const [deleteParameter, { isLoading: isLoadingDelete }] =
    useDeleteEquipmentParameterMutation();

  const handleEditParameter = (parameter: EquipmentParameterModel) => {
    const modal = showModal(EquipmentParameterFormModal, {
      title: "Editar parâmetro do equipamento",
      data: parameter,
      mode: "edit",
      onConfirm: async (formData) => {
        modal.destroy();
        try {
          await updateParameter({
            ...formData,
            equipmentId: params.equipmentId!,
            id: parameter.id,
          }).unwrap();
          refetch();
          toast.open({ message: "Parâmetro atualizado com sucesso" });
        } catch (error) {
          console.log(error);
          toast.open({
            message: "Erro ao atualizar parâmetro",
            severity: "error",
          });
        }
      },
      onClose: () => {
        modal.destroy();
      },
    });
  };

  const handleDeleteParameter = async (parameter: EquipmentParameterModel) => {
    try {
      await deleteParameter(parameter.id).unwrap();
      toast.open({ message: "Parâmetro excluído com sucesso" });
    } catch (error) {
      console.log(error);
      toast.open({ message: "Erro ao excluir parâmetro", severity: "error" });
    }
  };

  return (
    <>
      <DataTableV2
        title="Parâmetros"
        columns={parameterColumns}
        rows={
          parameters.map((parameter) => ({
            ...parameter,
            triggers: parameter.alarmRules?.length ?? 0,
          })) ?? []
        }
        options={{
          showEdit: true,
          showDelete: true,
          selectionMode: "hide",
          onEditRow: handleEditParameter,
          onDeleteRow: handleDeleteParameter,
          onRowClick: (row) => {
            navigate(`${path}/${row.id}/history`, {});
          },
        }}
      />
      <Loading open={isLoadingUpdate || isLoadingDelete} />
    </>
  );
};

const parameterColumns: ColumnHeader[] = [
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
    name: "triggers",
    label: "Triggers",
  },
  {
    name: "expression",
    label: "Tipo",
    renderComponent: (row: string) => (
      <>{row?.length > 0 ? "Virtual" : "Físico"}</>
    ),
  },
];
