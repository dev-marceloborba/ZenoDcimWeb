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

  const handleAddNotification = useCallback((notification: Notification) => {
    setState((prevState) => [...prevState, { ...notification }]);
  }, []);

  const handleRemoveNotification = useCallback(
    (id: string) => {
      const arr = [...state];
      const removed = arr.filter((x) => x.id !== id);
      setState(removed);
    },
    [state]
  );

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
