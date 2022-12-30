import HeroContainer from "modules/shared/components/HeroContainer";
import Tabs from "modules/shared/components/tabs/Tabs";
import CardSection from "modules/shared/components/card-section/CardSectionv2";
import CardSectionv3 from "modules/shared/components/card-section/CardSectionv3";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useModal } from "mui-modal-provider";
import { useToast } from "modules/shared/components/ToastProvider";

export default function RackDetailsPage() {
  const { showModal } = useModal();
  const toast = useToast();

  const handleEditRack = () => {};
  const handleInsertEquipment = () => {};

  return (
    <HeroContainer title="RAck 1020">
      <Tabs
        mode="horizontal"
        tabLabels={["Detalhes", "Ocupação"]}
        tabItems={[
          {
            element: <DetailsTab />,
            content: (
              <Button variant="contained" onClick={handleEditRack}>
                Editar rack
              </Button>
            ),
          },
          {
            element: <OccupationTab />,
            content: (
              <Button variant="contained" onClick={handleInsertEquipment}>
                Inserir equipamento
              </Button>
            ),
          },
        ]}
      />
    </HeroContainer>
  );
}

const DetailsTab: React.FC = () => {
  //TODO: esta parte pode ser componentizada. Um grid contendo titulo e seus camppos
  return (
    <>
      <CardSection>
        <Typography
          variant="subtitle1"
          sx={{
            textDecoration: "underline",
            my: 1,
          }}
        >
          Local
        </Typography>
        <Grid container>
          <Grid item md={3}>
            <Typography variant="subtitle2" color="#9CA7B1">
              Site
            </Typography>
            <Typography variant="subtitle1" color="#9CA7B1">
              {"Site 01"}
            </Typography>
          </Grid>
          <Grid item md={3}>
            <Typography variant="subtitle2" color="#9CA7B1">
              Prédio
            </Typography>
            <Typography variant="subtitle1" color="#9CA7B1">
              {"Data Hall 01"}
            </Typography>
          </Grid>
          <Grid item md={3}>
            <Typography variant="subtitle2" color="#9CA7B1">
              Andar
            </Typography>
            <Typography variant="subtitle1" color="#9CA7B1">
              {"Terreo"}
            </Typography>
          </Grid>
          <Grid item md={3}>
            <Typography variant="subtitle2" color="#9CA7B1">
              Sala
            </Typography>
            <Typography variant="subtitle1" color="#9CA7B1">
              {"MDA A"}
            </Typography>
          </Grid>
        </Grid>
      </CardSection>

      <CardSection sx={{ mt: 2, mb: 1 }}>
        <Typography
          variant="subtitle1"
          sx={{
            textDecoration: "underline",
            my: 1,
          }}
        >
          Identidade
        </Typography>
        <Grid container rowSpacing={1}>
          <Grid item md={3}>
            <Typography variant="subtitle2" color="#9CA7B1">
              Rack
            </Typography>
            <Typography variant="subtitle1" color="#9CA7B1">
              {"Rack 1020"}
            </Typography>
          </Grid>
        </Grid>
      </CardSection>

      <CardSection sx={{ mt: 2, mb: 1 }}>
        <Typography
          variant="subtitle1"
          sx={{
            textDecoration: "underline",
            my: 1,
          }}
        >
          Dados do Rack
        </Typography>
        <Grid container rowSpacing={1}>
          <Grid item md={3}>
            <Typography variant="subtitle2" color="#9CA7B1">
              Potência do Rack
            </Typography>
            <Typography variant="subtitle1" color="#9CA7B1">
              {"10 kW"}
            </Typography>
          </Grid>
          <Grid item md={3}>
            <Typography variant="subtitle2" color="#9CA7B1">
              Unid. de Rack
            </Typography>
            <Typography variant="subtitle1" color="#9CA7B1">
              {`42 U`}
            </Typography>
          </Grid>
          <Grid item md={3}>
            <Typography variant="subtitle2" color="#9CA7B1">
              Peso suportável
            </Typography>
            <Typography variant="subtitle1" color="#9CA7B1">
              {`1500 kg`}
            </Typography>
          </Grid>
          <Grid item md={3}>
            <Typography variant="subtitle2" color="#9CA7B1">
              Tamanho (a x c x p)
            </Typography>
            <Typography variant="subtitle1" color="#9CA7B1">
              {`230 x 60 x 60 cm`}
            </Typography>
          </Grid>
          <Grid item md={6}>
            <Typography variant="subtitle2" color="#9CA7B1">
              Descrição
            </Typography>
            <Typography variant="subtitle1" color="#9CA7B1">
              {"Cliente ABC"}
            </Typography>
          </Grid>
        </Grid>
      </CardSection>
    </>
  );
};

const OccupationTab: React.FC = () => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography>HP Proliant</Typography>
      <CardSectionv3
        title="Local"
        items={[
          {
            title: "Rack",
            description: "Rack 1020",
          },
          {
            title: "Posição",
            description: "12 U",
          },
        ]}
      />
      <CardSectionv3
        title="Dados do equipamento"
        items={[
          {
            title: "Marca",
            description: "HP",
          },
          {
            title: "Modelo",
            description: "Proliant 350XP",
          },
          {
            title: "Montagem",
            description: "Rack 19''",
          },
          {
            title: "Tamanho",
            description: "200 x 600 x 600 mm",
          },
          {
            title: "Peso",
            description: "25 kg",
          },
          {
            title: "RU's",
            description: "5 RU's",
          },
          {
            title: "Potência",
            description: "1000 W",
          },
          {
            title: "Orientação",
            description: "Frontside",
          },
          {
            title: "Status",
            description: "Instalado",
          },
        ]}
      />
      <CardSectionv3
        title="Identidade"
        items={[
          {
            title: "Número de série",
            description: "87858987858458",
          },
          {
            title: "Cliente",
            description: "Banco ABC",
          },
          {
            title: "Nome equipamento",
            description: "HP Proliant",
          },
          {
            title: "Tipo",
            description: "Demo item",
          },
          {
            title: "Função",
            description: "Desenvolvimento",
          },
        ]}
      />
    </Stack>
  );
};
