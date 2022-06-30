import HeroContainer from "modules/shared/components/HeroContainer";
import ParameterImport from "./components/parameter-import/ParameterImport";
import ParameterTable from "./components/parameter-table/ParameterTable";

export default function ParameterAdmin() {
  return (
    <HeroContainer title="Gestão de parâmetros">
      <ParameterTable />
      <ParameterImport />
    </HeroContainer>
  );
}
