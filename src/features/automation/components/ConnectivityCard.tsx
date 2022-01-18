import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { ConnectivityData } from "app/data/equipment-connectivity";
import AutomationDataIndicator from "app/components/AutomationDataIndicator";

type ConnectivityCardProps = ConnectivityData;

const ConnectivityCard: React.FC<ConnectivityCardProps> = ({ data, group }) => {
  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h4">{group}</Typography>
      <Box>
        {data.map((info, index) => (
          <AutomationDataIndicator key={index} {...info} />
        ))}
      </Box>
    </Card>
  );
};

export default ConnectivityCard;
