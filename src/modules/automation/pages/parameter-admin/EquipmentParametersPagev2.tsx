import Button from "@mui/material/Button";
import DataTableV2, {
  ColumnHeader,
} from "modules/shared/components/datatableV2/DataTable";
import HeroContainer from "modules/shared/components/HeroContainer";
import Loading from "modules/shared/components/Loading";
import Tabs from "modules/shared/components/tabs/Tabs";
import { useModal } from "mui-modal-provider";
import PhysicalParameterModal from "modules/automation/modals/physical-parameter-modal/PhysicalParameterModal";
import VirtualParameterFormModal from "modules/automation/modals/virtual-parameter-form-modal/VirtualParameterFormModal";
import GroupParameterFormModal from "modules/automation/modals/group-parameter-form-modal/GroupParameterFormModal";
import {
  useCreateParameterMutation,
  useDeleteParameterMutation,
  useFindAllParametersQuery,
  useUpdateParameterMutation,
} from "modules/automation/services/parameter-service";
import {
  useCreateEquipmentParameterGroupMutation,
  useDeleteParameterGroupMutation,
  useFindAllParameterGroupsQuery,
  useUpdateEquipmentParameterGroupMutation,
} from "modules/automation/services/parameter-group-service";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  EquipmentParameterGroupModel,
  ParameterModel,
} from "modules/automation/models/automation-model";
import { useToast } from "modules/shared/components/ToastProvider";
import {
  useCreateVirtualParameterMutation,
  useDeleteVirtualParameterMutation,
  useUpdateVirtualParameterMutation,
} from "modules/automation/services/virtual-parameter-service";
import { useFindAllSitesQuery } from "modules/datacenter/services/site-service";
import { SiteModel } from "modules/datacenter/models/datacenter-model";

