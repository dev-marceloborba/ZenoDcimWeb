import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper, { PaperProps } from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CloseButton from "modules/shared/components/close-button/CloseButton";

type AlarmNotificationProps = {
  id: string;
  currentDate: string;
  site: string;
  building: string;
  floor: string;
  equipment: string;
  parameter: string;
  handleCloseNotification(id: string): void;
} & PaperProps;

const AlarmNotification: React.FC<AlarmNotificationProps> = ({
  id,
  currentDate,
  site,
  building,
  floor,
  equipment,
  parameter,
  handleCloseNotification,
  ...props
}) => {
  const getBeautyPath = () => {
    return (
      site +
      " / " +
      building +
      " / " +
      floor +
      " / " +
      equipment +
      " / " +
      parameter
    );
  };

  return (
    <Paper {...props}>
      <ListItem>
        <ListItemText>
          <Typography variant="subtitle2">{getBeautyPath()}</Typography>
          <Typography>Novo alarme</Typography>
          <Typography variant="caption">{currentDate}</Typography>
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
