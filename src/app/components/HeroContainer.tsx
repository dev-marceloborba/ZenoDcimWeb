import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";

const HeroContainer: React.FC = ({ children }) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Toolbar />
      <Container
        maxWidth="xl"
        sx={{
          mt: 4,
          mb: 4,
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default HeroContainer;