const EquipmentParametersPage: React.FC = () => {
  const toast = useToast();
  const { showModal } = useModal();
  const { data: sites } = useFindAllSitesQuery();
  const { data: parameters, isLoading: isLoadingFetch } =
    useFindAllParametersQuery();
  const [createParameter, { isLoading: isLoadingCreateParameter }] =
    useCreateParameterMutation();
  const [
    createVirtualParameter,
    { isLoading: isLoadingCreateVirtualParameter },
  ] = useCreateVirtualParameterMutation();
  const [createGroup, { isLoading: isLoadingCreateGroup }] =
    useCreateEquipmentParameterGroupMutation();

  const handleOpenPhysicalParameterModal = () => {
    const modal = showModal(PhysicalParameterModal, {
      title: "Novo parâmetro físico",
      onConfirm: async (formData) => {
        modal.hide();
        try {
          await createParameter(formData).unwrap();
          toast.open({ message: "Parâmetro criado com sucesso" });
        } catch (error) {
          console.log(error);
          toast.open({ message: "Erro ao criar parâmetro", severity: "error" });
        }
      },
      onClose: () => {
        modal.hide();
      },
    });
  };

  const handleOpenVirtualParameterModal = () => {
    const modal = showModal(VirtualParameterFormModal, {
      title: "Novo parâmetro virtual",
      data: {
        sites,
      },
      onConfirm: async (formData) => {
        modal.hide();
        try {
          await createVirtualParameter(formData).unwrap();
          toast.open({ message: "Parâmetro virtual criado com sucesso" });
        } catch (error) {
          console.log(error);
          toast.open({
            message: "Erro ao criar parâmetro virtual",
            severity: "error",
          });
        }
      },
      onClose: () => {
        modal.hide();
      },
    });
  };

  const handleOpenGroupParameterModal = () => {
    const modal = showModal(GroupParameterFormModal, {
      title: "Novo grupo de parâmetros",
      data: {
        parameters,
      },
      onConfirm: async (formData) => {
        modal.hide();
        try {
          await createGroup(formData).unwrap();
          toast.open({ message: "Grupo criado com sucesso" });
        } catch (error) {
          console.log(error);
          toast.open({ message: "Erro ao criar grupo", severity: "error" });
        }
      },
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
            element: (
              <PhysicalParameterTab
                parameters={
                  parameters?.filter((x) => x.discriminator === "Parameter") ??
                  []
                }
              />
            ),
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
            element: (
              <VirtualParameterTab
                parameters={
                  parameters?.filter(
                    (x) => x.discriminator === "VirtualParameter"
                  ) ?? []
                }
                sites={sites}
              />
            ),
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
            element: <GroupParameterTab parameters={parameters ?? []} />,
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
      <Loading
        open={
          isLoadingFetch ||
          isLoadingCreateParameter ||
          isLoadingCreateVirtualParameter ||
          isLoadingCreateGroup
        }
      />
    </HeroContainer>
  );
};

type TabProps = {
  parameters: ParameterModel[];
};

const PhysicalParameterTab: React.FC<TabProps> = ({ parameters }) => {
  const toast = useToast();
  const { showModal } = useModal();
  const [updateParameter, { isLoading: isLoadingUpdate }] =
    useUpdateParameterMutation();

  const [deleteParameter, { isLoading: isLoadingDelete }] =
    useDeleteParameterMutation();

  const handleUpdateParameter = (parameter: ParameterModel) => {
    const modal = showModal(PhysicalParameterModal, {
      title: "Editar parâmetro",
      mode: "edit",
      data: parameter,
      onConfirm: async (formData) => {
        modal.hide();
        try {
          await updateParameter({ ...formData, id: parameter.id }).unwrap();
          toast.open({ message: "Parâmetro alterado com sucesso" });
        } catch (error) {
          console.log(error);
          toast.open({
            message: "Erro ao alterar parâmetro",
            severity: "error",
          });
        }
      },
      onClose: () => {
        modal.hide();
      },
    });
  };
  const handleDeleteParameter = async ({ id }: ParameterModel) => {
    try {
      await deleteParameter(id).unwrap();
      toast.open({ message: "Parâmetro excluído com sucesso" });
    } catch (error) {
      console.log(error);
      toast.open({
        message: "Erro ao excluir parâmetro",
        severity: "error",
      });
    }
  };

  return (
    <>
      <DataTableV2
        title="Parâmetro fīsico"
        columns={physicalParametersColumns}
        rows={parameters ?? []}
        options={{
          showEdit: true,
          showDelete: true,
          selectionMode: "hide",
          onEditRow: handleUpdateParameter,
          onDeleteRow: handleDeleteParameter,
        }}
      />
      <Loading open={isLoadingUpdate || isLoadingDelete} />
    </>
  );
};

const physicalParametersColumns: ColumnHeader[] = [
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
];

type VirtualParamterTabProps = {
  parameters: ParameterModel[];
  sites?: SiteModel[];
};

const VirtualParameterTab: React.FC<VirtualParamterTabProps> = ({
  parameters,
  sites,
}) => {
  const toast = useToast();
  const { showModal } = useModal();

  const [updateParameter] = useUpdateVirtualParameterMutation();
  const [deleteParameter] = useDeleteVirtualParameterMutation();

  const handleUpdateParameter = (parameter: ParameterModel) => {
    const modal = showModal(VirtualParameterFormModal, {
      title: "Editar parâmetro",
      mode: "edit",
      data: {
        model: parameter,
        sites,
      },
      onConfirm: async (formData) => {
        modal.hide();
        try {
          await updateParameter({ ...formData, id: parameter.id });
          toast.open({ message: "Parâmetro virtual alterado com sucesso" });
        } catch (error) {
          console.log(error);
          toast.open({
            message: "Erro ao alterar parâmetro virtual",
            severity: "error",
          });
        }
      },
      onClose: () => {
        modal.hide();
      },
    });
  };

  const handleDeleteParameter = async ({ id }: ParameterModel) => {
    try {
      await deleteParameter(id).unwrap();
      toast.open({ message: "Parâmetro virtual excluído com sucesso" });
    } catch (error) {
      console.log(error);
      toast.open({
        message: "Erro ao excluir parâmetro virtual",
        severity: "error",
      });
    }
  };

  return (
    <>
      <DataTableV2
        title="Parâmetro virtual"
        columns={virtualParametersColumns}
        rows={parameters ?? []}
        options={{
          showEdit: true,
          showDelete: true,
          onEditRow: handleUpdateParameter,
          onDeleteRow: handleDeleteParameter,
          selectionMode: "hide",
        }}
      />
    </>
  );
};

const virtualParametersColumns: ColumnHeader[] = [
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
];

type GroupParameterProps = {
  parameters: ParameterModel[];
};

const GroupParameterTab: React.FC<GroupParameterProps> = ({ parameters }) => {
  const toast = useToast();
  const { showModal } = useModal();
  const { data: groups, isLoading } = useFindAllParameterGroupsQuery();
  const [updateGroup, { isLoading: isLoadingUpdate }] =
    useUpdateEquipmentParameterGroupMutation();
  const [deleteGroup, { isLoading: isLoadingDelete }] =
    useDeleteParameterGroupMutation();

  const handleUpdateGroup = (group: EquipmentParameterGroupModel) => {
    const modal = showModal(GroupParameterFormModal, {
      title: "Editar grupo",
      mode: "edit",
      data: {
        model: group,
        parameters,
      },
      onConfirm: async (formData) => {
        modal.hide();
        try {
          await updateGroup({ ...formData, id: group.id }).unwrap();
          toast.open({ message: "Grupo alterado com sucesso" });
        } catch (error) {
          console.log(error);
          toast.open({ message: "Erro ao alterar grupo", severity: "error" });
        }
      },
      onClose: () => {
        modal.hide();
      },
    });
  };
  const handleDeleteGroup = async ({ id }: EquipmentParameterGroupModel) => {
    try {
      await deleteGroup(id).unwrap();
      toast.open({ message: "Grupo excluído com sucesso" });
    } catch (error) {
      console.log(error);
      toast.open({
        message: "Erro ao excluir grupo",
        severity: "error",
      });
    }
  };

  return (
    <>
      <DataTableV2
        title="Grupo de parâmetros"
        columns={[
          {
            name: "name",
            label: "Grupo",
          },
          {
            name: "parameters",
            label: "Parâmetros",
          },
          {
            name: "units",
            label: "Unidade",
          },
          {
            name: "scales",
            label: "Escala",
          },
        ]}
        rows={
          groups?.map<any>((group: EquipmentParameterGroupModel) => {
            return {
              id: group.id,
              name: group.name,
              parameters: group.parameterGroupAssignments?.map(
                (assignment) => ({
                  id: assignment.parameter.id,
                  name: assignment.parameter.name,
                })
              ),
              units: group.parameterGroupAssignments?.map((assignment) => ({
                name: assignment.parameter.unit,
              })),
              scales: group.parameterGroupAssignments?.map((assignment) => ({
                name: assignment.parameter.scale,
              })),
            };
          }) ?? []
        }
        options={{
          showEdit: true,
          showDelete: true,
          onEditRow: handleUpdateGroup,
          onDeleteRow: handleDeleteGroup,
          selectionMode: "hide",
        }}
      />
      <Loading open={isLoading || isLoadingUpdate || isLoadingDelete} />
    </>
    // <TableContainer>
    //   <Table>
    //     <TableHead>
    //       <TableRow>
    //         <TableCell>Grupo</TableCell>
    //         <TableCell>Parâmetro</TableCell>
    //         <TableCell>Unidade</TableCell>
    //         <TableCell>Escala</TableCell>
    //         <TableCell>Tipo</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       <TableRow>
    //         <TableCell>Disjuntor 01</TableCell>
    //         <TableCell>
    //           <TableRow>
    //             <TableCell>Tensão elétrica - L1</TableCell>
    //             <TableCell>V</TableCell>
    //             <TableCell>1</TableCell>
    //             <TableCell>Parâmetro físico</TableCell>
    //           </TableRow>
    //         </TableCell>
    //       </TableRow>
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  );
};

export default EquipmentParametersPage;

export type ParameterGroupViewModel = {
  id: string;
  group: string;
  parameters: { id: string; name: string }[] | undefined;
  scales: { name: string }[] | undefined;
  units: { name: string }[] | undefined;
};
