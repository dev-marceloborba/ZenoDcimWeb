import { ComponentStory, ComponentMeta } from "@storybook/react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

import Component from "./AlarmGroupFilter";

export default {
  title: "Grupo de filtros",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args} />
);

export const Type = Template.bind({});
Type.args = {
  title: "Tipo",
  alarmItems: [
    {
      legend: "Reconhecer todos",
      icon: <NotificationsIcon />,
    },
    {
      legend: "Reconhecer alarmes",
      icon: <NotificationsActiveIcon />,
    },
    {
      legend: "Reconhecer eventos",
      icon: <NotificationsOffIcon />,
    },
  ],
  maxWidth: "150px",
};

export const Priority = Template.bind({});
Priority.args = {
  title: "Prioridade",
  alarmItems: [
    {
      legend: "Reconhecer todos",
      icon: <NotificationsIcon />,
    },
    {
      legend: "Reconhecer alarmes",
      icon: <NotificationsActiveIcon />,
    },
    {
      legend: "Reconhecer eventos",
      icon: <NotificationsOffIcon />,
    },
  ],
  color: "#073d70",
  maxWidth: "150px",
};
