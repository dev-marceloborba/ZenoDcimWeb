import React from "react";
import Box from "@mui/material/Box";
import Container, { ContainerProps } from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Breadcrumbs from "./breadcrumbs/Breadcrumbs";
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
      <Container maxWidth={maxWidth}>
        <Box sx={{ marginBottom: "2rem" }}>
          <Breadcrumbs />
          {/* <Separator /> */}
          <Title variant="h5">{title}</Title>
          {/* <Separator /> */}
          {children}
        </Box>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  flex-grow: 1;
  height: 100vh;
  overflow: auto;
  padding: 1rem 0;
`;

const Separator = styled(Divider)`
  margin-top: 1rem;
`;

const Title = styled(Typography)`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export default HeroContainer;
