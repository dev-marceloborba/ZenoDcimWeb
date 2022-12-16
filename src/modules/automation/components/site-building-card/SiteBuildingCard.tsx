import { CardProps } from "@mui/material/Card";
import Card from "modules/shared/components/card/Card";
import SettingsButton from "modules/shared/components/settings-button/SettingsButton";
import Badge from "@mui/material/Badge";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PowerIcon from "@mui/icons-material/Power";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import LanIcon from "@mui/icons-material/Lan";

type ItemStatus = "normal" | "lowLow" | "low" | "high" | "highHigh";
type Parameter = {
  enabled: boolean;
  description: string;
  unit?: string;
  value: number;
  status: ItemStatus;
};

type SiteBuildingCardProps = {
  title: string;
  siteId?: string;
  buildingId?: string;
  parameter1: Parameter;
  parameter2: Parameter;
  parameter3: Parameter;
  parameter4: Parameter;
  parameter5: Parameter;
  parameter6: Parameter;
  alarms: {
    energy: number;
    climate: number;
    telecom: number;
  };
  hideSettings?: boolean;
  onTitleClick(): void;
  onSettingsClick(siteId: string, buildingId: string): void;
} & CardProps;

const SiteBuildingCard: React.FC<SiteBuildingCardProps> = ({
  title,
  buildingId,
  siteId,
  parameter1,
  parameter2,
  parameter3,
  parameter4,
  parameter5,
  parameter6,
  alarms,
  hideSettings = true,
  onTitleClick,
  onSettingsClick,
  ...props
}) => {
  const handleSettingsClick = () => {
    onSettingsClick(siteId ?? "", buildingId ?? "");
  };
  return (
    <Card {...props}>
      <Stack direction="row" justifyContent="space-between">
        <Typography
          variant="h4"
          onClick={onTitleClick}
          sx={{ cursor: "pointer" }}
        >
          {title}
        </Typography>
        {hideSettings ? null : <SettingsButton onClick={handleSettingsClick} />}
      </Stack>
      <List sx={{ mt: 1 }}>
        <ParameterInfo {...parameter1} />
        <ParameterInfo {...parameter2} />
        <ParameterInfo {...parameter3} />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          marginRight={1}
        >
          <ParameterInfo {...parameter4} />
          <AlarmBadge alarms={alarms.energy} group="energy" />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          marginRight={1}
        >
          <ParameterInfo {...parameter5} />
          <AlarmBadge alarms={alarms.climate} group="climate" />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          marginRight={1}
        >
          <ParameterInfo {...parameter6} />
          <AlarmBadge alarms={alarms.telecom} group="telecom" />
        </Stack>
      </List>
    </Card>
  );
};

export default SiteBuildingCard;

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
    }
  };
  if (!enabled) return null;
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
          {`${description}: `}
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

type AlarmGroup = "energy" | "climate" | "telecom";

type AlarmBadgeProps = {
  alarms: number;
  group: AlarmGroup;
};

const AlarmBadge: React.FC<AlarmBadgeProps> = ({ alarms, group, ...props }) => {
  const getAlarmIcon = (group: AlarmGroup) => {
    switch (group) {
      case "energy":
        return <PowerIcon />;
      case "climate":
        return <AcUnitIcon />;
      case "telecom":
        return <LanIcon />;
    }
  };
  return (
    <Badge badgeContent={alarms} color="error">
      {getAlarmIcon(group)}
    </Badge>
  );
};
