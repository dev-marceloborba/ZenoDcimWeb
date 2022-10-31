import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Notification } from "modules/notifications/models/notification.model";
import CloseButton from "modules/shared/components/close-button/CloseButton";
import { useNotifications } from "modules/shared/components/notification-provider/NotificationProvider";

const NotificationsPanel: React.FC = () => {
  const { notifications, removeNotification, removeAllNotifications } =
    useNotifications();

  const handleCloseNotification = (notification: Notification) => {
    removeNotification(notification.id);
  };

  const handleCloseAllNotifications = () => {
    removeAllNotifications();
  };

  return (
    <>
      <Box padding={"16px 24px"} bgcolor={"secondary.main"}>
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
          // "& .MuiPaper-root .MuiMenu-paper .MuiPopover-paper": {
          //   overflow: "none",
          // },
        }}
      >
        {notifications.map((notification, index) => (
          <React.Fragment key={index}>
            <ListItem
              secondaryAction={
                <CloseButton
                  tooltip="Limpar notificação"
                  onClick={() => handleCloseNotification(notification)}
                />
              }
            >
              <ListItemText primary={notification.message} />
            </ListItem>
            {notifications.length - 1 !== index && <Divider />}
          </React.Fragment>
        ))}
        {notifications.length === 0 && (
          <Typography>Não há notificações ativas</Typography>
        )}
      </List>
    </>
  );
};

export default NotificationsPanel;
