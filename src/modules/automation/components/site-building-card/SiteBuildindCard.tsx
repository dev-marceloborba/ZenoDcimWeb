import { CardProps } from "@mui/material/Card";
import Card from "modules/shared/components/card/Card";
import SettingsButton from "modules/shared/components/settings-button/SettingsButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type ItemStatus = "normal" | "lowLow" | "low" | "high" | "highHigh";

type SiteBuildingCardProps = {
  title: string;
  items: {
    icon: React.ReactNode;
    description: string;
    unit?: string;
    value: number;
    status: ItemStatus;
  }[];
} & CardProps;

const SiteBuildingCard: React.FC<SiteBuildingCardProps> = ({
  title,
  items,
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

  const handleSettingsClick = () => {};

  return (
    <Card {...props}>
      <Stack direction="row" justifyContent="space-between">
        <Typography>{title}</Typography>
        <SettingsButton onClick={handleSettingsClick} />
      </Stack>
      <List>
        {items.map((item, idx) => (
          <ListItem key={idx}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.description}
              sx={{
                color: getColorByStatus(item.status),
              }}
            />
            <ListItemText
              primary={item.value}
              sx={{
                color: getColorByStatus(item.status),
              }}
            />
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default SiteBuildingCard;
