import React from "react";
import Box, { BoxProps } from "@mui/material/Box";

const Center: React.FC<BoxProps> = ({ children, ...props }) => {
  const { sx, ...rest } = props;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Center;
