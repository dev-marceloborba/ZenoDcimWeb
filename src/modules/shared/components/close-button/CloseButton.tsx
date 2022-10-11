import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";

type CloseButtonProps = {
  tooltip?: string;
} & IconButtonProps;

const CloseButton: React.FC<CloseButtonProps> = ({
  tooltip = "Fechar",
  ...props
}) => {
  return (
    <Tooltip title={tooltip}>
      <IconButton {...props}>
        <CloseIcon />
      </IconButton>
    </Tooltip>
  );
};

export default CloseButton;
