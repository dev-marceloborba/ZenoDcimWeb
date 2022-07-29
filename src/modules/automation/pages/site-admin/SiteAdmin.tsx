import { SiteFormPath } from "modules/automation/routes/paths";
import { AutomationPath } from "modules/home/routes/paths";
import { HomePath } from "modules/paths";
import ButtonLink from "modules/shared/components/ButtonLink";
import HeroContainer from "modules/shared/components/HeroContainer";
import compositePathRoute from "modules/utils/compositePathRoute";
import SiteTable from "./components/site-table/SiteTable";

export default function SiteAdmin() {
  return (
    <HeroContainer title="Gestão de sites">
      <ButtonLink
        to={compositePathRoute([HomePath, AutomationPath, SiteFormPath])}
      >
        Criar site
      </ButtonLink>
      <SiteTable />
    </HeroContainer>
  );
}
