import Card, { CardProps } from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import SettingsButton from "modules/shared/components/settings-button/SettingsButton";
import NotificationBadge from "modules/shared/components/notification-badge/NotificationBadge";
import Circle from "modules/shared/components/circle/Circle";

type ItemStatus = "normal" | "lowLow" | "low" | "high" | "highHigh" | "no-rule";
type System = "energy" | "climate" | "telecom";

type Parameter = {
  description: string;
  value: number;
  status: ItemStatus;
  unit?: string;
};

type EquipmentCardProps = {
  title: string;
  system: System;
  status: Status;
  parameter1: Parameter;
  parameter2: Parameter;
  parameter3: Parameter;
  activeAlarms: {
    value: number;
    status: ItemStatus;
  };
  hideSettings?: boolean;
  onSettingsClick(): void;
  onTitleClick(): void;
} & CardProps;

const EquipmentCard: React.FC<EquipmentCardProps> = ({
  title,
  system,
  status,
  parameter1,
  parameter2,
  parameter3,
  activeAlarms,
  hideSettings = true,
  onSettingsClick,
  onTitleClick,
  ...props
}) => {
  const getChipColor = (system: System) => {
    switch (system) {
      case "energy":
        return "#FF9900";
      case "climate":
        return "#0062BD";
      case "telecom":
        return "#FF00D6";
    }
  };

  const getChipDescription = (system: System) => {
    switch (system) {
      case "energy":
        return "energia";
      case "climate":
        return "clima";
      case "telecom":
        return "telecom";
    }
  };

  return (
    <Card {...props}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Typography
            variant="h4"
            onClick={onTitleClick}
            sx={{ cursor: "pointer" }}
          >
            {title}
          </Typography>
          {hideSettings ? null : <SettingsButton onClick={onSettingsClick} />}
        </Stack>
        <Stack direction="row" marginTop={1} alignItems="center">
          <Chip
            label={getChipDescription(system)}
            sx={{ backgroundColor: getChipColor(system), minWidth: "72px" }}
          />
          <OnlineOfflineStatus status={status} />
        </Stack>
        <List sx={{ mt: 1 }}>
          <ParameterInfo {...parameter1} />
          <ParameterInfo {...parameter2} />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            marginRight={1}
          >
            <ParameterInfo {...parameter3} />
            <NotificationBadge notifications={activeAlarms.value} />
          </Stack>
        </List>
      </CardContent>
    </Card>
  );
};

export default EquipmentCard;

type Status = "online" | "offline";

type OnlineOfflineStatusProps = {
  status: Status;
};

const OnlineOfflineStatus: React.FC<OnlineOfflineStatusProps> = ({
  status,
  ...props
}) => {
  const getColorByStatus = (status: Status) =>
    status === "online" ? "#00FF38" : "#FF0000";

  const getDescriptionByStatus = (status: Status) =>
    status === "online" ? "Online" : "Offline";

  return (
    <Stack direction="row" alignItems="center" marginLeft={2}>
      <Circle radius={20} sx={{ backgroundColor: getColorByStatus(status) }} />
      <Typography
        variant="subtitle2"
        sx={{ color: getColorByStatus(status), ml: 0.4 }}
      >
        {getDescriptionByStatus(status)}
      </Typography>
    </Stack>
  );
};

type ParameterInfoProps = {
  status: ItemStatus;
  description: string;
  value: number;
  unit?: string;
};

const ParameterInfo: React.FC<ParameterInfoProps> = ({
  status,
  description,
  value,
  unit,
  ...props
}) => {
  const getColorByStatus = (status: ItemStatus) => {
    switch (status) {
      case "normal":
        return "green";
      case "low":
        return "yellow";
      case "high":
        return "yellow";
      case "lowLow":
        return "red";
      case "highHigh":
        return "red";
      case "no-rule":
        return "white";
    }
  };

  return (
    <li
      style={{
        fontWeight: "bold",
      }}
    >
      <div style={{ display: "flex", marginBottom: "0.8rem" }}>
        <div
          style={{
            color: getColorByStatus(status),
            marginLeft: "0.4rem",
          }}
        >
          {`${description}:`}
        </div>
        <div
          style={{
            color: getColorByStatus(status),
            marginLeft: "0.4rem",
          }}
        >
          {`${value} ${unit ?? ""}`}
        </div>
      </div>
    </li>
  );
};
