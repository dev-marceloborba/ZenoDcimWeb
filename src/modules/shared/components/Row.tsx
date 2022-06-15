import React from "react";
import Box, { BoxProps } from "@mui/material/Box";

const Row: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box
      sx={{
        ...props.sx,
        display: "flex",
        flexDirection: "row",
      }}
      component="div"
    >
      {children}
    </Box>
  );
};

export default Row;
