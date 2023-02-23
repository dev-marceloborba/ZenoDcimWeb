export interface NotificationModel {
  id: string;
  message: string;
  sendToEmail: boolean;
  showOnScreen: boolean;
}

export interface NotificationViewModel {
  message: string;
  sendToEmail: boolean;
  showOnScreen: boolean;
}

export type Notification = {
  id: string;
  message: string;
  createdDate: Date;
  title: string;
};
