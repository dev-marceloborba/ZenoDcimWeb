import Grid from "@mui/material/Grid";
import { maintenancePaths } from "modules/maintenance/routes/paths";
import CardSection, {
  CardSectionProps,
} from "modules/shared/components/card-section/CardSection";
import HeroContainer from "modules/shared/components/HeroContainer";

const cardItems: CardSectionProps[] = [
  {
    title: "Iniciar ordem de serviço",
    description: "Inicie o processo para registrar ordem de serviço",
    path: maintenancePaths.initWorkOrder.shortPath,
  },
  {
    title: "Planos de manutenção",
    description: "Crie, edite ou remova planos de manutenção",
    path: maintenancePaths.maintenancePlans.shortPath,
  },
  {
    title: "Consultar ordem de serviço",
    description: "Consulte informações sobre uma ordem de serviço",
    path: maintenancePaths.queryWorkOrders.shortPath,
  },
];

export default function WorkOrderMenuPage() {
  return (
    <HeroContainer>
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
