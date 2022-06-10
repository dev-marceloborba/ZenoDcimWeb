import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import OkLevelIndicator from "./OkLevelIndicator";
import TwoLevelIndicator from "./TwoLevelIndicator";
import OneLevelIndicator from "./OneLevelIndicator";
import ThreeLevelIndicator from "./ThreeLevelIndicator";

export type AlarmStatus =
  | "online"
  | "offline"
  | "normal"
  | "alert"
  | "danger"
  | "critical";

export type AlarmIndicatorProps = {
  description: string;
  value?: number;
  unit?: string;
  status: AlarmStatus;
  clickable?: boolean;
  routeDestinationPath?: string;
};

const AlarmIndicator: React.FC<AlarmIndicatorProps> = ({ ...props }) => {
  const { description, value, unit, status, routeDestinationPath } = props;
  return (
    <Box
      sx={(theme) => ({
        ...(props.clickable && { cursor: "pointer" }),
        display: "flex",
        alignItems: "center",
        mt: 1,
        textDecoration: "none",
        color: theme.palette.text.primary,
      })}
      {...(props.clickable && {
        component: RouterLink,
        to: routeDestinationPath,
      })}
    >
      {status === "normal" && <OkLevelIndicator />}
      {status === "alert" && <TwoLevelIndicator />}
      {status === "danger" && <OneLevelIndicator />}
      {status === "critical" && <ThreeLevelIndicator />}
      <Typography sx={{ ml: 1 }}>
        {value ? `${description}: ${value} ${unit}` : description}
      </Typography>
    </Box>
  );
};

export default AlarmIndicator;
