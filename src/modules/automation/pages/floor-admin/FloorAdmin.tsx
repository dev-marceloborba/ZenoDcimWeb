import HeroContainer from "modules/shared/components/HeroContainer";
import FloorTable from "./components/floor-table/FloorTable";

export default function FloorAdmin() {
  return (
    <HeroContainer title="Gestão de andares">
      <FloorTable />
    </HeroContainer>
  );
}
