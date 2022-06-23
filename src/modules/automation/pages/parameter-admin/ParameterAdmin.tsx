import HeroContainer from "modules/shared/components/HeroContainer";
import ParameterTable from "./components/parameter-table/ParameterTable";

export default function ParameterAdmin() {
  return (
    <HeroContainer title="Gestão de parâmetros">
      <ParameterTable />
    </HeroContainer>
  );
}
