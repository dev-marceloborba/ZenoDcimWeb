import HeroContainer from "modules/shared/components/HeroContainer";
import Grid from "@mui/material/Grid";
import CardSection, {
  CardSectionProps,
} from "modules/shared/components/card-section/CardSection";
import { datacenterPaths } from "modules/datacenter/routes/paths";

const cardItems: CardSectionProps[] = [
  {
    title: "Infraestrutura",
    description: "Cadastro de sites, prédios, andares e salas",
    path: datacenterPaths.infraSettings.shortPath,
  },
  {
    title: "Racks e ocupação",
    description:
      "Cadastre novos Racks, defina sua potência máxima, peso limite, entre outras características",
    path: datacenterPaths.racks.shortPath,
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
