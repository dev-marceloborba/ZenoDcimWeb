import DataTableV2 from "modules/shared/components/datatableV2/DataTable";
import HeroContainer from "modules/shared/components/HeroContainer";
import Tabs from "modules/shared/components/tabs/Tabs";
import Button from "@mui/material/Button";
import { useModal } from "mui-modal-provider";
import {
  useCreateSiteMutation,
  useDeleteSiteMutation,
  useFindAllSitesQuery,
  useUpdateSiteMutation,
} from "modules/datacenter/services/site-service";
import {
  BuildingModel,
  FloorModel,
  RoomModel,
  SiteModel,
} from "modules/datacenter/models/datacenter-model";
import {
  useCreateBuildingMutation,
  useDeleteBuildingMutation,
  useFindAllBuildingsQuery,
  useUpdateBuildingMutation,
} from "modules/datacenter/services/building-service";
import {
  useCreateFloorMutation,
  useDeleteFloorMutation,
  useFindAllFloorsQuery,
  useUpdateFloorMutation,
} from "modules/datacenter/services/floor-service";
import {
  useCreateRoomMutation,
  useDeleteRoomMutation,
  useFindAllRoomsQuery,
  useUpdateRoomMutation,
} from "modules/datacenter/services/room-service";
import SiteFormModal from "modules/datacenter/modals/site-form-modal/SiteFormModal";
import { useToast } from "modules/shared/components/ToastProvider";
import Loading from "modules/shared/components/Loading";
import BuildingFormModal from "modules/datacenter/modals/building-form-modal/BuildingFormModal";
import FloorFormModal from "modules/datacenter/modals/floor-form-modal/FloorFormModal";
import RoomFormModal from "modules/datacenter/modals/room-form-modal/RoomFormModal";

export default function InfrastructurePage() {
  const { showModal } = useModal();
  const toast = useToast();
  const { data: sites, isLoading: isLoadingFetchSites } =
    useFindAllSitesQuery();
  const { data: buildings, isLoading: isLoadingFetchBuildings } =
    useFindAllBuildingsQuery();
  const { data: floors, isLoading: isLoadingFetchFloors } =
    useFindAllFloorsQuery();
  const { data: rooms, isLoading: isLoadingFetchRooms } =
    useFindAllRoomsQuery();

  const [createSite, { isLoading: isLoadingCreateSite }] =
    useCreateSiteMutation();
  const [createBuilding, { isLoading: isLoadingCreateBuilding }] =
    useCreateBuildingMutation();
  const [createFloor, { isLoading: isLoadingCreateFloor }] =
    useCreateFloorMutation();
  const [createRoom, { isLoading: isLoadingCreateRoom }] =
    useCreateRoomMutation();

  const handleOpenSiteModal = () => {
    const modal = showModal(SiteFormModal, {
      title: "Novo site",
      onConfirm: async (site) => {
        modal.hide();
        try {
          await createSite(site).unwrap();
          toast.open({ message: "Site criado com sucesso" });
        } catch (error) {
          console.log(error);
          toast.open({ message: "Erro ao criar site", severity: "error" });
        }
      },
      onClose: () => {
        modal.hide();
      },
    });
  };
  const handleOpenBuildingModal = () => {
    const modal = showModal(BuildingFormModal, {
      title: "Novo prédio",
      data: {
        sites,
      },
      onConfirm: async (building) => {
        modal.hide();
        try {
          await createBuilding(building).unwrap();
          toast.open({ message: "Prédio criado com sucesso" });
        } catch (error) {
          console.log(error);
          toast.open({ message: "Erro ao criar prédio", severity: "error" });
        }
      },
      onClose: () => {
        modal.hide();
      },
    });
  };
  const handleOpenFloorModal = () => {
    const modal = showModal(FloorFormModal, {
      title: "Novo andar",
      data: {
        sites,
      },
      onConfirm: async (floor) => {
        modal.hide();
        try {
          await createFloor(floor).unwrap();
          toast.open({ message: "Andar criado com sucesso" });
        } catch (error) {
          console.log(error);
          toast.open({ message: "Erro ao criar andar", severity: "error" });
        }
      },
      onClose: () => {
        modal.hide();
      },
    });
  };
  const handleOpenRoomModal = () => {
    const modal = showModal(RoomFormModal, {
      title: "Nova sala",
      data: {
        sites,
      },
      onConfirm: async (room) => {
        modal.hide();
        try {
          await createRoom(room).unwrap();
          toast.open({ message: "Sala criada com sucesso" });
        } catch (error) {
          console.log(error);
          toast.open({ message: "Erro ao criar sala", severity: "error" });
        }
      },
      onClose: () => {
        modal.hide();
      },
    });
  };

  return (
    <HeroContainer title="Infraestrutura">
      <Tabs
        mode="horizontal"
        tabLabels={["Sites", "Prédios", "Andares", "Salas"]}
        tabItems={[
          {
            element: <SitesTab sites={sites ?? []} />,
            content: (
              <Button variant="contained" onClick={handleOpenSiteModal}>
                Novo site
              </Button>
            ),
          },
          {
            element: (
              <BuildingsTab buildings={buildings ?? []} sites={sites ?? []} />
            ),
            content: (
              <Button variant="contained" onClick={handleOpenBuildingModal}>
                Novo prédio
              </Button>
            ),
          },
          {
            element: <FloorsTab floors={floors ?? []} sites={sites ?? []} />,
            content: (
              <Button variant="contained" onClick={handleOpenFloorModal}>
                Novo andar
              </Button>
            ),
          },
          {
            element: (
              <RoomsTab
                rooms={rooms ?? []}
                floors={floors ?? []}
                buildings={buildings ?? []}
                sites={sites ?? []}
              />
            ),
            content: (
              <Button variant="contained" onClick={handleOpenRoomModal}>
                Nova sala
              </Button>
            ),
          },
        ]}
      />
      <Loading
        open={
          isLoadingCreateSite ||
          isLoadingCreateBuilding ||
          isLoadingCreateFloor ||
          isLoadingCreateRoom ||
          isLoadingFetchSites ||
          isLoadingFetchBuildings ||
          isLoadingFetchFloors ||
          isLoadingFetchRooms
        }
      />
    </HeroContainer>
  );
}

