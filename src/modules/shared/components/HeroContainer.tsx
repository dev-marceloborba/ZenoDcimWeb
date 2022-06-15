import React from "react";
import Box from "@mui/material/Box";
import Container, { ContainerProps } from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Breadcrumbs from "./Breadcrumbs";
import { styled } from "@mui/material/styles";

type HeroContainerProps = {
  title?: string;
} & Pick<ContainerProps, "maxWidth">;

const HeroContainer: React.FC<HeroContainerProps> = ({
  children,
  title,
  maxWidth = "xl",
}) => {
  return (
    <Wrapper component="main">
      <Toolbar />
      <Container
        maxWidth={maxWidth}
        sx={{
          mt: 4,
          mb: 8,
        }}
      >
        <Breadcrumbs />
        <Typography variant="h4">{title}</Typography>
        {children}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  flex-grow: 1;
  height: 100vh;
  overflow: auto;
`;

export default HeroContainer;
