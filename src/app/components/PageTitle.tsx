import React from "react";
import Typrography, { TypographyProps } from "@mui/material/Typography";

const PageTitle: React.FC<TypographyProps> = ({ children, ...props }) => {
  return (
    <Typrography variant="h4" {...props}>
      {children}
    </Typrography>
  );
};

export default PageTitle;
