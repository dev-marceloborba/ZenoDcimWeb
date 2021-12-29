import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  BmsInformation,
  EEquipmentStatus,
  EParameterStatus,
} from "app/types/bms";

type BmsIndicatorProps = BmsInformation & {
  status: EEquipmentStatus;
};
type CircleIndicatorProps = Partial<BmsInformation> & {
  status: EEquipmentStatus;
};

const CircleIndicator: React.FC<CircleIndicatorProps> = ({
  children,
  parameterStatus,
  status,
}) => {
  const getColor = () => {
    if (status === EEquipmentStatus.ONLINE) {
      switch (parameterStatus) {
        case EParameterStatus.NORMAL:
          return "green";
        case EParameterStatus.ALERT:
          return "yellow";
        case EParameterStatus.DANGER:
          return "red";
      }
    } else {
      return "#ccc";
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

const BmsIndicator: React.FC<BmsIndicatorProps> = ({ ...props }) => {
  const { description, value, unit } = props;
  return (
    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
      <CircleIndicator {...props} />
      <Typography sx={{ ml: 1 }}>
        {description}: {value} {unit}
      </Typography>
    </Box>
  );
};

export default BmsIndicator;
