import React from "react";
import HeroContainer from "app/components/HeroContainer";
import PageTitle from "app/components/PageTitle";
import Row from "app/components/Row";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
import Column from "app/components/Column";
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

const UserSettings: React.FC = () => {
  return (
    <HeroContainer>
      <PageTitle>Configurações do usuário</PageTitle>
      <Card sx={{
          padding: '8px 24px'
      }}>
        {/* <Grid container> */}
            {/* <Grid item md={6}> */}
                <Row sx={{justifyContent: 'space-between'}}>
                    <Typography>Modo escuro</Typography>
                    <Switch  />
                
                </Row>
            {/* </Grid> */}
            {/* <Grid item md={6}> */}
            {/* </Grid> */}
        {/* </Grid> */}
      </Card>
    </HeroContainer>
  );
};

export default UserSettings;
