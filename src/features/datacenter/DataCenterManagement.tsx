import React from "react";
import Box from "@mui/material/Box";
import HeroContainer from "app/components/HeroContainer";
import PageTitle from "app/components/PageTitle";
import Typography from "@mui/material/Typography";

const DataCenterManagement: React.FC = () => {
  const ref1 = React.useRef<HTMLDivElement>(null);
  return (
    <HeroContainer>
      <PageTitle>Gerenciamento do Data Center</PageTitle>

      <Box
        sx={{ height: 1000, backgroundColor: "yellow" }}
        onClick={() => {
          ref1.current?.scrollIntoView({
            behavior: "smooth",
            // block: "start",
            // inline: "nearest",
          });
        }}
      >
        <Typography>Section 1</Typography>
      </Box>

      <Box sx={{ height: 1000, backgroundColor: "red" }} ref={ref1}>
        <Typography>Section 2</Typography>
      </Box>
    </HeroContainer>
  );
};

export default DataCenterManagement;
