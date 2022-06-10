import React from "react";
import Box from "@mui/material/Box";

const OneLevelIndicator: React.FC = () => {
  return (
    <Box
      sx={{
        width: "18px",
        height: "18px",
        backgroundColor: "red",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        color: "#000",
        marginRight: "4px",
        marginLeft: "2px",
      }}
    >
      1
    </Box>
  );
};

export default OneLevelIndicator;
