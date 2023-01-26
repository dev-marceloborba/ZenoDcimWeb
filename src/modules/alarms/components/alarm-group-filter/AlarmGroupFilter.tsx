import Box, { BoxProps } from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AlarmItemFilter, {
  AlarmItem,
} from "../alarm-item-filter/AlarmItemFilter";

type AlarmGroupFilterProps = {
  title: string;
  alarmItems: AlarmItem[];
  color?: string;
} & BoxProps;

const AlarmGroupFilter: React.FC<AlarmGroupFilterProps> = ({
  title,
  alarmItems,
  color,
  ...props
}) => {
  return (
    <Box
      {...props}
      sx={(theme) => ({
        backgroundColor: color ? color : theme.palette.background.paper,
      })}
    >
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={(theme) => ({
          borderBottom: "1px solid #35397c",
        })}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {title}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        {alarmItems.map((alarmItem, idx) => (
          <AlarmItemFilter key={idx} {...alarmItem} />
        ))}
      </Stack>
    </Box>
  );
};

export default AlarmGroupFilter;
