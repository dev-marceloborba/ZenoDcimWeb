import { CardProps } from "@mui/material/Card";
import Card from "modules/shared/components/card/Card";
import SettingsButton from "modules/shared/components/settings-button/SettingsButton";
import Badge, { BadgeProps } from "@mui/material/Badge";
import List from "@mui/material/List";
import PowerIcon from "@mui/icons-material/Power";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import LanIcon from "@mui/icons-material/Lan";
import React from "react";

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
    <Card {...props} title={title} handleHeaderClick={() => onTitleClick()}>
      {hideSettings ? null : (
        <SettingsButton
          onClick={handleSettingsClick}
          sx={{
            position: "absolute",
            top: 16,
            right: 12,
          }}
        />
      )}
      <List sx={{ mt: 0 }}>
        <ParameterInfo {...parameter1} />
        <ParameterInfo {...parameter2} />
        <ParameterInfo {...parameter3} />
        <ParameterInfo {...parameter4} />
        <ParameterInfo {...parameter5} />
        <ParameterInfo {...parameter6} />
      </List>
      <AlarmBadge
        alarms={alarms.energy}
        group="energy"
        sx={{ position: "absolute", bottom: 108, right: 20 }}
      />
      <AlarmBadge
        alarms={alarms.climate}
        group="climate"
        sx={{ position: "absolute", bottom: 72, right: 20 }}
      />
      <AlarmBadge
        alarms={alarms.telecom}
        group="telecom"
        sx={{ position: "absolute", bottom: 36, right: 20 }}
      />
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

type AlarmGroup = "energy" | "climate" | "telecom";

type AlarmBadgeProps = {
  alarms: number;
  group: AlarmGroup;
} & BadgeProps;

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
    <Badge badgeContent={alarms} color="error" {...props}>
      {getAlarmIcon(group)}
    </Badge>
  );
};
