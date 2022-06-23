import HeroContainer from "modules/shared/components/HeroContainer";
import SiteTable from "./components/site-table/SiteTable";

export default function SiteAdmin() {
  return (
    <HeroContainer title="Gestão de sites">
      <SiteTable />
    </HeroContainer>
  );
}
