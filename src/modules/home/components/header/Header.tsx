import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import ToolBar from "@mui/material/Toolbar";
import UserIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import Tooltip from "@mui/material/Tooltip";
import FullScreenIcon from "@mui/icons-material/Fullscreen";
import NotificationIcon from "@mui/icons-material/Notifications";
import { useLayout } from "app/hooks/useLayout";
// import UserSettings from './UserSettings';
import Logo from "app/assets/logo-white.svg";
import { useAuth } from "app/hooks/useAuth";
import { useFullscreen } from "@straw-hat/react-fullscreen";
import { SignalRContext } from "index";
import { useToast } from "modules/shared/components/ToastProvider";
import { useNotifications } from "modules/shared/components/notification-provider/NotificationProvider";
import { AlarmModel } from "modules/automation/models/alarm-model";
import Menu from "modules/shared/components/menu/Menu";
import NotificationsPanel from "../notifications-panel/NotificationsPanel";

type MenuState = {
  notifications: null | HTMLElement;
  user: null | HTMLElement;
};

const Header: React.FC = () => {
  const target = useRef(window.document.body);
  const { toggleFullscreen } = useFullscreen(target);
  const navigate = useNavigate();
  const { signout } = useAuth();
  const toast = useToast();
  const { notifications, addNotification } = useNotifications();

  SignalRContext.useSignalREffect(
    "SendAlarmNotification",
    (message) => {
      const alarm = message as AlarmModel;
      console.log(alarm);
      toast.open({
        message: "Novo alarme",
        position: "top-right",
        severity: "warning",
      });
      addNotification({
        id: alarm.id,
        message: alarm.pathname,
        createdDate: alarm.createdDate,
      });
    },
    []
  );

  const { toggleDrawer } = useLayout();
  const [menuState, setMenuState] = React.useState<MenuState>({
    notifications: null,
    user: null,
  });

  const isMenuOpen = (option: keyof MenuState) => Boolean(menuState[option]);
  const handleMenuOpen = (
    option: keyof MenuState,
    event: React.MouseEvent<HTMLElement>
  ) =>
    setMenuState((prevState) => ({
      ...prevState,
      [option]: event.currentTarget,
    }));
  const handleMenuClose = (option: keyof MenuState) =>
    setMenuState((prevState) => ({
      ...prevState,
      [option]: null,
    }));

  const handleLogout = () => {
    signout();
    navigate("/");
  };

  const handleFullScreen = () => {
    toggleFullscreen();
  };

  const handleOpenUserHelp = () => {
    navigate("/zeno/settings/user-help");
    handleMenuClose("user");
  };

  const handleOpenUserPreferencies = () => {
    navigate("/zeno/settings/user-preferencies");
    handleMenuClose("user");
  };

  const userMenuId = "account-menu";
  const notificationsMenuId = "notifications-menu";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="absolute"
        sx={{
          top: 0,
          left: 0,
          zIndex: 1000,
          " & .MuiToolbar-regular": {
            paddingLeft: 1,
          },
        }}
      >
        <ToolBar>
          <IconButton size="large" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>

          <Tooltip title="Ir para tela inicial">
            <Link to="/zeno">
              <img alt="Logo" src={Logo} width={48} height={48} />
            </Link>
          </Tooltip>

          <Box
            sx={{
              flexGrow: 1,
            }}
          />

          <Tooltip title="Entrar em tela cheia">
            <IconButton size="large" color="inherit" onClick={handleFullScreen}>
              <FullScreenIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Notificações">
            <IconButton
              size="large"
              color="inherit"
              aria-controls={notificationsMenuId}
              aria-haspopup="true"
              onClick={(e) => handleMenuOpen("notifications", e)}
            >
              <Badge badgeContent={notifications.length} color="error">
                <NotificationIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Usuário">
            <IconButton
              size="large"
              edge="end"
              aria-controls={userMenuId}
              aria-haspopup="true"
              color="inherit"
              onClick={(e) => handleMenuOpen("user", e)}
            >
              <UserIcon />
            </IconButton>
          </Tooltip>

          <Menu
            id={notificationsMenuId}
            anchorEl={menuState.notifications}
            open={isMenuOpen("notifications")}
            onClose={() => handleMenuClose("notifications")}
            PaperProps={{
              style: {
                maxHeight: "240px",
                width: "480px",
                overflow: "hidden",
              },
            }}
          >
            <NotificationsPanel />
          </Menu>

          <Menu
            anchorEl={menuState.user}
            id={userMenuId}
            open={isMenuOpen("user")}
            onClose={() => handleMenuClose("user")}
          >
            <MenuItem onClick={handleOpenUserPreferencies}>
              Preferências
            </MenuItem>
            <MenuItem onClick={handleOpenUserHelp}>Ajuda</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </ToolBar>
      </AppBar>
    </Box>
  );
};

export default Header;
