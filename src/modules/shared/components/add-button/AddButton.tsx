import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/AddCircle";

type AddButtonProps = {} & IconButtonProps;

const AddButton: React.FC<AddButtonProps> = ({ ...props }) => {
  return (
    <Tooltip title="Adicionar">
      <IconButton color="primary" {...props}>
        <AddIcon />
      </IconButton>
    </Tooltip>
  );
};

export default AddButton;
