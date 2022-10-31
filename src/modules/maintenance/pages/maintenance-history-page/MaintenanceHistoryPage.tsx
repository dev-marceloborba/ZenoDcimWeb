import { useFindAllWorkOrdersQuery } from "modules/maintenance/services/maintenance.service";
import DataTable, {
  ColumnHeader,
} from "modules/shared/components/datatable/DataTable";
import HeroContainer from "modules/shared/components/HeroContainer";
import Loading from "modules/shared/components/Loading";

export default function MaintenanceHistoryPage() {
  const { data: maintenances, isLoading } = useFindAllWorkOrdersQuery();
  return (
    <HeroContainer title="Histórico de manutenção">
      <DataTable title="" columns={columns} rows={maintenances ?? []} />
      <Loading open={isLoading} />
    </HeroContainer>
  );
}

const columns: ColumnHeader[] = [
  {
    name: "site",
    label: "Site",
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
    name: "equipment",
    label: "Equipamento",
  },
  {
    name: "initialDate",
    label: "Data inicial",
  },
  {
    name: "finalDate",
    label: "Data final",
  },
  {
    name: "maintenanceType",
    label: "Tipo de manutenção",
  },
  {
    name: "status",
    label: "Status",
  },
];
