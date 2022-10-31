import Button, { ButtonProps } from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";

type EditButtonProps = {
  mode?: "icon" | "button";
} & ButtonProps;

const EditButton: React.FC<EditButtonProps> = ({
  mode = "button",
  ...props
}) => {
  if (mode === "button") {
    return (
      <Button variant="contained" color="primary" {...props}>
        Editar
      </Button>
    );
  } else {
  }
  return (
    <Tooltip title="Editar">
      <IconButton {...props}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
};

export default EditButton;