type SitesTabProps = {
  sites: SiteModel[];
};

const SitesTab: React.FC<SitesTabProps> = ({ sites }) => {
  const toast = useToast();
  const { showModal } = useModal();
  const [updateSite, { isLoading: isLoadingUpdate }] = useUpdateSiteMutation();
  const [deleteSite, { isLoading: isLoadingDelete }] = useDeleteSiteMutation();

  const handleEditSite = (site: SiteModel) => {
    const modal = showModal(SiteFormModal, {
      title: "Editar site",
      mode: "edit",
      data: site,
      onConfirm: async (formData) => {
        modal.hide();
        try {
          await updateSite({
            ...formData,
            id: site.id,
          }).unwrap();
          toast.open({ message: "Site alterado com sucesso" });
        } catch (error) {
          console.log(error);
          toast.open({ message: "Erro ao alterar site", severity: "error" });
        }
      },
      onClose: () => {
        modal.hide();
      },
    });
  };
  const handleDeleteSite = async (site: SiteModel) => {
    try {
      await deleteSite(site.id).unwrap();
      toast.open({ message: "Site excluído com sucesso" });
    } catch (error) {
      console.log(error);
      toast.open({ message: "Erro ao excluir site", severity: "error" });
    }
  };

  return (
    <>
      <DataTableV2
        title="Sites"
        rows={sites}
        columns={[
          {
            name: "name",
            label: "Site",
          },
        ]}
        options={{
          showEdit: true,
          showDelete: true,
          onEditRow: handleEditSite,
          onDeleteRow: handleDeleteSite,
        }}
      />
      <Loading open={isLoadingUpdate || isLoadingDelete} />
    </>
  );
};

type BuildingsTabProps = {
  buildings: BuildingModel[];
  sites: SiteModel[];
};

const BuildingsTab: React.FC<BuildingsTabProps> = ({ buildings, sites }) => {
  const toast = useToast();
  const { showModal } = useModal();
  const [updateBuilding, { isLoading: isLoadingUpdate }] =
    useUpdateBuildingMutation();
  const [deleteBuilding, { isLoading: isLoadingDelete }] =
    useDeleteBuildingMutation();

  const handleEditBuilding = (building: BuildingModel) => {
    const modal = showModal(BuildingFormModal, {
      title: "Editar prédio",
      mode: "edit",
      data: {
        model: building,
        sites,
      },
      onConfirm: async (formData) => {
        modal.hide();
        try {
          await updateBuilding({
            ...formData,
            id: building.id,
          }).unwrap();
          toast.open({ message: "Prédio alterado com sucesso" });
        } catch (error) {
          console.log(error);
          toast.open({ message: "Erro ao alterar prédio", severity: "error" });
        }
      },
      onClose: () => {
        modal.hide();
      },
    });
  };

  const handleDeleteBuilding = async (building: BuildingModel) => {
    try {
      await deleteBuilding(building.id).unwrap();
      toast.open({ message: "Prédio excluído com sucesso" });
    } catch (error) {
      console.log(error);
      toast.open({ message: "Erro ao excluir prédio", severity: "error" });
    }
  };
  return (
    <>
      <DataTableV2
        title="Prédios"
        rows={buildings.map((building) => ({
          ...building,
          siteName: building.site?.name ?? "",
        }))}
        columns={[
          {
            name: "siteName",
            label: "Site",
          },
          {
            name: "name",
            label: "Prédio",
          },
        ]}
        options={{
          showEdit: true,
          showDelete: true,
          onEditRow: handleEditBuilding,
          onDeleteRow: handleDeleteBuilding,
        }}
      />
      <Loading open={isLoadingUpdate || isLoadingDelete} />
    </>
  );
};

