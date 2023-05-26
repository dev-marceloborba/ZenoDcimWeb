import HeroContainer from "modules/shared/components/HeroContainer";
import Tabs from "modules/shared/components/tabs/Tabs";
import CardSection from "modules/shared/components/card-section/CardSectionv3";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { useModal } from "mui-modal-provider";
import { useToast } from "modules/shared/components/ToastProvider";
import { useState } from "react";
import RackFormModal from "modules/datacenter/modals/rack-form-modal/RackFormModal";
import RackEquipmentFormModal from "modules/datacenter/modals/rack-equipment-form-modal/RackEquipmentFormModal";
import RackStatisticsCard from "./components/rack-statistics-card/RackStatisticsCard";

import IconButton from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ERackMount, RackModel } from "modules/datacenter/models/rack.model";
import useRouter from "modules/core/hooks/useRouter";
import {
  useFindRackByIdQuery,
  useUpdateRackMutation,
} from "modules/datacenter/services/rack.service";
import {
  useCreateRackEquipmentMutation,
  useDeleteRackEquipmentMutation,
  useFindRackEquipmentByIdMutation,
  useUpdateRackEquipmentMutation,
} from "modules/datacenter/services/rack-equipment.service";
import Loading from "modules/shared/components/Loading";
import {
  getEquipmentOrientation,
  getEquipmentStatus,
  getMountTypeDescription,
  getRackEquipmentType,
} from "./utils/rackDetailsUtils";
import EditButton from "modules/shared/components/edit-button/EditButton";
import DeleteButton from "modules/shared/components/DeleteButton";
import { useFindAllSitesQuery } from "modules/datacenter/services/site-service";

export default function RackDetailsPage() {
  const { params } = useRouter();
  const { showModal } = useModal();
  const toast = useToast();
  const {
    data: rack,
    isLoading: loadingFetchRack,
    refetch,
  } = useFindRackByIdQuery(params.rackId!);
  const [createRackEquipment, { isLoading: loadingCreateRack }] =
    useCreateRackEquipmentMutation();
  const { data: sites, isLoading: loadingSites } = useFindAllSitesQuery();
  const [updateRack, { isLoading: loadingUpdate }] = useUpdateRackMutation();

  const handleEditRack = () => {
    console.log(rack);
    const modal = showModal(RackFormModal, {
      title: "Editar rack",
      mode: "edit",
      data: {
        model: rack as any,
        sites,
      },
      onConfirm: async (formData) => {
        modal.hide();
        try {
          await updateRack({
            ...formData,
            id: rack!.id,
          }).unwrap();
          toast.open({ message: "Rack alterado com sucesso" });
        } catch (error) {
          console.log(error);
          toast.open({ message: "Erro ao alterar rack", severity: "error" });
        }
      },
      onClose: () => {
        modal.hide();
      },
    });
  };
  const handleInsertEquipment = () => {
    const modal = showModal(RackEquipmentFormModal, {
      title: "Inserir equipamento",
      onConfirm: async (formData) => {
        modal.hide();
        try {
          await createRackEquipment({
            ...formData,
            rackId: rack?.id ?? "",
          }).unwrap();
          toast.open({ message: "Equipamento de rack adicionado com sucesso" });
          refetch();
        } catch (error) {
          console.log(error);
          toast.open({
            //@ts-ignore
            message: `Erro ao adicionar equipamento de rack: ${error.data}`,
            severity: "error",
          });
        }
      },
      onClose: () => {
        modal.hide();
      },
      PaperProps: {
        sx: {
          minWidth: "650px",
          maxWidth: "900px",
        },
      },
    });
  };

  return (
    <HeroContainer title={rack?.name}>
      <Tabs
        tabItems={[
          {
            title: "Detalhes",
            element: <DetailsTab rack={rack} />,
            content: (
              <Button variant="contained" onClick={handleEditRack}>
                Editar rack
              </Button>
            ),
          },
          {
            title: "Ocupação",
            element: <OccupationTab rack={rack} reload={() => refetch()} />,
            content: (
              <Button variant="contained" onClick={handleInsertEquipment}>
                Inserir equipamento
              </Button>
            ),
          },
        ]}
      />
      <Loading open={loadingCreateRack || loadingFetchRack} />
    </HeroContainer>
  );
}

type DetailsTabProps = {
  rack: RackModel | undefined;
  reload?(): void;
};

