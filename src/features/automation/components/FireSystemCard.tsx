import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import BmsIndicator from "app/components/BmsIndicator";
import { ESystemStatus, FireSystemCategory } from "app/data/fire-system";
import { EEquipmentStatus } from "app/types/bms";

type FireSystemCardProps = FireSystemCategory;

const FireSystemCard: React.FC<FireSystemCardProps> = ({ ...props }) => {
  const { name, status, data } = props;

  return (
    <Card sx={{ p: 4, m: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">{name}</Typography>
        <Typography
          sx={{ color: status === ESystemStatus.OK ? "green" : "red" }}
        >
          {status === ESystemStatus.OK ? "Online" : "Offline"}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {data.map((information, index) => (
          //   <BmsIndicator key={index} {...information} status={status} />
          <BmsIndicator
            key={index}
            description={information.description}
            value={information.value}
            unit={information.unit}
            parameterStatus={information.parameterStatus}
            status={
              status === ESystemStatus.OK
                ? EEquipmentStatus.ONLINE
                : EEquipmentStatus.OFFLINE
            }
          />
        ))}
      </Box>
    </Card>
  );
};

export default FireSystemCard;
