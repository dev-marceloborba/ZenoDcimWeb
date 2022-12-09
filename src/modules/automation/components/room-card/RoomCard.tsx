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
} & CardProps;

const RoomCard: React.FC<RoomCardProps> = ({
  title,
  parameter1,
  parameter2,
  parameter3,
  activeAlarms,
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
    <Card {...props}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h4">{title}</Typography>
          <SettingsButton />
        </Stack>
        <List sx={{ mt: 1 }}>
          <li
            style={{
              fontWeight: "bold",
            }}
          >
            <div style={{ display: "flex", marginBottom: "0.8rem" }}>
              <div
                style={{
                  color: getColorByStatus(parameter1.status),
                  marginLeft: "0.4rem",
                }}
              >
                {`${parameter1.description}:`}
              </div>
              <div
                style={{
                  color: getColorByStatus(parameter1.status),
                  marginLeft: "0.4rem",
                }}
              >
                {`${parameter1.value} ${parameter1?.unit ?? ""}`}
              </div>
            </div>

            <div style={{ display: "flex", marginBottom: "0.8rem" }}>
              <div
                style={{
                  color: getColorByStatus(parameter2.status),
                  marginLeft: "0.4rem",
                }}
              >
                {`${parameter2.description}:`}
              </div>
              <div
                style={{
                  color: getColorByStatus(parameter2.status),
                  marginLeft: "0.4rem",
                }}
              >
                {`${parameter2.value} ${parameter2?.unit ?? ""}`}
              </div>
            </div>

            <div style={{ display: "flex", marginBottom: "0.8rem" }}>
              <div
                style={{
                  color: getColorByStatus(parameter3.status),
                  marginLeft: "0.4rem",
                }}
              >
                {`${parameter3.description}:`}
              </div>
              <div
                style={{
                  color: getColorByStatus(parameter3.status),
                  marginLeft: "0.4rem",
                }}
              >
                {`${parameter3.value} ${parameter3?.unit ?? ""}`}
              </div>
            </div>
          </li>
        </List>
        <Stack direction="row" justifyContent="flex-end" marginRight={1}>
          <NotificationBadge notifications={activeAlarms.value} />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
