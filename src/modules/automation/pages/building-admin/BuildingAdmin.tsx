import { datacenterPaths } from "modules/datacenter/routes/paths";
import ButtonLink from "modules/shared/components/ButtonLink";
import HeroContainer from "modules/shared/components/HeroContainer";
import Row from "modules/shared/components/Row";
import BuildingTable from "./components/building-table/BuildingTable";

export default function BuildingAdmin() {
  return (
    <HeroContainer title="Gestão de prédios">
      <Row>
        <ButtonLink to={datacenterPaths.buildingForm.shortPath}>
          Criar novo prédio
        </ButtonLink>
      </Row>
      <BuildingTable />
    </HeroContainer>
  );
}
