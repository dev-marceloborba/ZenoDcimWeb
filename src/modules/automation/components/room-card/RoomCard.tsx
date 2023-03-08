import Card from "modules/shared/components/card/Card";
import { CardProps } from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import SettingsButton from "modules/shared/components/settings-button/SettingsButton";
import NotificationBadge from "modules/shared/components/notification-badge/NotificationBadge";

type ItemStatus = "normal" | "lowLow" | "low" | "high" | "highHigh" | "no-rule";

type Parameter = {
  enabled: boolean;
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
    <Card {...props} title={title} handleHeaderClick={() => onTitleClick()}>
      {hideSettings ? null : (
        <SettingsButton
          onClick={onSettingsClick}
          sx={{ position: "absolute", top: 10, right: 12 }}
        />
      )}
      <List sx={{ mt: 0 }}>
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
    </Card>
  );
};

export default RoomCard;

type ParameterInfoProps = {
  status: ItemStatus;
  enabled: boolean;
  description: string;
  value: number;
  unit?: string;
};

const ParameterInfo: React.FC<ParameterInfoProps> = ({
  status,
  enabled,
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
          {enabled ? <>{`${description}: `}</> : ""}
        </div>
        <div
          style={{
            color: getColorByStatus(status),
            marginLeft: "0.4rem",
          }}
        >
          {enabled ? <>{`${value} ${unit ?? ""}`}</> : ""}
        </div>
      </div>
    </li>
  );
};
