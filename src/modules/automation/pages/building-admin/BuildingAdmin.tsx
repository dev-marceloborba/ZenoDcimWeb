import HeroContainer from "modules/shared/components/HeroContainer";
import BuildingTable from "./components/building-table/BuildingTable";

export default function BuildingAdmin() {
  return (
    <HeroContainer title="Gestão de prédios">
      <BuildingTable />
    </HeroContainer>
  );
}
