import React from "react";
import Box, { BoxProps } from "@mui/material/Box";

const Column: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box
      sx={{
        ...props.sx,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </Box>
  );
};

export default Column;