type FloorsTabProps = {
  floors: FloorModel[];
  sites: SiteModel[];
};

const FloorsTab: React.FC<FloorsTabProps> = ({ floors, sites }) => {
  const toast = useToast();
  const { showModal } = useModal();
  const [updateFloor, { isLoading: isLoadingUpdate }] =
    useUpdateFloorMutation();
  const [deleteFloor, { isLoading: isLoadingDelete }] =
    useDeleteFloorMutation();

  const handleEditFloor = (floor: FloorModel) => {
    const modal = showModal(FloorFormModal, {
      title: "Editar andar",
      mode: "edit",
      data: {
        model: floor,
        sites,
      },
      onConfirm: async (formData) => {
        modal.hide();
        try {
          await updateFloor({ ...formData, id: floor.id }).unwrap();
          toast.open({ message: "Andar alterado com sucesso" });
        } catch (error) {
          console.log(floor);
          toast.open({ message: "Erro ao alterar andar", severity: "error" });
        }
      },
      onClose: () => {
        modal.hide();
      },
    });
  };

  const handleDeleteFloor = async (floor: FloorModel) => {
    try {
      await deleteFloor(floor.id).unwrap();
      toast.open({ message: "Andar excluído com sucesso" });
    } catch (error) {
      console.log(error);
      toast.open({ message: "Erro ao excluir andar", severity: "error" });
    }
  };
  return (
    <>
      <DataTableV2
        title="Andares"
        rows={floors.map((floor) => ({
          ...floor,
          siteName: floor.building?.site?.name ?? "",
          buildingName: floor.building?.name ?? "",
        }))}
        columns={[
          {
            name: "siteName",
            label: "Site",
          },
          {
            name: "buildingName",
            label: "Prédio",
          },
          {
            name: "name",
            label: "Andar",
          },
        ]}
        options={{
          showEdit: true,
          showDelete: true,
          onEditRow: handleEditFloor,
          onDeleteRow: handleDeleteFloor,
        }}
      />
      <Loading open={isLoadingUpdate || isLoadingDelete} />
    </>
  );
};

type RoomsTabProps = {
  sites: SiteModel[];
  buildings: BuildingModel[];
  floors: FloorModel[];
  rooms: RoomModel[];
};

const RoomsTab: React.FC<RoomsTabProps> = ({
  sites,
  buildings,
  floors,
  rooms,
}) => {
  const toast = useToast();
  const { showModal } = useModal();
  const [updateRoom, { isLoading: isLoadingUpdate }] = useUpdateRoomMutation();
  const [deleteRoom, { isLoading: isLoadingDelete }] = useDeleteRoomMutation();

  const handleEditRoom = (room: RoomModel) => {
    const modal = showModal(RoomFormModal, {
      title: "Editar sala",
      mode: "edit",
      data: {
        model: room,
        sites,
      },
      onConfirm: async (formData) => {
        modal.hide();
        try {
          await updateRoom({ ...formData, id: room.id }).unwrap();
          toast.open({ message: "Sala alterada com sucesso" });
        } catch (error) {
          console.log(error);
          toast.open({ message: "Erro ao alterar sala", severity: "error" });
        }
      },
      onClose: () => {
        modal.hide();
      },
    });
  };

  const handleDeleteRoom = async (room: RoomModel) => {
    try {
      await deleteRoom(room.id).unwrap();
      toast.open({ message: "Sala excluída com sucesso" });
    } catch (error) {
      console.log(error);
      toast.open({ message: "Erro ao excluir sala", severity: "error" });
    }
  };
  return (
    <>
      <DataTableV2
        title="Salas"
        rows={rooms.map((room) => ({
          ...room,
          siteName: room.floor?.building?.site?.name ?? "",
          buildingName: room.floor?.building?.name ?? "",
          floorName: room.floor?.name ?? "",
        }))}
        columns={[
          {
            name: "siteName",
            label: "Site",
          },
          {
            name: "buildingName",
            label: "Prédio",
          },
          {
            name: "floorName",
            label: "Andar",
          },
          {
            name: "name",
            label: "Sala",
          },
        ]}
        options={{
          showEdit: true,
          showDelete: true,
          onEditRow: handleEditRoom,
          onDeleteRow: handleDeleteRoom,
        }}
      />
      <Loading open={isLoadingUpdate || isLoadingDelete} />
    </>
  );
};