const DetailsTab: React.FC<DetailsTabProps> = ({ rack }) => {
  return (
    <>
      <CardSection
        title="Local"
        items={[
          {
            title: "Site",
            description: rack?.site.name,
          },
          {
            title: "Prédio",
            description: rack?.building.name,
          },
          {
            title: "Andar",
            description: rack?.floor.name,
          },
          {
            title: "Sala",
            description: rack?.room.name,
          },
        ]}
      />
      <CardSection
        title="Identidade"
        items={[
          {
            title: "Rack",
            description: rack?.name,
            // defaultSize: 12,
          },
          {
            title: "Localização",
            description: rack?.localization,
          },
        ]}
        sx={{ my: 1 }}
      />

      <CardSection
        title="Dados do rack"
        items={[
          {
            title: "Potência do rack",
            description: `${rack?.power} kW`,
          },
          {
            title: "Unid. de rack",
            description: `${rack?.capacity} U`,
          },
          {
            title: "Peso suportável",
            description: `${rack?.weight} kg`,
          },
          {
            title: "Tamanho (a x c x p)",
            description: `${rack?.size} cm`,
          },
          {
            title: "Descrição",
            description: rack?.description,
            defaultSize: 6,
          },
        ]}
      />
    </>
  );
};

const OccupationTab: React.FC<DetailsTabProps> = ({ rack, reload }) => {
  const { showModal } = useModal();
  const toast = useToast();
  const [
    findRackEquipment,
    { data: rackEquipment, isLoading: loadingFindRack },
  ] = useFindRackEquipmentByIdMutation();
  const [updateEquipment] = useUpdateRackEquipmentMutation();
  const [deleteEquipment] = useDeleteRackEquipmentMutation();

  const handleSelectedEquipment = async ({ id }: RackSlotItem) => {
    await findRackEquipment(id).unwrap();
  };

  const handleEditEquipment = () => {
    const modal = showModal(RackEquipmentFormModal, {
      title: "Alterar equipamento",
      mode: "edit",
      data: rackEquipment,
      onConfirm: async (formData) => {
        modal.hide();
        try {
          await updateEquipment({
            ...formData,
            id: rackEquipment?.id ?? "",
          }).unwrap();
          reload!();
          await findRackEquipment(rackEquipment?.id ?? "").unwrap();
          toast.open({ message: "Equipamento de rack alterado com sucesso" });
        } catch (error) {
          console.log(error);
          toast.open({
            message: "Erro ao alterar equipamento de rack",
            severity: "error",
          });
        }
      },
      onClose: () => {
        modal.hide();
      },
      PaperProps: {
        sx: {
          minWidth: "650px",
          maxWidth: "900px",
        },
      },
    });
  };

  const handleDeleteRackEquipment = async () => {
    try {
      await deleteEquipment(rackEquipment!.id).unwrap();
      reload!();
      toast.open({ message: "Equipamento excluído com sucesso" });
    } catch (error) {
      console.log(error);
      toast.open({
        message: `Erro ao excluir equipamento`,
        severity: "error",
      });
    }
  };

  return (
    <Grid container columnSpacing={1}>
      <Grid
        item
        md={7}
        // marginTop={4.5}
      >
        <Grid container columnSpacing={2}>
          <Grid item md={4}>
            <RackStatisticsCard
              title="Potência livre"
              value={rack?.statistics?.availablePower}
              unit="W"
            />
          </Grid>
          <Grid item md={4}>
            <RackStatisticsCard
              title="Peso livre"
              value={rack?.statistics?.availableWeight}
              unit="kg"
            />
          </Grid>
          <Grid item md={4}>
            <RackStatisticsCard
              title="RU's livre"
              value={rack?.statistics?.availableSpace}
              unit="U"
            />
          </Grid>
        </Grid>
        {rackEquipment ? (
          <div>
            <Typography variant="h4">
              {rackEquipment?.baseEquipment.name}
            </Typography>
            <CardSection
              title="Local"
              items={[
                {
                  title: "Rack",
                  description: rackEquipment?.rack.name,
                },
                {
                  title: "Posição",
                  description: `${rackEquipment?.initialPosition} U`,
                },
              ]}
            />
            <CardSection
              title="Dados do equipamento"
              items={[
                {
                  title: "Marca",
                  description: rackEquipment?.baseEquipment.manufactor,
                  defaultSize: 4,
                },
                {
                  title: "Modelo",
                  description: rackEquipment?.baseEquipment.model,
                  defaultSize: 4,
                },
                {
                  title: "Montagem",
                  description: getMountTypeDescription(
                    rackEquipment.rackMountType
                  ),
                  defaultSize: 4,
                },
                {
                  title: "Tamanho",
                  description: `${rackEquipment.size} cm`,
                  defaultSize: 4,
                },
                {
                  title: "Peso",
                  description: `${rackEquipment?.weight} kg`,
                  defaultSize: 4,
                },
                {
                  title: "RU's",
                  description: `${rackEquipment?.occupation} RU's`,
                  defaultSize: 4,
                },
                {
                  title: "Potência",
                  description: `${rackEquipment?.power} W`,
                  defaultSize: 4,
                },
                {
                  title: "Orientação",
                  description: getEquipmentOrientation(
                    rackEquipment.rackEquipmentOrientation
                  ),
                  defaultSize: 4,
                },
                {
                  title: "Status",
                  description: getEquipmentStatus(rackEquipment.status),
                  defaultSize: 4,
                },
              ]}
              sx={{ my: 1 }}
            />
            <CardSection
              title="Identidade"
              items={[
                {
                  title: "Número de série",
                  description: rackEquipment?.baseEquipment.serialNumber,
                  defaultSize: 4,
                },
                {
                  title: "Cliente",
                  description: rackEquipment?.client,
                  defaultSize: 4,
                },
                {
                  title: "Nome equipamento",
                  description: rackEquipment?.baseEquipment.name,
                  defaultSize: 4,
                },
                {
                  title: "Tipo",
                  description: getRackEquipmentType(
                    rackEquipment.rackEquipmentType
                  ),
                  defaultSize: 4,
                },
                {
                  title: "Função",
                  description: rackEquipment?.function,
                  defaultSize: 4,
                },
              ]}
            />
            <Stack direction="row" sx={{ mt: 1 }}>
              <EditButton mode="button" onClick={handleEditEquipment} />
              <DeleteButton
                mode="button"
                onDeleteConfirmation={handleDeleteRackEquipment}
                sx={{ ml: 2 }}
              />
            </Stack>
          </div>
        ) : null}
      </Grid>
      <Grid item md={5} sx={{ position: "relative" }}>
        <RackSlot
          rackSize={rack?.capacity ?? 0}
          items={
            rack?.rackSlots?.map((rackSlot) => ({
              id: rackSlot.equipmentId,
              name: rackSlot.description,
              position: {
                initial: rackSlot.initialPosition,
                final: rackSlot.finalPosition,
              },
              rackMount: rackSlot.rackMountType,
            })) ?? []
          }
          onSelectEquipment={handleSelectedEquipment}
          selectedRackSlotId={rackEquipment?.id ?? ""}
        />
      </Grid>
      <Loading open={loadingFindRack} />
    </Grid>
  );
};

