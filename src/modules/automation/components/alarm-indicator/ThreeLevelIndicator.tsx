import React from "react";
import Box from "@mui/material/Box";

const ThreeLevelIndicator: React.FC = () => {
  return (
    <Box
      sx={{
        display: "inline-block",
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderWidth: "20px 12px 0 12px",
        borderColor: "orange transparent transparent transparent",
        fontSize: 12,
        color: "#000",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: -4,
          top: -21,
        }}
      >
        3
      </div>
    </Box>
  );
};
export default ThreeLevelIndicator;
