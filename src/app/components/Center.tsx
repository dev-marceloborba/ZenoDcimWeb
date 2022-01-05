import React from "react";
import Box from "@mui/material/Box";

const Center: React.FC = ({ children }) => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      {children}
    </Box>
  );
};

export default Center;
