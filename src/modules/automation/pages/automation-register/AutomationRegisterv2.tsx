import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import HeroContainer from "modules/shared/components/HeroContainer";
import Box from "@mui/material/Box";

const AutomationRegisterv2: React.FC = () => {
  return (
    <HeroContainer title="Configurações de automação">
      <Box width={"100%"}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <CardSection
              title="Equipamentos"
              description="Configure os equipamentos do DCIM"
            />
            <CardSection
              title="Salas"
              description="Configure os equipamentos do DCIM"
            />
            <CardSection
              title="Prédios"
              description="Configure os equipamentos do DCIM"
            />
          </Grid>
          <Grid item xs={6}>
            <CardSection
              title="Parâmetros"
              description="Configure os parâmetros do DCIM"
            />
            <CardSection
              title="Andares"
              description="Configure os parâmetros do DCIM"
            />
            <CardSection
              title="Sites"
              description="Configure os equipamentos do DCIM"
            />
          </Grid>
        </Grid>
      </Box>
    </HeroContainer>
  );
};

export default AutomationRegisterv2;

type CardSectionProps = {
  title: string;
  description: string;
};

const CardSection: React.FC<CardSectionProps> = ({ title, description }) => {
  return (
    <Card>
      <CardHeader title={title} subheader={description} />
      <CardContent></CardContent>
    </Card>
  );
};