type RackSlotProps = {
  rackSize: number;
  items: RackSlotItem[];
  onSelectEquipment(slot: RackSlotItem): void;
  selectedRackSlotId?: string;
};

type RackMode = "front" | "back";

type RackSlotItem = {
  id: string;
  name: string;
  position: {
    initial: number;
    final: number;
  };
  rackMount: ERackMount;
};

const RackSlot: React.FC<RackSlotProps> = ({
  rackSize,
  items,
  onSelectEquipment,
  selectedRackSlotId,
}) => {
  const [rackView, setRackView] = useState<RackMode>("front");

  const toggleRackView = () =>
    setRackView((prevState) => (prevState === "back" ? "front" : "back"));

  return (
    <Paper sx={{ position: "relative" }}>
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: 0,
          right: 0,
        }}
      >
        <IconButton onClick={toggleRackView} sx={{ minWidth: 0 }}>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton onClick={toggleRackView} sx={{ minWidth: 0 }}>
          <ChevronRightIcon />
        </IconButton>
      </div>

      <Typography textAlign="center" variant="h6" sx={{ my: 0 }}>
        {rackView === "front" ? "Front view" : "Back view"}
      </Typography>

      <div style={{ overflow: "auto", maxHeight: "640px", marginTop: "16px" }}>
        {items.map((item, idx) => {
          if (item.rackMount === ERackMount.NO_ONE) {
            return (
              <AvailableSlot
                key={idx}
                position={{
                  left:
                    rackView === "back"
                      ? item.position.initial
                      : rackSize - item.position.initial + 1,
                  right:
                    rackView === "front"
                      ? item.position.initial
                      : rackSize - item.position.initial + 1,
                }}
              />
            );
          } else {
            return (
              <OccupiedSlot
                key={idx}
                rackView={rackView}
                rackSlot={item}
                rackSize={rackSize}
                description={item.name}
                mountType={item.rackMount}
                position={{
                  left: item.position.initial,
                  right: item.position.initial,
                }}
                slots={Array.from(
                  { length: item.position.final - item.position.initial + 1 },
                  (_, idx) => idx
                )}
                onSlotClick={onSelectEquipment}
                selectedRackSlotId={selectedRackSlotId}
              />
            );
          }
        })}
      </div>
    </Paper>
  );
};

