import HeroContainer from "modules/shared/components/HeroContainer";
import Grid from "@mui/material/Grid";
import CardSection, {
  CardSectionProps,
} from "modules/shared/components/card-section/CardSection";
import { datacenterPaths } from "modules/datacenter/routes/paths";

const cardItems: CardSectionProps[] = [
  {
    title: "Racks",
    description:
      "Configure os racks, quais equipamentos estão instalados em cada rack, bem como sua ocupação, potência elétrica e peso",
    path: datacenterPaths.racks.shortPath,
  },
  {
    title: "Equipamentos de Rack",
    description:
      "Registre e configure as informações dos equipamentos que são instalados dentro dos racks, servidores, patch panels, DI's e switches",
    path: datacenterPaths.rackEquipments.shortPath,
  },
];

export default function DataCenterSettingsPage() {
  return (
    <HeroContainer title="Configurações do datacenter">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {cardItems.map((item) => (
          <Grid item key={item.description} md={6} xs={12}>
            <CardSection {...item} />
          </Grid>
        ))}
      </Grid>
    </HeroContainer>
  );
}
