import { Divider } from "@mui/material";
import {
  ParameterFormPath,
  ParameterGroupManagementPath,
  VirtualParameterFormPath,
} from "modules/automation/routes/paths";
import useRouter from "modules/core/hooks/useRouter";
import { AutomationPath } from "modules/home/routes/paths";
import { HomePath } from "modules/paths";
import AccessButton from "modules/shared/components/access-button/AccessButtonv2";
import HeroContainer from "modules/shared/components/HeroContainer";
import Row from "modules/shared/components/Row";
import compositePathRoute from "modules/utils/compositePathRoute";
import ParameterImport from "./components/parameter-import/ParameterImport";
import ParameterTable from "./components/parameter-table/ParameterTable";

export default function ParameterAdmin() {
  const { navigate } = useRouter();
  return (
    <HeroContainer title="Gestão de parâmetros">
      <Divider sx={{ mt: 2 }} />
      <Row sx={{ mt: 2 }}>
        <AccessButton
          mode="regularButton"
          label="Novo parâmetro físico"
          onClick={() =>
            navigate(
              compositePathRoute([HomePath, AutomationPath, ParameterFormPath]),
              {
                state: {
                  data: null,
                  mode: "new",
                },
              }
            )
          }
        />
        <AccessButton
          mode="regularButton"
          label="Novo parâmetro virtual"
          onClick={() =>
            navigate(
              compositePathRoute([
                HomePath,
                AutomationPath,
                VirtualParameterFormPath,
              ]),
              {
                state: {
                  data: null,
                  mode: "new",
                },
              }
            )
          }
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