type AvailableSlotProps = {
  position: {
    left: number;
    right: number;
  };
};

const AvailableSlot: React.FC<AvailableSlotProps> = ({ position }) => {
  return (
    <Paper
      sx={{
        borderRadius: 0,
        boxShadow: 0,
        padding: "0 20px",
      }}
    >
      <Divider />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        minHeight={"24px"}
      >
        <Avatar
          sx={{
            ml: 1,
            fontSize: "12px",
            width: "20px",
            height: "20px",
          }}
        >
          {position.left}
        </Avatar>
        <Typography>Disponível</Typography>
        <Avatar
          sx={{
            ml: 1,
            fontSize: "12px",
            width: "20px",
            height: "20px",
          }}
        >
          {position.right}
        </Avatar>
      </Stack>
      <Divider />
    </Paper>
  );
};

type OccupiedSlotProps = {
  rackView: RackMode;
  rackSlot: RackSlotItem;
  rackSize: number;
  description: string;
  slots: number[];
  position: {
    left: number;
    right: number;
  };
  mountType: ERackMount;
  onSlotClick(slot: RackSlotItem): void;
  selectedRackSlotId?: string;
};

const OccupiedSlot: React.FC<OccupiedSlotProps> = ({
  rackView,
  rackSlot,
  rackSize,
  selectedRackSlotId,
  description,
  slots,
  position,
  mountType,
  onSlotClick,
}) => {
  const getBackgroundColor = (rackMount: ERackMount) => {
    switch (rackMount) {
      case ERackMount.RACK_19_FRONTSIDE:
        return rackView === "front" ? "green" : "red";
      case ERackMount.RACK_19_BACKSIDE:
        return rackView === "front" ? "red" : "green";
      case ERackMount.RACK_19_BOTHSIDE:
        return "green";
      case ERackMount.WITH_ACESSORY_FRONTSIDE:
        return rackView === "front" ? "green" : "red";
      case ERackMount.WITH_ACESSORY_BACKSIDE:
        return rackView === "front" ? "red" : "green";
      case ERackMount.LATERAL:
        return null;
      case ERackMount.BDJ_FRONTSIDE:
        return rackView === "front" ? "green" : "red";
      case ERackMount.BDJ_BACKSIDE:
        return rackView === "front" ? "red" : "green";
      case ERackMount.NO_ONE:
        return null;
    }
  };

  return (
    <div style={{ position: "relative", padding: "0 20px" }}>
      <Divider />
      {slots.map((_, idx) => (
        <Paper
          key={idx}
          sx={{
            borderRadius: 0,
            boxShadow: 0,
            backgroundColor: getBackgroundColor(mountType),
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            minHeight={"24px"}
          >
            <Avatar
              sx={{
                ml: 1,
                fontSize: "12px",
                width: "20px",
                height: "20px",
              }}
            >
              {rackView === "back"
                ? position.left + idx
                : rackSize - position.left - idx + 1}
            </Avatar>
            <Avatar
              sx={{
                ml: 1,
                fontSize: "12px",
                width: "20px",
                height: "20px",
              }}
            >
              {rackView === "front"
                ? position.right + idx
                : rackSize - position.left - idx + 1}
            </Avatar>
          </Stack>
        </Paper>
      ))}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          cursor: "pointer",
          width: "100%",
          textAlign: "center",
        }}
        onClick={() => onSlotClick(rackSlot)}
      >
        {description}
      </div>
      {selectedRackSlotId && selectedRackSlotId === rackSlot.id ? (
        <>
          <ChevronRightIcon
            sx={{
              position: "absolute",
              width: "20px",
              height: "20px",
              padding: 0,
              top: "50%",
              left: 0,
              transform: "translate(0%, -50%)",
            }}
          />
          <ChevronLeftIcon
            sx={{
              position: "absolute",
              width: "20px",
              height: "20px",
              padding: 0,
              top: "50%",
              right: 0,
              transform: "translate(0%, -50%)",
            }}
          />
        </>
      ) : null}
    </div>
  );
};
