import React from "react";
import Grid from "@mui/material/Grid";
import HeroContainer from "modules/shared/components/HeroContainer";

const EtcFloor: React.FC = () => {
  return (
    <HeroContainer title="Energia, clima e telecom">
      <Grid container spacing={1} sx={{ mt: 2 }}></Grid>
      {/* <Loading open={isLoading} /> */}
    </HeroContainer>
  );
};

export default EtcFloor;
