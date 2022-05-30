import React from "react";
import MuiCard, { CardProps as MuiCardProps } from "@mui/material/Card";

type CardProps = MuiCardProps;

const Card: React.FC<CardProps> = ({ children, ...props }) => {
  return (
    <MuiCard sx={{ mt: 2, padding: "16px 24px" }} {...props}>
      {children}
    </MuiCard>
  );
};

export default Card;
