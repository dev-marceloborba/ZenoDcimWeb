import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { Notification } from "modules/notifications/models/notification.model";

type NotificationContextProps = {
  notifications: Notification[];
  addNotification(notification: Notification): void;
  removeNotification(id: string): void;
  removeAllNotifications(): void;
};

type NotificationStateProps = Notification[];

export const NotificationContext = createContext(
  {} as NotificationContextProps
);

function loadInitalData(): NotificationStateProps {
  const persistedData = localStorage.getItem("notifications");
  if (persistedData) {
    return JSON.parse(persistedData) as NotificationStateProps;
  } else {
    return [];
  }
}

const NotificationProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<NotificationStateProps>(loadInitalData);

  const handleAddNotification = useCallback(
    (notification: Notification) => {
      if (state.findIndex((x) => x.message === notification.message) !== -1) {
        return;
      }
      setState((prevState) => [...prevState, { ...notification }]);
    },
    [state]
  );

  const handleRemoveNotification = useCallback((id: string) => {
    setState((prevState) => {
      return prevState.filter((x) => x.id !== id);
    });
  }, []);

  useEffect(() => {
    if (state.length > 0) {
      localStorage.setItem("notifications", JSON.stringify(state));
    } else {
      localStorage.setItem("notifications", JSON.stringify([]));
    }
  }, [state]);

  return (
    <NotificationContext.Provider
      value={{
        notifications: state,
        addNotification: handleAddNotification,
        removeNotification: handleRemoveNotification,
        removeAllNotifications: () => setState([]),
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;

export const useNotifications = () => useContext(NotificationContext);
