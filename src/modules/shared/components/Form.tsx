import React from "react";
import Box, { BoxProps } from "@mui/material/Box";

const Form: React.FC<BoxProps<"form">> = ({ children, ...props }) => {
  return (
    <Box component="form" noValidate autoComplete="off" {...props}>
      {children}
    </Box>
  );
};

export default Form;

export type FormMode = "new" | "edit";
