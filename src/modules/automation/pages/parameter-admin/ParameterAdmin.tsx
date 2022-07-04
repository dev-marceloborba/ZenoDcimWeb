import { Divider } from "@mui/material";
import AccessButton from "modules/shared/components/AccessButton";
import HeroContainer from "modules/shared/components/HeroContainer";
import Row from "modules/shared/components/Row";
import ParameterImport from "./components/parameter-import/ParameterImport";
import ParameterTable from "./components/parameter-table/ParameterTable";

export default function ParameterAdmin() {
  return (
    <HeroContainer title="Gestão de parâmetros">
      <Divider sx={{ mt: 2 }} />
      <Row sx={{ mt: 2 }}>
        <AccessButton label="Novo Parâmetro" to="/" />
      </Row>
      <ParameterTable />
      <ParameterImport />
    </HeroContainer>
  );
}
