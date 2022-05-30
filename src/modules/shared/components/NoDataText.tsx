import React from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const NoDataText: React.FC = () => {
  return (
    <Box sx={{ width: "100%", textAlign: "center", padding: 3 }}>
      <Typography>Nenhum resultado encontrado</Typography>
    </Box>
  );
};

export default NoDataText;
