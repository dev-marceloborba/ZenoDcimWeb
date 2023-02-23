import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

type AlarmItemFilterProps = {
  selected?: boolean;
  icon: React.ReactNode;
  legend: string;
} & IconButtonProps;

export type AlarmItem = AlarmItemFilterProps;

const AlarmItemFilter: React.FC<AlarmItemFilterProps> = ({
  selected = false,
  icon,
  legend,
  ...props
}) => {
  return (
    <Tooltip title={legend}>
      <span>
        <IconButton
          {...props}
          sx={(theme) => ({
            color: selected ? theme.palette.primary.main : "#fff",
          })}
        >
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default AlarmItemFilter;
