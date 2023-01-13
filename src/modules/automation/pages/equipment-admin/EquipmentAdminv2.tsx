import React from "react";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import HeroContainer from "modules/shared/components/HeroContainer";
import AccessButton from "modules/shared/components/access-button/AccessButtonv2";
import useRouter from "modules/core/hooks/useRouter";
import DataTable, {
  ColumnHeader,
} from "modules/shared/components/datatableV2/DataTable";
import Loading from "modules/shared/components/Loading";
import { useToast } from "modules/shared/components/ToastProvider";
import { useModal } from "mui-modal-provider";
import {
  useCreateEquipmentMutation,
  useDeleteEquipmentMutation,
  useFindAllEquipmentsDetailedQuery,
  useFindEquipmentByIdMutation,
  useUpdateEquipmentMutation,
} from "modules/automation/services/equipment-service";
import {
  EquipmentModel,
  EquipmentViewModel,
} from "modules/automation/models/automation-model";
import getDateFormat from "modules/utils/helpers/getDateFormat";
import EquipmentFormModal from "modules/automation/modals/equipment-form-modal/EquipmentFormModal";
import { useFindAllSitesQuery } from "modules/datacenter/services/site-service";

const EquipmentAdmin: React.FC = () => {
  const toast = useToast();
  const { showModal } = useModal();
  const { navigate, path } = useRouter();

  const { data: sites } = useFindAllSitesQuery();
  const { data, isLoading } = useFindAllEquipmentsDetailedQuery();
  const [findEquipment] = useFindEquipmentByIdMutation();
  const [createEquipment, { isLoading: isLoadingCreate }] =
    useCreateEquipmentMutation();
  const [updateEquipment, { isLoading: isLoadingUpdate }] =
    useUpdateEquipmentMutation();
  const [deleteEquipment, { isLoading: isLoadingDelete }] =
    useDeleteEquipmentMutation();

  const handleOpenEquipmentModal = () => {
    const modal = showModal(EquipmentFormModal, {
      title: "Novo equipamento",
      data: {
        sites,
      },
      onConfirm: async (formData) => {
        modal.hide();
        try {
          await createEquipment(formData).unwrap();
          toast.open({ message: "Equipamento criado com sucesso" });
        } catch (error) {
          console.log(error);
          toast.open({
            message: "Erro ao criar equipamento",
            severity: "error",
          });
        }
      },
      onClose: () => {
        modal.hide();
      },
    });
  };

  const handleUpdateEquipment = (equipment: EquipmentModel) => {
    const modal = showModal(EquipmentFormModal, {
      title: "Editar equipamento",
      data: {
        sites,
        model: equipment,
      },
      onConfirm: async (formData) => {
        modal.hide();
        try {
          await updateEquipment({ ...formData, id: equipment.id }).unwrap();
          toast.open({ message: "Equipamento alterado com sucesso" });
        } catch (error) {
          console.log(error);
          toast.open({
            message: "Erro ao alterar equipamento",
            severity: "error",
          });
        }
      },
      onClose: () => {
        modal.hide();
      },
    });
  };
  const handleDeleteEquipment = async ({ id }: EquipmentModel) => {
    try {
      await deleteEquipment(id).unwrap();
      toast.open({ message: "Equipamento excluído com sucesso" });
    } catch (error) {
      console.log(error);
      toast.open({
        message: "Erro ao excluir equipamento",
        severity: "error",
      });
    }
  };

  const handleDuplicateItem = async (item: EquipmentModel) => {
    let equipment = await findEquipment(item.id).unwrap();
    const duplicate: EquipmentViewModel = {
      ...equipment,
      component: equipment.component + " - cópia",
    };

    try {
      await createEquipment(duplicate).unwrap();
      toast.open({ message: "Equipamento duplicado" });
    } catch (error) {
      console.log(error);
      toast.open({
        message: "Erro ao duplicar equipamento",
        severity: "error",
      });
    }
  };

  const handleOpenDetails = ({ id }: EquipmentModel) => {
    navigate(`${path}/details/${id}`, {});
  };

  return (
    <HeroContainer title="Configuração de equipamentos">
      <Tooltip title="Criar novo equipamento">
        <AccessButton
          startIcon={<AddIcon />}
          mode="regularButton"
          variant="contained"
          label="Novo equipamento"
          onClick={handleOpenEquipmentModal}
        />
      </Tooltip>

      <DataTable
        columns={columns}
        rows={data ?? []}
        title="Equipamentos"
        options={{
          showEdit: true,
          showDelete: true,
          onEditRow: handleUpdateEquipment,
          onDeleteRow: handleDeleteEquipment,
          selectionMode: "hide",
          onCopyItem: handleDuplicateItem,
          userPreferenceTable: "equipmentTable",
          onRowClick: handleOpenDetails,
        }}
      />
      <Loading
        open={
          isLoading || isLoadingCreate || isLoadingDelete || isLoadingUpdate
        }
      />
    </HeroContainer>
  );
};

export default EquipmentAdmin;

const columns: ColumnHeader[] = [
  {
    name: "name",
    label: "Componente",
  },
  {
    name: "building",
    label: "Prédio",
  },
  {
    name: "floor",
    label: "Andar",
  },
  {
    name: "room",
    label: "Sala",
  },
  {
    name: "weight",
    label: "Peso (kg)",
  },
  {
    name: "size",
    label: "Tamanho (LxAxC cm)",
  },
  {
    name: "createdAt",
    label: "Data de criação",
    customFunction: (row) => {
      return getDateFormat(row);
    },
  },
];
