import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

export type AlarmStatus = "highSeverity" | "mediumSeverity" | "lowSeverity";

export type AlarmIndicatorProps = {
  description?: string;
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
        width: "24px",
        alignItems: "center",
        margin: 0,
        textDecoration: "none",
        color: theme.palette.text.primary,
      })}
      {...(props.clickable && {
        component: RouterLink,
        to: routeDestinationPath,
      })}
    >
      {status === "mediumSeverity" ? <TwoLevelIndicator /> : null}
      {status === "highSeverity" ? <OneLevelIndicator /> : null}
      {status === "lowSeverity" ? <ThreeLevelIndicator /> : null}
      {description ? (
        <Typography sx={{ ml: 1 }}>
          {value ? `${description}: ${value} ${unit}` : description}
        </Typography>
      ) : null}
    </Box>
  );
};

export default AlarmIndicator;

const OneLevelIndicator: React.FC = () => {
  return (
    <div
      style={{
        display: "inline-block",
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderWidth: "10px 10px 10px 10px",
        borderColor: "red",
        fontSize: 12,
        color: "#000",
        position: "relative",
        marginLeft: "2px",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: -3,
          top: -10,
        }}
      >
        1
      </div>
    </div>
  );
};

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
