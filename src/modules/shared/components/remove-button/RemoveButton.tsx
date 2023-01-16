import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import RemoveIcon from "@mui/icons-material/RemoveCircle";

type RemoveButtonProps = {} & IconButtonProps;

const RemoveButton: React.FC<RemoveButtonProps> = ({ ...props }) => {
  return (
    <Tooltip title="Remover">
      <IconButton color="error" {...props}>
        <RemoveIcon />
      </IconButton>
    </Tooltip>
  );
};

export default RemoveButton;
