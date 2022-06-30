import React from "react";
import Grid from "@mui/material/Grid";
import InDevelopMessage from "modules/shared/components/InDevelopMessage";
import LineChart from "modules/dashboards/components/line-chart/Linechart";
import HeroContainer from "modules/shared/components/HeroContainer";
import BarChart from "modules/dashboards/components/bar-chart/Barchart";
import CardWrapper from "modules/dashboards/components/card-wrapper/CardWrapper";

const Energy: React.FC = () => {
  return (
    <HeroContainer title="Dashboard de energia">
      <InDevelopMessage />
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{
          xl: 3,
          md: 2,
          xs: 1,
        }}
      >
        <Grid item xs={12} md={6}>
          <CardWrapper>
            <LineChart x={[1, 2, 3]} y={[1, 2, 3]} />
          </CardWrapper>
        </Grid>

        <Grid item xs={12} md={6}>
          <CardWrapper>
            <LineChart x={[1, 2, 3]} y={[1, 2, 3]} />
          </CardWrapper>
        </Grid>

        <Grid item xs={12} md={6}>
          <CardWrapper>
            <BarChart x={[1, 2, 3]} y={[1, 2, 3]} />
          </CardWrapper>
        </Grid>
      </Grid>
    </HeroContainer>
  );
};

export default Energy;
