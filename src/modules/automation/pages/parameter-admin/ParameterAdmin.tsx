import { Divider } from "@mui/material";
import { automationPaths } from "modules/automation/routes/paths";
import useRouter from "modules/core/hooks/useRouter";
import { AutomationPath } from "modules/home/routes/paths";
import { HomePath } from "modules/paths";
import AccessButton from "modules/shared/components/access-button/AccessButtonv2";
import HeroContainer from "modules/shared/components/HeroContainer";
import Row from "modules/shared/components/Row";
import compositePathRoute from "modules/utils/compositePathRoute";
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
              compositePathRoute([
                HomePath,
                AutomationPath,
                automationPaths.parameterForm.fullPath,
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
          mode="regularButton"
          label="Novo parâmetro virtual"
          onClick={() =>
            navigate(
              compositePathRoute([
                HomePath,
                AutomationPath,
                automationPaths.virtualParameterForm.fullPath,
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
            automationPaths.parameterGroupManagement.fullPath,
          ])}
        />
      </Row>
      <ParameterTable />
    </HeroContainer>
  );
}
