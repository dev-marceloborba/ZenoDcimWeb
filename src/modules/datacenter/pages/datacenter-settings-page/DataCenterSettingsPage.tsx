import HeroContainer from "modules/shared/components/HeroContainer";
import Grid from "@mui/material/Grid";
import CardSection, {
  CardSectionProps,
} from "modules/shared/components/card-section/CardSection";
import { datacenterPaths } from "modules/datacenter/routes/paths";
import { useAuth } from "app/hooks/useAuth";
import { RegisterPermissions } from "modules/user/models/group.model";

const cardItems: CardSectionProps[] = [
  {
    title: "Infraestrutura",
    description: "Cadastro de sites, prédios, andares e salas",
    path: datacenterPaths.infraSettings.shortPath,
    validatePermission: ({ datacenter }: RegisterPermissions) => {
      return datacenter === true;
    },
  },
  {
    title: "Racks e ocupação",
    description:
      "Cadastre novos Racks, defina sua potência máxima, peso limite, entre outras características",
    path: datacenterPaths.racks.shortPath,
  },
];

export default function DataCenterSettingsPage() {
  const {
    userState: { permissions },
  } = useAuth();
  return (
    <HeroContainer title="Configurações do datacenter">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {cardItems.map((item) => {
          const isAllowed = item.validatePermission
            ? item.validatePermission(permissions?.registers)
            : true;
          return isAllowed ? (
            <Grid item key={item.description} md={6} xs={12}>
              <CardSection {...item} />
            </Grid>
          ) : null;
        })}
      </Grid>
    </HeroContainer>
  );
}
