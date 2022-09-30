type INotificationService = {
  init(): void;
  listen(): void;
};

export default function notificationService(): INotificationService {
  const init = () => {
    console.log("init");
  };

  const listen = () => {
    console.log("listen");
  };

  return {
    init,
    listen,
  };
}
