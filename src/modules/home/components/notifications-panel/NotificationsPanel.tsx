import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import CloseButton from "modules/shared/components/close-button/CloseButton";
import { useNotifications } from "modules/shared/components/notification-provider/NotificationProvider";
import AlarmNotification from "modules/alarms/components/alarm-notification/AlarmNotification";

const NotificationsPanel: React.FC = () => {
  const { notifications, removeNotification, removeAllNotifications } =
    useNotifications();

  const handleCloseNotification = (notificationId: string) => {
    const notification = notifications.find((x) => x.id === notificationId);
    if (notification) removeNotification(notification.id);
  };

  const handleCloseAllNotifications = () => {
    removeAllNotifications();
  };

  return (
    <>
      <Box padding={"8px 12px"} bgcolor={"secondary.main"}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6">Notificações</Typography>
          <CloseButton
            tooltip="Limpar todas notificações"
            onClick={handleCloseAllNotifications}
          />
        </Stack>
      </Box>
      <List
        sx={{
          padding: "8px 16px",
          height: "240px",
          overflowY: "auto",
          // margin: "auto",
        }}
      >
        {notifications.map((notification, index) => {
          return (
            <React.Fragment key={index}>
              <AlarmNotification
                {...notification}
                sx={{ mb: 1 }}
                handleCloseNotification={handleCloseNotification}
              />
              {notifications.length - 1 !== index && <Divider />}
            </React.Fragment>
          );
        })}
        {notifications.length === 0 && (
          <Typography>Não há notificações ativas</Typography>
        )}
      </List>
    </>
  );
};

export default NotificationsPanel;
