import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { EStatus } from "app/data/equipment-connectivity";

export type AutomationDataIndicatorProps = {
  description: string;
  value?: number;
  unit?: string;
  status: EStatus;
};

type CircleIndicatorProps = {
  status: EStatus;
};

const CircleIndicator: React.FC<CircleIndicatorProps> = ({
  status,
  children,
}) => {
  const getColor = () => {
    switch (status) {
      case EStatus.NORMAL:
        return "green";
      case EStatus.ALERT:
        return "yellow";
      case EStatus.DANGER:
        return "red";
    }
  };

  return (
    <Box
      component="div"
      sx={{
        width: "16px",
        height: "16px",
        borderRadius: "100%",
        backgroundColor: getColor(),
      }}
    >
      {children}
    </Box>
  );
};

const AutomationDataIndicator: React.FC<AutomationDataIndicatorProps> = ({
  ...props
}) => {
  const { description, value, unit, status } = props;
  return (
    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
      <CircleIndicator status={status} />
      {value ? (
        <Typography sx={{ ml: 1 }}>
          {description}: {value} {unit}
        </Typography>
      ) : (
        <Typography sx={{ ml: 1 }}>{description}</Typography>
      )}
    </Box>
  );
};

export default AutomationDataIndicator;
