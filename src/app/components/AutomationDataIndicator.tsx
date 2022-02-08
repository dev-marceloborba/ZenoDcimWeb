import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { EStatus } from "app/data/equipment-connectivity";
import { Link as RouterLink } from "react-router-dom";

export type AutomationDataIndicatorProps = {
  description: string;
  value?: number;
  unit?: string;
  status: EStatus;
  clickable?: boolean;
};

// type CircleIndicatorProps = {
//   status: EStatus;
// };

// const CircleIndicator: React.FC<CircleIndicatorProps> = ({
//   status,
//   children,
// }) => {
//   const getColor = () => {
//     switch (status) {
//       case EStatus.NORMAL:
//         return "green";
//       case EStatus.ALERT:
//         return "yellow";
//       case EStatus.DANGER:
//         return "red";
//     }
//   };

//   return (
//     <Box
//       component="div"
//       sx={{
//         width: "16px",
//         height: "16px",
//         borderRadius: "100%",
//         backgroundColor: getColor(),
//       }}
//     >
//       {children}
//     </Box>
//   );
// };

const AutomationDataIndicator: React.FC<AutomationDataIndicatorProps> = ({
  ...props
}) => {
  const { description, value, unit, status } = props;
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
        to: "/zeno/automation/equipment-conectivity/rack",
      })}
    >
      {/* <CircleIndicator status={status} /> */}
      {status === EStatus.NORMAL && <OkLevelIndicator />}
      {status === EStatus.ALERT && <TwoLevelIndicator />}
      {status === EStatus.DANGER && <OneLevelIndicator />}
      {status === EStatus.CRITICAL && <ThreeLevelIndicator />}
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

function OkLevelIndicator() {
  return (
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
}

function OneLevelIndicator() {
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
}

function TwoLevelIndicator() {
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
}

function ThreeLevelIndicator() {
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
}

export default AutomationDataIndicator;
