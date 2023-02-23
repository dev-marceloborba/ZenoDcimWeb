import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper, { PaperProps } from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CloseButton from "modules/shared/components/close-button/CloseButton";
import getTimeStampFormat from "modules/utils/helpers/timestampFormat";

type AlarmNotificationProps = {
  id: string;
  createdDate: Date;
  title: string;
  message: string;
  handleCloseNotification(id: string): void;
} & PaperProps;

const AlarmNotification: React.FC<AlarmNotificationProps> = ({
  id,
  createdDate,
  title,
  message,
  handleCloseNotification,
  ...props
}) => {
  return (
    <Paper {...props}>
      <ListItem>
        <ListItemText>
          <Typography variant="subtitle2">{message}</Typography>
          <Typography>{title}</Typography>
          <Typography variant="caption">
            {getTimeStampFormat(createdDate)}
          </Typography>
        </ListItemText>
        <CloseButton
          tooltip="Limpar notificação"
          onClick={() => handleCloseNotification(id)}
        />
      </ListItem>
    </Paper>
  );
};

export default AlarmNotification;
