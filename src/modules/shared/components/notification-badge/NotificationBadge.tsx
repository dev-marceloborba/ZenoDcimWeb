import Badge, { BadgeProps } from "@mui/material/Badge";
import NotificationIcon from "@mui/icons-material/Notifications";

type NotificationBadgeProps = {
  notifications: number;
} & BadgeProps;

const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  notifications,
  ...props
}) => {
  return (
    <Badge badgeContent={notifications} color="error">
      <NotificationIcon />
    </Badge>
  );
};

export default NotificationBadge;
