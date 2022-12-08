import Tooltip from "@mui/material/Tooltip";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";

type SettingsButtonProps = {} & IconButtonProps;

const SettingsButton: React.FC<SettingsButtonProps> = ({ ...props }) => {
  return (
    <Tooltip title="Configurações">
      <IconButton {...props}>
        <SettingsIcon />
      </IconButton>
    </Tooltip>
  );
};

export default SettingsButton;
