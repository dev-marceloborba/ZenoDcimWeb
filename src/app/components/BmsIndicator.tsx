import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BmsInformation, EParameterStatus } from "app/types/bms";

type BmsIndicatorProps = BmsInformation;
type CircleIndicatorProps = Partial<BmsInformation>;

const CircleIndicator: React.FC<CircleIndicatorProps> = ({
  children,
  parameterStatus,
}) => {
  const getColor = () => {
    switch (parameterStatus) {
      case EParameterStatus.NORMAL:
        return "rgb(0,255,0)";
      case EParameterStatus.ALERT:
        return "rgb(0,0,255)";
      case EParameterStatus.DANGER:
        return "rgb(255,0,0)";
    }
  };

  return (
    <Box
      component="div"
      sx={{
        width: "16px",
        height: "16px",
        borderWidth: "100%",
        backgroundColor: getColor(),
      }}
    >
      {children}
    </Box>
  );
};

const BmsIndicator: React.FC<BmsIndicatorProps> = ({ ...props }) => {
  return (
    <Box sx={{display: 'flex', alignItems: 'center'}}>
        <CircleIndicator {...props} />
        <Typography>{ props.description } </Typography>
        <Typography>{ props.unit } </Typography>
    </Box>
    );
};

export default BmsIndicator;
