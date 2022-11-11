import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type AlarmNotificationProps = {
  currentDate: string;
  site: string;
  building: string;
  floor: string;
  equipment: string;
};

const AlarmNotification: React.FC<AlarmNotificationProps> = ({
  currentDate,
  site,
  building,
  floor,
  equipment,
  ...props
}) => {
  const getBeautyPath = () => {
    return site + "/" + building + "/" + floor + "/" + equipment;
  };

  return (
    <ListItem>
      <ListItemText>
        <Typography variant="h2">{getBeautyPath()}</Typography>
        <Typography>Novo alarme</Typography>
        <Typography variant="caption">{currentDate}</Typography>
      </ListItemText>
    </ListItem>
    // <Paper>
    //   <Typography>Novo alarme</Typography>
    //   <Typography variant="caption">{currentDate}</Typography>
    // </Paper>
  );
};

export default AlarmNotification;
