import React from "react";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const Copyright: React.FC = () => {
  return (
    <CopyrightStyled color="primary">
      © 2019-{new Date().getFullYear()}{" "}
      <a
        style={{ textDecoration: "none", color: "inherit" }}
        href="https://www.google.com"
        rel="noopener noreferrer"
        target="_blank"
      >
        Mindcloud
      </a>{" "}
      - Todos os direitos reservados.
    </CopyrightStyled>
  );
};

export default Copyright;

const CopyrightStyled = styled(Typography)<TypographyProps>(({ theme }) => ({
  marginTop: theme.spacing(4),
  whiteSpace: "nowrap",
  fontSize: 14,
  [theme.breakpoints.up("md")]: {
    position: "absolute",
    bottom: theme.spacing(2),
    fontSize: 16,
  },
}));
