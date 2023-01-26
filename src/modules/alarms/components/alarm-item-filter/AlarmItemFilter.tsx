import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

type AlarmItemFilterProps = {
  onClick?(): void;
  selected?: boolean;
  icon: React.ReactNode;
  legend: string;
};

export type AlarmItem = AlarmItemFilterProps;

const AlarmItemFilter: React.FC<AlarmItemFilterProps> = ({
  onClick,
  selected = false,
  icon,
  legend,
}) => {
  return (
    <Tooltip title={legend}>
      <IconButton
        onClick={onClick}
        sx={(theme) => ({
          color: selected ? theme.palette.primary.main : "#fff",
        })}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default AlarmItemFilter;
