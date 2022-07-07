import { Divider } from "@mui/material";
import {
  ParameterFormPath,
  ParameterGroupManagementPath,
} from "modules/automation/routes/paths";
import { AutomationPath } from "modules/home/routes/paths";
import { HomePath } from "modules/paths";
import AccessButton from "modules/shared/components/access-button/AccessButtonv2";
import HeroContainer from "modules/shared/components/HeroContainer";
import Row from "modules/shared/components/Row";
import compositePathRoute from "modules/utils/compositePathRoute";
import ParameterImport from "./components/parameter-import/ParameterImport";
import ParameterTable from "./components/parameter-table/ParameterTable";

export default function ParameterAdmin() {
  return (
    <HeroContainer title="Gestão de parâmetros">
      <Divider sx={{ mt: 2 }} />
      <Row sx={{ mt: 2 }}>
        <AccessButton
          mode="link"
          label="Novo parâmetro"
          to={compositePathRoute([HomePath, AutomationPath, ParameterFormPath])}
        />
        <AccessButton
          mode="link"
          label="Grupo de parâmetros"
          to={compositePathRoute([
            HomePath,
            AutomationPath,
            ParameterGroupManagementPath,
          ])}
        />
      </Row>
      <ParameterTable />
      <ParameterImport />
    </HeroContainer>
  );
}
