import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        p: 3,
        width: "100%",
      }}
    >
      <Typography sx={{ textAlign: "center" }}>
        {`© 2019-${new Date().getFullYear()} Mindcloud - Todos os direitos reservados.`}
      </Typography>
    </Box>
  );
};

export default Footer;
