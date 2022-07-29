import { BuildingFormPath } from "modules/automation/routes/paths";
import { AutomationPath } from "modules/home/routes/paths";
import { HomePath } from "modules/paths";
import ButtonLink from "modules/shared/components/ButtonLink";
import HeroContainer from "modules/shared/components/HeroContainer";
import Row from "modules/shared/components/Row";
import compositePathRoute from "modules/utils/compositePathRoute";
import BuildingTable from "./components/building-table/BuildingTable";

export default function BuildingAdmin() {
  return (
    <HeroContainer title="Gestão de prédios">
      <Row>
        <ButtonLink
          to={compositePathRoute([HomePath, AutomationPath, BuildingFormPath])}
        >
          Criar novo prédio
        </ButtonLink>
      </Row>
      <BuildingTable />
    </HeroContainer>
  );
}
