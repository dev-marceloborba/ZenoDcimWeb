import { datacenterPaths } from "modules/datacenter/routes/paths";
import ButtonLink from "modules/shared/components/ButtonLink";
import HeroContainer from "modules/shared/components/HeroContainer";
import SiteTable from "./components/site-table/SiteTable";

export default function SiteAdmin() {
  return (
    <HeroContainer title="Gestão de sites">
      <ButtonLink to={datacenterPaths.siteForm.shortPath}>
        Criar site
      </ButtonLink>
      <SiteTable />
    </HeroContainer>
  );
}
