import useRouter from "modules/core/hooks/useRouter";
import HeroContainer from "modules/shared/components/HeroContainer";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
// import DataTable, { ColumnHeader } from "modules/shared/components/DataTable";
import { useModal } from "mui-modal-provider";
import RackEquipmentPlacementForm from "./components/rack-equipment-placement-form/RackEquipmentPlacementForm";
import {
  useFindRackEquipmentByIdMutation,
  usePlaceRackEquipmentMutation,
} from "modules/datacenter/services/rack-equipment.service";
import { useEffect } from "react";
import Loading from "modules/shared/components/Loading";
import { useFindRackStatistcsMutation } from "modules/datacenter/services/rack.service";
import RackStatisticsCard from "./components/rack-statistics-card/RackStatisticsCard";
import RackVisualization from "./components/rack-visualization/RackVisualization";
// import { RackEquipmentsTableViewModel } from "modules/datacenter/models/rack-equipment.model";
import { useToast } from "modules/shared/components/ToastProvider";
import RackEquipmentInfoCard from "./components/rack-equipment-info-card/RackEquipmentInfoCard";

export default function RackDetailsPage() {
  const {
    state: { data: rack },
  } = useRouter();
  const [placeEquipment, { isLoading: loadingCreate }] =
    usePlaceRackEquipmentMutation();
  // const [findEquipments, { data: equipments }] =
  //   useFindRackEquipmentsByRackIdMutation();
  const [
    findRackStatistics,
    { isLoading: loadingFetch, data: rackStatistics },
  ] = useFindRackStatistcsMutation();

  const [findRackEquipment, { data: rackEquipment }] =
    useFindRackEquipmentByIdMutation();
  const { showModal } = useModal();
  const toast = useToast();

  const handleInsertEquipment = () => {
    const modal = showModal(RackEquipmentPlacementForm, {
      title: "Inserir equipamento no rack",
      onCancel: () => {
        modal.hide();
      },
      onConfirm: async (data) => {
        modal.hide();
        await placeEquipment({
          ...data,
          rackId: rack.id,
        }).unwrap();
        toast.open({ message: "Equipamento posicionado no rack" });
      },
    });
  };

  // useEffect(() => {
  //   async function fetchEquipments() {
  //     if (rack.id) {
  //       await findEquipments(rack.id).unwrap();
  //     }
  //   }
  //   fetchEquipments();
  // }, [findEquipments, rack.id]);

  useEffect(() => {
    async function fetchStatistcs() {
      if (rack.id) {
        await findRackStatistics(rack.id).unwrap();
      }
    }
    fetchStatistcs();
  }, [findRackStatistics, rack.id]);

  return (
    <HeroContainer title="Detalhes do rack">
      <Grid
        container
        columnSpacing={1}
        rowSpacing={1}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item md={4}>
          <RackStatisticsCard
            title="Total de equipamentos"
            value={rackStatistics?.totalEquipments}
          />
        </Grid>
        <Grid item md={4}>
          <RackStatisticsCard
            title="Espaço livre"
            value={rackStatistics?.totalAvailableSpace}
            unit="U"
          />
        </Grid>
        <Grid item md={4}>
          <RackStatisticsCard
            title="Espaço ocupado"
            value={rackStatistics?.totalUsedSpace}
            unit="U"
          />
        </Grid>
      </Grid>
      <Button onClick={handleInsertEquipment}>Inserir equipamento</Button>
      {/* <DataTable
        title="Equipamentos do rack"
        rows={equipments ?? []}
        columns={columns}
        options={{
          showEdit: true,
          showDelete: true,
          onEditRow: handleEditRackEquipment,
          onDeleteRow: handleDeleteRackEquipment,
        }}
      /> */}
      <Grid container columnSpacing={1} rowSpacing={1}>
        <Grid item md={6}>
          <RackVisualization
            name="Rack 1"
            slots={
              rackStatistics?.rackSlots?.map((slot) => ({
                equipmentId: slot.equipmentId,
                label: slot.description,
                position: slot.initialPosition,
                finalPosition: slot.finalPosition,
              })) ?? []
            }
            onSelectEquipment={async (slot) => {
              await findRackEquipment(slot.equipmentId).unwrap();
            }}
            // sx={{ width: "25%" }}
          />
        </Grid>
        <Grid item md={6}>
          <RackEquipmentInfoCard
            title="Detalhes do equipamento"
            equipment={rackEquipment?.baseEquipment.name ?? ""}
            model={rackEquipment?.baseEquipment.model ?? ""}
            manufactor={rackEquipment?.baseEquipment.manufactor ?? ""}
            serialNumber={rackEquipment?.baseEquipment.serialNumber ?? ""}
            rackPosition={rackEquipment?.initialPosition ?? 0}
            size={
              (rackEquipment?.finalPosition ?? 0) -
              (rackEquipment?.initialPosition ?? 0)
            }
            showActions={false}
          />
        </Grid>
      </Grid>
      <Loading open={loadingFetch} />
    </HeroContainer>
  );
}

// const columns: ColumnHeader[] = [
//   {
//     name: "name",
//     label: "Equipamento",
//   },
//   {
//     name: "model",
//     label: "Modelo",
//   },
//   {
//     name: "manufactor",
//     label: "Fabricante",
//   },
//   {
//     name: "initialPosition",
//     label: "Posição inicial",
//   },
//   {
//     name: "finalPosition",
//     label: "Posição final",
//   },
// ];
