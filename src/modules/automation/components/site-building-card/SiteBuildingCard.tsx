import { CardProps } from "@mui/material/Card";
import Card from "modules/shared/components/card/Card";
import SettingsButton from "modules/shared/components/settings-button/SettingsButton";
import List from "@mui/material/List";
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
        <Typography variant="h4">{title}</Typography>
        <SettingsButton onClick={handleSettingsClick} />
      </Stack>
      <List sx={{ mt: 1 }}>
        {items.map((item, idx) => (
          <li
            key={idx}
            style={{
              fontWeight: "bold",
            }}
          >
            <div style={{ display: "flex", marginBottom: "0.8rem" }}>
              <div style={{ color: getColorByStatus(item.status) }}>
                {item.icon}
              </div>
              <div
                style={{
                  color: getColorByStatus(item.status),
                  marginLeft: "0.4rem",
                }}
              >
                {`${item.description}: `}
              </div>
              <div
                style={{
                  color: getColorByStatus(item.status),
                  marginLeft: "0.4rem",
                }}
              >
                {`${item.value} ${item?.unit ?? ""}`}
              </div>
            </div>
          </li>
        ))}
      </List>
    </Card>
  );
};

export default SiteBuildingCard;
