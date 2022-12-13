import Card, { CardProps } from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import SettingsButton from "modules/shared/components/settings-button/SettingsButton";
import NotificationBadge from "modules/shared/components/notification-badge/NotificationBadge";

type ItemStatus = "normal" | "lowLow" | "low" | "high" | "highHigh" | "no-rule";

type Parameter = {
  description: string;
  value: number;
  status: ItemStatus;
  unit?: string;
};

type RoomCardProps = {
  title: string;
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

const RoomCard: React.FC<RoomCardProps> = ({
  title,
  parameter1,
  parameter2,
  parameter3,
  activeAlarms,
  hideSettings = true,
  onSettingsClick,
  onTitleClick,
  ...props
}) => {
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

export default RoomCard;

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
