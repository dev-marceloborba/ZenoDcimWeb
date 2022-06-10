import React from "react";
import Box from "@mui/material/Box";

const TwoLevelIndicator: React.FC = () => {
  return (
    <Box
      sx={{
        display: "inline-block",
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderWidth: "0 12px 20px 12px",
        borderColor: "transparent transparent yellow transparent",
        fontSize: 12,
        color: "#000",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: -4,
          top: 2,
        }}
      >
        2
      </div>
    </Box>
  );
};

export default TwoLevelIndicator;
