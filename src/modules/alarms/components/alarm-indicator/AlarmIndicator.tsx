import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

export type AlarmStatus =
  | "online"
  | "offline"
  | "normal"
  | "alert"
  | "danger"
  | "critical";

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
      {status === "normal" ? <OkLevelIndicator /> : null}
      {status === "alert" ? <TwoLevelIndicator /> : null}
      {status === "danger" ? <OneLevelIndicator /> : null}
      {status === "critical" ? <ThreeLevelIndicator /> : null}
      {description ? (
        <Typography sx={{ ml: 1 }}>
          {value ? `${description}: ${value} ${unit}` : description}
        </Typography>
      ) : null}
    </Box>
  );
};

export default AlarmIndicator;

const OkLevelIndicator: React.FC = () => (
  <Box
    sx={{
      width: "16px",
      height: "16px",
      borderRadius: "100%",
      backgroundColor: "green",
      marginLeft: "3px",
      marginRight: "4px",
    }}
  />
);

const OneLevelIndicator: React.FC = () => {
  return (
    <Box
      sx={{
        width: "18px",
        height: "18px",
        backgroundColor: "red",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        color: "#000",
        marginRight: "4px",
        marginLeft: "2px",
      }}
    >
      1
    </Box>
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
